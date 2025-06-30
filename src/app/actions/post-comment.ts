'use server';

import { revalidatePath } from 'next/cache';

import 'server-only';

import { z } from 'zod';

import { getClient, graphql } from '~/utils/graphql-client';

const ADD_COMMENT_QUERY = graphql(`
  mutation createNewComment(
    $postId: Int
    $name: String
    $email: String
    $content: String
  ) {
    createComment(
      input: {
        commentOn: $postId
        authorEmail: $email
        author: $name
        content: $content
        status: APPROVE
      }
    ) {
      success
    }
  }
`);

const schema = z.object({
  postId: z.string().transform((id) => Number(id)),
  name: z.string(),
  email: z.string().email(),
  content: z.string(),
});

export async function createComment(formData: FormData) {
  const validatedData = schema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (validatedData.error) {
    return;
  }

  const client = getClient();

  const res = await client.mutate({
    mutation: ADD_COMMENT_QUERY,
    variables: {
      postId: validatedData.data.postId,
      name: validatedData.data.name,
      email: validatedData.data.email,
      content: validatedData.data.content,
    },
  });

  if (res.errors) {
    console.error(
      'Error occured while creating comment',
      JSON.stringify(res.errors),
    );

    return;
  }

  if (res.data?.createComment?.success === false) {
    console.error('creating comment failed ');

    return;
  }

  revalidatePath('/(blog)');
}
