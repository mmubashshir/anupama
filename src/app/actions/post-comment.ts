'use server';

import { revalidatePath } from 'next/cache';

import 'server-only';

import { z } from 'zod';

import { getClient, graphql } from '~/utils/graphql-client';
import { tryCatch } from '~/utils/try-catch';

const ADD_COMMENT_QUERY = graphql(`
  mutation createNewComment(
    $postId: Int
    $name: String
    $content: String
    $date: String
  ) {
    createComment(
      input: {
        commentOn: $postId
        author: $name
        content: $content
        status: APPROVE
        date: $date
      }
    ) {
      success
      comment {
        id
      }
    }
  }
`);

const MAX_COMMENT_LEN = 500;

const schema = z.object({
  postId: z.preprocess((v) => Number(v), z.number().int().positive()),
  name: z.string().trim().min(3).max(100),
  content: z.string().trim().min(5).max(MAX_COMMENT_LEN),
});

export interface FunctionInitialReturn {
  status: 'idle';
}
export interface FunctionSuccessReturn {
  status: 'success';
  commentId?: string;
}

export interface FunctionFailureReturn {
  status: 'fail';
}

export type FunctionReturnType =
  | FunctionInitialReturn
  | FunctionSuccessReturn
  | FunctionFailureReturn;

export async function createComment(
  prevState: FunctionReturnType,
  formData: FormData,
): Promise<FunctionReturnType> {
  const validatedData = schema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (validatedData.error) {
    return { status: 'fail' };
  }

  const client = getClient();

  const { data: res, error } = await tryCatch(
    client.mutate({
      mutation: ADD_COMMENT_QUERY,
      variables: {
        postId: validatedData.data.postId,
        name: validatedData.data.name,
        content: validatedData.data.content,
        date: new Date().toISOString(),
      },
    }),
  );

  if (error) {
    console.error('An errror occured', JSON.stringify(error));

    return { status: 'fail' };
  }

  if (res.errors) {
    console.error(
      'Error occured while creating comment',
      JSON.stringify(res.errors),
    );

    return { status: 'fail' };
  }

  if (res.data?.createComment?.success === false) {
    console.error('creating comment failed ');

    return { status: 'fail' };
  }

  revalidatePath('/(blog)');

  return {
    status: 'success',
    commentId: res.data?.createComment?.comment?.id,
  };
}
