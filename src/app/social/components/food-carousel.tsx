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
          className="group ml-auto flex items-center text-sm font-semibold"
        >
          ಇನ್ನಷ್ಟು
          <ArrowUpRight className="mb-0.5 ml-1 inline h-4 w-4 transition-transform duration-200 group-hover:scale-125" />
        </Link>
      </div>

      {/* Mobile Carousel */}
      <div className="relative block md:hidden">
        <div className="relative overflow-hidden">
          {/* Slider Container */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${items.length * 100}%`,
              transform: `translateX(-${currentIndex * (100 / items.length)}%)`,
            }}
          >
            {items.map((item) => (
              <div
                key={item.title}
                className="w-full flex-shrink-0 flex-grow-0 basis-full"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-center text-2xl font-black">
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
            className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white p-2 shadow"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white p-2 shadow"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden grid-cols-4 gap-6 md:grid">
        {items.map((item) => (
          <div key={item.title} className="overflow-hidden">
            <div className="p-0">
              <div className="relative h-[440px] w-[320px]">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-black">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
