'use client';

import { useActionState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { cn } from '~/utils/cn';

import type { FunctionReturnType } from '~/app/actions/post-comment';

function PostComment(props: {
  databaseId: number;
  submitComment: (
    prevState: FunctionReturnType,
    formData: FormData,
  ) => Promise<FunctionReturnType>;
}) {
  const { databaseId, submitComment } = props;

  const [formState, formAction, isPending] = useActionState<
    FunctionReturnType,
    FormData
  >(submitComment, {
    status: 'idle',
  });

  useEffect(() => {
    if (formState.status === 'fail') {
      toast.error('Failed to create comment');

      return;
    }

    if (formState.status === 'success') {
      toast.success('Comment created successfully');

      if (formState.commentId) {
        const commentEle = document.querySelector(
          `div[data-commentid="${formState.commentId}"]`,
        );

        commentEle?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [formState]);

  return (
    <div className="border-t border-gray-200 pt-8">
      <h3 className="mb-6 text-xl font-bold">Leave A Comment</h3>

      <form action={formAction} className="space-y-4">
        <input
          name="name"
          type="text"
          className="w-full border border-gray-300 p-3 text-sm focus:ring-1 focus:ring-red-400 focus:outline-none"
          required
          minLength={3}
          placeholder="Your Name..."
        />

        <textarea
          name="content"
          className="w-full resize-none border border-gray-300 p-3 text-sm focus:ring-1 focus:ring-red-400 focus:outline-none"
          rows={5}
          required
          minLength={5}
          placeholder="Type your comment here..."
        />

        <input name="postId" type="hidden" value={databaseId} readOnly />

        <button
          type="submit"
          disabled={isPending}
          className={cn(
            'cursor-pointer bg-red-600 px-4 py-1 text-white transition hover:bg-red-700 disabled:cursor-none disabled:bg-red-500',
            { 'animate-pulse': isPending },
          )}
        >
          {isPending ? 'Submitting...' : ' Post Comment'}
        </button>
      </form>
    </div>
  );
}

export default PostComment;
