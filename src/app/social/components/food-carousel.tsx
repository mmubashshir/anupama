'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FoodItem {
  image: string;
  title: string;
}

interface FoodCarouselProps {
  items: FoodItem[];
}

export function FoodCarousel({ items }: FoodCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="mb-6 flex items-center gap-2">
        <h2 className="text-4xl font-black">ಅಡುಗೆ</h2>
        <Link
          href=""
          className="ml-auto flex items-center text-sm font-semibold decoration-1 underline-offset-4 hover:underline"
        >
          ಇನ್ನಷ್ಟು
          <ArrowUpRight className="mb-0.5 ml-1 inline h-4 w-4" />
        </Link>
      </div>

      {/* Mobile Carousel */}
      <div className="relative block md:hidden">
        <div className="relative mx-auto max-w-sm overflow-hidden px-2">
          {/* Slider Container */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {' '}
            {items.map((item) => (
              <div
                key={item.title}
                className="w-full shrink-0 grow-0 basis-full"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="pt-3">
                  <h3 className="text-center text-lg font-bold">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute top-1/2 left-1 -translate-y-1/2 rounded-full bg-white p-1 shadow"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute top-1/2 right-1 -translate-y-1/2 rounded-full bg-white p-1 shadow"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden grid-cols-4 gap-6 md:grid">
        {items.map((item) => (
          <div key={item.title} className="overflow-hidden">
            <div className="group cursor-pointer p-0">
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-black decoration-1 underline-offset-4 group-hover:underline">
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
