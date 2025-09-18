import 'server-only';

import { env } from 'process';
import { POST_CREATED_TOPIC } from '~/constants/firebase';
import { NextResponse } from 'next/server';
import * as z from 'zod';

import { firebaseMessaging } from '~/utils/firebase-admin-utils';
import { tryCatch } from '~/utils/try-catch';

import { fetchLimitedPosts } from '~/services/posts';

import type { Message } from 'firebase-admin/messaging';

const webHookRequestSchema = z.object({
  post_id: z.number(),
  post: z.object({
    ID: z.number(),
    post_title: z.string(),
    post_name: z.string(),
  }),
});

const WEBHOOK_AUTHENTICATION_HEADER = 'webhook-api-key';

export async function POST(request: Request): Promise<NextResponse> {
  const authenticationToken = request.headers.get(
    WEBHOOK_AUTHENTICATION_HEADER,
  );

  if (String(authenticationToken) !== String(env.WORDPRESS_WEBHOOK_API_KEY)) {
    return NextResponse.json({ error: 'Key missing' }, { status: 401 });
  }

  const { data: body, error: bodyParsingError } = await tryCatch(
    request.json(),
  );

  if (bodyParsingError) {
    return NextResponse.json(
      {
        error: 'Invalid  payload recived',
        details: bodyParsingError,
      },
      { status: 400 },
    );
  }

  const parsedData = webHookRequestSchema.safeParse(body);

  if (parsedData.error) {
    console.error(
      `Parsing of webhook request failed ${z.prettifyError(parsedData.error)}`,
    );

    return NextResponse.json(
      {
        error: z.prettifyError(parsedData.error),
        details: z.treeifyError(parsedData.error),
      },
      { status: 400 },
    );
  }

  const { data: postData, error: postFetchingError } = await tryCatch(
    fetchLimitedPosts({ filter: { id: parsedData.data.post_id } }),
  );

  if (postFetchingError) {
    console.error(
      `Error while fetching post  with id ${parsedData.data.post_id}  from wordpress  failed with error ${JSON.stringify(postFetchingError)}`,
    );

    return NextResponse.json(
      { error: 'Error while fetching post from wordpress' },
      { status: 500 },
    );
  }

  const article = postData.posts?.nodes[0];

  if (!article) {
    console.error(`Post with post id ${parsedData.data.post_id} not found`);

    return NextResponse.json(
      { error: `Post with post id ${parsedData.data.post_id} not found` },
      { status: 404 },
    );
  }

  const messagePayload: Message = {
    topic: POST_CREATED_TOPIC,
    data: {
      title: article.title ?? 'Notification title',
      clickAction: `/${article.categories?.nodes[0].slug}/${article.slug}`,
      imageUrl:
        article.featuredImage?.node.sourceUrl ??
        `${env.NEXT_PUBLIC_SITE_URL}/favicon-96x96.png`,
    },
  };

  const { data: _data, error } = await tryCatch(
    firebaseMessaging.send(messagePayload),
  );

  if (error) {
    console.error(
      `Failed to send notification to topic ${POST_CREATED_TOPIC} failed with error ${JSON.stringify(error)}`,
    );

    return NextResponse.json(
      { error: error.message, details: error },
      { status: 500 },
    );
  }

  // eslint-disable-next-line no-console -- On sucessfull notification send logs are required
  console.info(
    `notification sent to topic ${POST_CREATED_TOPIC} with url \n ${JSON.stringify(messagePayload.data)}`,
  );

  return NextResponse.json({
    success: true,
    message: `notification sent to topic ${POST_CREATED_TOPIC}`,
  });
}
