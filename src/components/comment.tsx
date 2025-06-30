'use client';

import { createComment } from '~/app/actions/post-comment';

import WPContentRenderer from '~/components/wp-content-renderer';

import SubmitCommentButton from './submit-comment';

interface CommentProps {
  post: {
    databaseId: number;
    commentCount: number | null;
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
    <div className="space-y-10">
      {/* Existing Comments */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="mb-6 text-xl font-bold">
          {post.commentCount ?? 0} Comment{post.commentCount !== 1 ? 's' : ''}
        </h3>

        <div className="space-y-6">
          {post.comments?.nodes.map((comment, index) => (
            <div
              key={comment.id}
              className={`pb-4 ${index !== (post.comments?.nodes.length ?? 0) - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="mb-1">
                <h4 className="font-bold text-gray-800">
                  {comment.author?.name ?? 'Anonymous'}
                </h4>

                {comment.date ? (
                  <p className="text-xs text-gray-500">
                    {new Date(comment.date).toLocaleDateString('kn-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                ) : null}
              </div>

              <WPContentRenderer
                className="text-gray-700"
                content={comment.content}
              />
            </div>
          ))}
        </div>
      </div>

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
