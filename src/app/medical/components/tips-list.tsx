import { CircleNumber } from './circle-number';

interface HealthTip {
  id: number;
  text: string;
}

interface HealthTipsListProps {
  tips: HealthTip[];
}

export default function HealthTipsList({ tips }: HealthTipsListProps) {
  return (
    <div className="space-y-4">
      {tips.map((tip) => (
        <div
          key={tip.id}
          className="flex items-center gap-4 border-b border-gray-200 py-3 last:border-b-0"
        >
          <CircleNumber number={tip.id} />
          <p className="text-base font-medium text-gray-800 sm:text-lg">
            {tip.text}
          </p>
        </div>
      ))}
    </div>
  );
}
