import WPVideoRenderer from '~/components/wp-video-renderer';

interface VideoCardProps {
  title: string;
  videoContent: string;
}

export default function VideoCard({ title, videoContent }: VideoCardProps) {
  return (
    <div className="border-b border-gray-200 py-4 last:border-b-0">
      <div className="group flex cursor-pointer flex-row-reverse items-start gap-3">
        <div className="w-42">
          <WPVideoRenderer
            className="video-container group-hover:brightness-[1.1]"
            content={videoContent}
          />
        </div>
        {/* Text */}
        <div className="text-left">
          <span className="text-sm font-medium">ವಿಡಿಯೋ</span>
          <h3 className="mt-1 text-lg leading-tight font-extrabold decoration-1 underline-offset-4 group-hover:underline md:text-xl">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
