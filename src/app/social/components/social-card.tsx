import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SocialCardProps {
  image: string;
  title: string;
  description: string;
}

export function SocialCard({ image, title, description }: SocialCardProps) {
  return (
    <div className="p-0">
      <div className="relative aspect-[4/3]">
        <Image
          src={image || '/placeholder.svg'}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="bg-white">
        <h3 className="mb-2 pt-4 text-2xl leading-tight font-black">{title}</h3>
        <p className="text-sm leading-relaxed font-semibold">{description}</p>
      </div>
    </div>
  );
}

interface SideCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  bulletPoints: string[];
}

export function SideCard({
  image,
  category,
  title,
  description,
  author,
  bulletPoints,
}: SideCardProps) {
  return (
    <div className="bg-[#FFF4F2] p-5">
      <div className="relative mb-6 aspect-[3/2]">
        <Image
          src={image || '/placeholder.svg'}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <p className="mb-1 text-lg font-semibold">{category}</p>
      <h3 className="mb-2 text-xl font-black">{title}</h3>
      <p className="mb-2 text-base leading-relaxed font-semibold">
        {description}
      </p>
      <p className="text-sm text-gray-600">{author}</p>

      <div className="mt-3 border-t border-gray-300 pt-3">
        <h4 className="mb-2 text-xl font-black">ಇನ್ನಷ್ಟು ಓದಿ</h4>
        <div className="space-y-1 pl-3">
          {bulletPoints.map((point) => (
            <p
              key={point}
              className="text-base leading-relaxed font-medium text-black"
            >
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
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-black">ಸಾಮಾಜಿಕ</h2>
        <Link
          href=""
          className="group ml-auto flex items-center text-sm font-semibold"
        >
          ಇನ್ನಷ್ಟು
          <ArrowUpRight className="mb-0.5 ml-1 inline h-4 w-4 transition-transform duration-200 group-hover:scale-125" />
        </Link>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
          {mainCards.map((card) => (
            <SocialCard key={card.title} {...card} />
          ))}
        </div>

        {/* Side Card */}
        <div className="lg:col-span-1">
          <SideCard {...sideCard} />
        </div>
      </div>
    </div>
  );
}
