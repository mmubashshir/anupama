'use client';

import { formatDistanceToNowStrict } from 'date-fns';
import { Clock } from 'lucide-react';

import WPContentRenderer from '~/components/wp-content-renderer';

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
        dateGmt: string | null;
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
          <div className="space-y-3">
            {post.comments.nodes.map((comment, index) => (
              <div
                key={comment.id}
                data-commentid={String(comment.id)}
                className={`pb-4 ${index !== (post.comments?.nodes.length ?? 0) - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <h4 className="text-base font-bold text-gray-800 sm:text-lg">
                      {comment.author?.name ?? 'Anonymous'}
                    </h4>

                    {/* Time Icon + Text wrapper */}
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="mb-1 h-4 w-4 stroke-1" />
                      {comment.dateGmt ? (
                        <span>
                          {formatDistanceToNowStrict(
                            new Date(`${comment.dateGmt}Z`),
                            {
                              addSuffix: true,
                            },
                          )}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                <WPContentRenderer
                  className="break-words text-gray-700"
                  content={comment.content}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
