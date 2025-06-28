'use server';

import 'server-only';

import { graphql } from '~/utils/graphql-client';

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

export async function createComment(formData: FormData) {
  const postId = formData.get('postId');
  const commenterName = formData.get('name');
  const commenterEmail = formData.get('email');
  const commentContent = formData.get('content');

  await Promise.resolve(true);
}
