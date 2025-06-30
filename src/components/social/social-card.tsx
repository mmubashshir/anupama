import { CATEGORY } from '~/enum/categories';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { type ArticleCardProps } from '../articles/article-card';

export function SocialCard({ image, headline, subhead }: ArticleCardProps) {
  return (
    <div className="group cursor-pointer p-0">
      <div className="relative aspect-[4/3]">
        <Image src={image} alt={headline} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />
      </div>
      <div className="bg-white">
        <h3 className="mb-2 pt-4 text-2xl leading-tight font-black decoration-1 underline-offset-4 group-hover:underline">
          {headline}
        </h3>
        <p className="text-sm leading-relaxed font-semibold">{subhead}</p>
      </div>
    </div>
  );
}

export function SideCard({ editorial }: { editorial: ArticleCardProps[] }) {
  const latestEditorial = editorial[0];

  return (
    <div className="bg-[#FFF4F2] p-5">
      <div className="group cursor-pointer">
        <div className="relative mb-6 aspect-[3/2]">
          <Image
            src={latestEditorial.image}
            alt={latestEditorial.headline}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />
        </div>

        <p className="mb-1 text-lg font-semibold">{latestEditorial.category}</p>
        <h3 className="mb-2 text-xl font-black decoration-1 underline-offset-4 group-hover:underline">
          {latestEditorial.headline}
        </h3>
        <p className="mb-2 text-base leading-relaxed font-semibold">
          {latestEditorial.subhead}
        </p>
        <p className="text-sm text-gray-600">{latestEditorial.writerName}</p>
      </div>

      <div className="mt-3 border-t border-gray-300 pt-3">
        <h4 className="mb-2 text-xl font-black">ಇನ್ನಷ್ಟು ಓದಿ</h4>
        <div className="space-y-1 pl-3">
          <ul className="list-disc space-y-1 pl-3">
            {editorial.slice(1).map((article) => (
              <li
                key={article.key}
                className="cursor-pointer text-base leading-relaxed font-medium text-black decoration-1 underline-offset-4 hover:underline"
              >
                {article.headline}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// TODO: Rename to Social, extract to different file
export function SocialCards({
  mainCards,
  sideCard,
}: {
  mainCards: ArticleCardProps[];
  sideCard: ArticleCardProps[];
}) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="mt-4 mb-8 text-4xl font-extrabold md:text-5xl">
          ಸಾಮಾಜಿಕ
        </h1>
        <Link
          href=""
          className="group ml-auto flex items-center text-sm font-semibold decoration-1 underline-offset-4 hover:underline"
        >
          ಇನ್ನಷ್ಟು
          <ArrowUpRight className="mb-0.5 ml-1 inline h-4 w-4" />
        </Link>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
          {mainCards.map((card) => (
            <Link key={card.key} href={`/${CATEGORY.Social}/${card.slug}`}>
              <SocialCard
                key={card.key}
                image={card.image}
                category={card.category}
                headline={card.headline}
                date={card.date}
                slug={card.slug}
              />
            </Link>
          ))}
        </div>

        {/* Side Card */}
        {sideCard.length !== 0 && (
          <div className="lg:col-span-1">
            <SideCard editorial={sideCard} />
          </div>
        )}
      </div>
    </div>
  );
}
