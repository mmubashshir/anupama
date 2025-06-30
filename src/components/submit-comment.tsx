'use client';

import { useFormStatus } from 'react-dom';

import { cn } from '~/utils/cn';

function SubmitCommentButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        'cursor-pointer bg-red-600 px-4 py-1 text-white transition hover:bg-red-700 disabled:cursor-none disabled:bg-red-500',
        { 'animate-pulse': pending },
      )}
    >
      {pending ? 'Submitting...' : ' Post Comment'}
    </button>
  );
}

export default SubmitCommentButton;
