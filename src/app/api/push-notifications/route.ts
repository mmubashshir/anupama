import 'server-only';

import { POST_CREATED_TOPIC } from '~/constants/firebase';
import { NextResponse } from 'next/server';
import * as z from 'zod';

import { firebaseMessaging } from '~/utils/firebase-admin-utils';
import { tryCatch } from '~/utils/try-catch';

import type { Message } from 'firebase-admin/messaging';

const webHookRequestSchema = z.object({
  post_id: z.number(),
  post: z.object({
    ID: z.number(),
    post_title: z.string(),
  }),
});

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json();

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

  const messagePayload: Message = {
    topic: POST_CREATED_TOPIC,
    notification: {
      title: parsedData.data.post.post_title,
      body: 'Some notification description',
    },
    data: { url: 'https://anupama.co.in/' },
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
    `notification sent to topic ${POST_CREATED_TOPIC} with payload \n ${JSON.stringify(messagePayload)}`,
  );

  return NextResponse.json({
    success: true,
    message: `notification sent to topic ${POST_CREATED_TOPIC}`,
  });
}
