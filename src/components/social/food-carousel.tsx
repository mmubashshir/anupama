'use client';

import { CATEGORY } from '~/enum/categories';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { type ArticleCardProps } from '../articles/article-card';
import {
  OpacityCarousel,
  OpacityCarouselContainer,
  OpacityCarouselNextButton,
  OpacityCarouselPrevButton,
  OpacityCarouselSlide,
} from '../opacity-carousel';

export function FoodCarousel({ items }: { items: ArticleCardProps[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold md:text-5xl">ಅಡುಗೆ</h1>
        <Link
          href={`/${CATEGORY.Cooking}`}
          className="ml-auto flex items-center text-sm font-semibold decoration-1 underline-offset-4 hover:underline"
        >
          ಇನ್ನಷ್ಟು
          <ArrowUpRight className="mb-0.5 ml-1 inline h-4 w-4" />
        </Link>
      </div>

      <div className="relative -mx-4 block md:hidden">
        <OpacityCarousel className="relative w-full" align="center" loop>
          <OpacityCarouselContainer className="gap-0">
            {items.map((item) => (
              <OpacityCarouselSlide
                key={item.key}
                uniqueClass="w-full min-w-0 flex-shrink-0 flex-grow-0 basis-[75%] px-2"
              >
                <Link
                  href={`/${CATEGORY.Cooking}/${item.slug}`}
                  className="block"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.headline}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  <h3 className="pt-3 text-center text-lg font-bold">
                    {item.headline}
                  </h3>
                </Link>
              </OpacityCarouselSlide>
            ))}
          </OpacityCarouselContainer>

          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-full">
            <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-full">
              <OpacityCarouselPrevButton className="pointer-events-auto absolute top-1/2 left-1 -translate-y-1/2 rounded-full bg-white p-1 shadow">
                <ChevronLeft size={24} />
              </OpacityCarouselPrevButton>

              <OpacityCarouselNextButton className="pointer-events-auto absolute top-1/2 right-1 -translate-y-1/2 rounded-full bg-white p-1 shadow">
                <ChevronRight size={24} />
              </OpacityCarouselNextButton>
            </div>
          </div>

          {/* optional: dot indicator */}
        </OpacityCarousel>
      </div>

      {/* Desktop Grid */}
      <div className="hidden grid-cols-4 gap-6 md:grid">
        {items.map((item) => (
          <Link key={item.key} href={`/${CATEGORY.Cooking}/${item.slug}`}>
            <div className="overflow-hidden">
              <div className="group cursor-pointer p-0">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={item.image}
                    alt={item.headline}
                    fill
                    className="object-cover group-hover:brightness-[1.1]"
                  />
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-black decoration-1 underline-offset-4 group-hover:underline">
                    {item.headline}
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
