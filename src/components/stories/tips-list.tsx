import { CircleNumber } from './circle-number';

interface MoreStory {
  id: number;
  text: string;
}

interface MoreStoriesProps {
  tips: MoreStory[];
}

export default function MoreStories({ tips }: MoreStoriesProps) {
  return (
    <div className="space-y-4">
      {tips.map((tip) => (
        <div
          key={tip.id}
          className="flex items-center gap-4 border-b border-gray-200 py-3 last:border-b-0"
        >
          <CircleNumber number={tip.id} />
          <p className="cursor-pointer text-base font-medium text-gray-800 decoration-1 underline-offset-4 hover:underline sm:text-lg">
            {tip.text}
          </p>
        </div>
      ))}
    </div>
  );
}
