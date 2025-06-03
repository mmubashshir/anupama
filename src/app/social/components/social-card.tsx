import Image from 'next/image';

interface SocialCardProps {
  image: string;
  title: string;
  description: string;
  isLarge?: boolean;
}

export function SocialCard({ image, title, description }: SocialCardProps) {
  return (
    <div className="overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={image || '/placeholder.svg'}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="mb-2 pt-3 text-xl leading-tight font-black">{title}</h3>
      <p className="text-xs leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}

interface SideCardProps {
  image: string;
  title: string;
  bulletPoints: string[];
}

export function SideCard({ image, title, bulletPoints }: SideCardProps) {
  return (
    <div className="overflow-hidden rounded border border-gray-200 shadow-sm">
      <div className="p-4">
        <div className="relative mb-3 aspect-[3/2]">
          <Image
            src={image || '/placeholder.svg'}
            alt={title}
            fill
            className="rounded object-cover"
          />
        </div>
        <h3 className="mb-3 text-sm font-bold text-gray-900">{title}</h3>
        <div className="space-y-1">
          {bulletPoints.map((point, index) => (
            <p key={index} className="text-xs leading-relaxed text-gray-600">
              • {point}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

interface SocialCardsProps {
  mainCards: SocialCardProps[];
  sideCard: SideCardProps;
}

export function SocialCards({ mainCards, sideCard }: SocialCardsProps) {
  return (
    <div className="space-y-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">ಸಾಮಾಜಿಕ</h2>
        <div className="text-sm text-gray-500">ಪುಟ ೭</div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main 2x2 grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {mainCards.map((card, index) => (
              <SocialCard key={index} {...card} />
            ))}
          </div>
        </div>

        {/* Side card */}
        <div className="lg:col-span-1">
          <SideCard {...sideCard} />
        </div>
      </div>
    </div>
  );
}
