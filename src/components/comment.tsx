'use client';

import { createComment } from '~/app/actions/post-comment';

import WPContentRenderer from '~/components/wp-content-renderer';

import { getRelativeTime } from '~/utils/get-relative-time';

import SubmitCommentButton from './submit-comment';

interface CommentProps {
  post: {
    databaseId: number;
    commentCount: number | null;
    date: string | null;
    comments: {
      nodes: {
        id: string;
        content: string | null;
        date: string | null;
        author: {
          name: string | null;
          email: string | null;
        } | null;
      }[];
    } | null;
  };
}

export default function Comment({ post }: CommentProps) {
  return (
    <div className="space-y-4">
      {/* Existing Comments */}
      {post.comments?.nodes && post.comments.nodes.length > 0 ? (
        <div className="border-t border-gray-200 pt-8">
          <h3 className="mb-6 flex items-center text-xl font-bold">Comments</h3>

          <div className="space-y-6">
            {post.comments.nodes.map((comment, index) => (
              <div
                key={comment.id}
                className={`pb-4 ${index !== (post.comments?.nodes.length ?? 0) - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-bold text-gray-800">
                      {comment.author?.name ?? 'Anonymous'}
                    </h4>

                    {comment.date ? (
                      <span className="text-sm text-gray-500">
                        {getRelativeTime(comment.date)}
                      </span>
                    ) : null}
                  </div>
                </div>

                <WPContentRenderer
                  className="text-gray-700"
                  content={comment.content}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Leave a Comment */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="mb-6 text-xl font-bold">Leave A Comment</h3>

        <form action={createComment} className="space-y-4">
          <input
            name="name"
            type="text"
            className="w-full border border-gray-300 p-3 text-sm focus:ring-1 focus:ring-red-400 focus:outline-none"
            required
            minLength={3}
            placeholder="Your Name..."
          />

          <input
            name="email"
            type="email"
            className="w-full border border-gray-300 p-3 text-sm focus:ring-1 focus:ring-red-400 focus:outline-none"
            required
            placeholder="Your Email..."
          />

          <textarea
            name="content"
            className="w-full resize-none border border-gray-300 p-3 text-sm focus:ring-1 focus:ring-red-400 focus:outline-none"
            rows={5}
            required
            minLength={5}
            placeholder="Type your comment here..."
          />

          <input name="postId" type="hidden" value={post.databaseId} />

          <SubmitCommentButton />
        </form>
      </div>
    </div>
  );
}
