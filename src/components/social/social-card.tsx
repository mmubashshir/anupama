import { CATEGORY } from '~/enum/categories';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { type ArticleCardProps } from '../articles/article-card';

export function SocialCard({
  image,
  headline,
  subhead,
  author,
}: ArticleCardProps) {
  return (
    <div className="group p-0">
      <div className="relative aspect-[4/3]">
        <Image src={image} alt={headline} fill className="object-cover" />
      </div>
      <div className="bg-white">
        <h3 className="mb-2 pt-4 text-2xl leading-tight font-black decoration-1 underline-offset-4 group-hover:underline">
          {headline}
        </h3>
        <p className="text-sm leading-relaxed font-semibold">{subhead}</p>
        <p className="text-sm text-gray-500">-{author}</p>
      </div>
    </div>
  );
}

export function SideCard({ editorial }: { editorial: ArticleCardProps[] }) {
  const latestEditorial = editorial[0];

  return (
    <div className="bg-gray-100 p-5">
      <Link href={`/${CATEGORY.LifeTreasure}/${latestEditorial.slug}`}>
        <div className="group">
          <div className="relative mb-2 aspect-[3/2]">
            <Image
              src={latestEditorial.image}
              alt={latestEditorial.headline}
              fill
              className="object-cover"
            />
          </div>

          <p className="text-sm text-black">{latestEditorial.category}</p>
          <h3 className="text-xl font-black decoration-1 underline-offset-4 group-hover:underline">
            {latestEditorial.headline}
          </h3>
          <p className="text-base leading-relaxed font-semibold">
            {latestEditorial.subhead}
          </p>
          <p className="text-sm text-gray-500">~{latestEditorial.author}</p>
        </div>
      </Link>

      <div className="mt-3 border-t border-gray-300 pt-3">
        <h4 className="mb-2 text-xl font-black">ಇನ್ನಷ್ಟು ಓದಿ</h4>
        <div className="space-y-1 pl-3">
          <ul className="list-disc space-y-1 pl-3">
            {editorial.slice(1, 5).map((article) => (
              <Link
                key={article.key}
                href={`/${CATEGORY.LifeTreasure}/${article.slug}`}
              >
                <li className="text-base leading-relaxed font-medium text-black decoration-1 underline-offset-4 hover:underline">
                  {article.headline}
                </li>
              </Link>
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
    <div className="gap-6 space-y-4 md:flex">
      <div className="flex-2">
        {/* Header */}
        <div className="pb-4 lg:pt-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold md:text-5xl">ಸಾಮಾಜಿಕ</h1>
            <Link
              href={`/${CATEGORY.Social}`}
              className="group ml-auto flex items-center text-sm font-semibold decoration-1 underline-offset-4 hover:underline"
            >
              ಇನ್ನಷ್ಟು
              <ArrowUpRight className="mb-0.5 ml-1 inline h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 gap-6">
          {/* Main Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
            {mainCards.map((card) => (
              <Link key={card.key} href={`/${CATEGORY.Social}/${card.slug}`}>
                <SocialCard
                  key={card.key}
                  image={card.image}
                  category={card.category}
                  categorySlug={card.categorySlug}
                  author={card.author}
                  headline={card.headline}
                  date={card.date}
                  slug={card.slug}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 pt-4">
        {/* Side Card */}
        {sideCard.length !== 0 && <SideCard editorial={sideCard} />}
      </div>
    </div>
  );
}
