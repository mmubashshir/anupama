'use client';

import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { cn } from '~/utils/cn';

import type { FunctionReturnType } from '~/app/actions/post-comment';

const MAX_COMMENT_LEN = 500;

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

  const [content, setContent] = useState('');

  useEffect(() => {
    if (formState.status === 'fail') {
      toast.error('Failed to create comment');

      return;
    }

    if (formState.status === 'success') {
      toast.success('ಕಮೆಂಟನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸೇರಿಸಲಾಗಿದೆ!');

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
      <h3 className="mb-6 text-xl font-bold">ಕಮ್ಮೆಂಟ್ ಬಿಡಿ</h3>

      <form action={formAction} className="space-y-4">
        <input
          name="name"
          type="text"
          required
          minLength={3}
          placeholder="ನಿಮ್ಮ ಹೆಸರು..."
          className="w-full border border-gray-300 p-3 text-sm focus:ring-1 focus:ring-red-400 focus:outline-none"
        />

        <textarea
          name="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          rows={5}
          required
          minLength={5}
          maxLength={MAX_COMMENT_LEN}
          placeholder="ನಿಮ್ಮ ಕಮ್ಮೆಂಟನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ..."
          className="w-full resize-none border border-gray-300 p-3 text-sm focus:ring-1 focus:ring-red-400 focus:outline-none"
        />

        <p className="text-right text-xs text-gray-500">
          {content.length}/{MAX_COMMENT_LEN}
        </p>

        <input name="postId" type="hidden" value={databaseId} readOnly />

        <button
          type="submit"
          disabled={isPending}
          className={cn(
            'bg-primary disabled:bg-primary hover:bg-primary cursor-pointer px-5 py-1.5 text-white transition hover:brightness-125 disabled:cursor-none',
            { 'animate-pulse': isPending },
          )}
        >
          {isPending ? 'ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...' : 'ಕಮ್ಮೆಂಟ್ ಸಲ್ಲಿಸಿ'}
        </button>
      </form>
    </div>
  );
}

export default PostComment;
