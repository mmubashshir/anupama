import Link from 'next/link';

import WPVideoRenderer from '~/components/wp-video-renderer';

interface VideoCardCompactProps {
  posts: {
    id: string;
    title: string;
    videoContent: string;
    date?: string;
    author?: string;
  }[];
}

export default function VideoCardCompact({ posts }: VideoCardCompactProps) {
  return (
    <div className="hidden border border-gray-200 p-4 md:block">
      <h3 className="mb-4 inline-block border-b-2 border-red-500 pb-2 text-xl font-bold">
        ಇತ್ತೀಚಿನ ವೀಡಿಯೊ ಸುದ್ದಿಗಳು
      </h3>

      {posts.map(({ id, title, videoContent, date }) => (
        <div key={id} className="border-b border-gray-200 py-4 last:border-b-0">
          <div className="flex items-start gap-3">
            <div className="w-42 shrink-0 overflow-hidden bg-gray-100">
              <WPVideoRenderer
                className="video-container group-hover:brightness-[1.1]"
                content={videoContent}
              />
            </div>
            <div className="flex flex-col justify-start text-left">
              <Link href={`/video-news#video-${id}`}>
                <h3 className="line-clamp-3 text-lg leading-snug font-semibold decoration-1 hover:underline">
                  {title}
                </h3>
              </Link>
              {date ? (
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(date).toLocaleDateString('kn-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
