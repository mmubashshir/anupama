import React from 'react';
import { healthData } from '~/constants/health-data';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import HealthCard from './components/health-card';

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Header */}
      <header className="bg-white">
        <div className="px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-black md:text-5xl">
              ಆರೋಗ್ಯ ಮತ್ತು ವೈದ್ಯಕೀಯ
            </h1>
            <Link
              href=""
              className="ml-auto flex items-center text-sm font-semibold decoration-1 underline-offset-4 hover:underline"
            >
              ಇನ್ನಷ್ಟು
              <ArrowUpRight className="mb-0.5 ml-1 inline h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2">
          {healthData.map((professional, index) => (
            <React.Fragment key={professional.id}>
              {/* Left card */}
              {index % 2 === 0 && (
                <>
                  <div className="relative">
                    <HealthCard
                      name={professional.name}
                      description={professional.description}
                      imageUrl="/anupama-4.jpg"
                    />
                    {/* Vertical line */}
                    <div className="absolute top-0 right-0 hidden h-full border-r border-gray-300 sm:block" />
                  </div>
                </>
              )}

              {/* Right card */}
              {index % 2 === 1 && (
                <HealthCard
                  name={professional.name}
                  description={professional.description}
                  imageUrl="/anupama-4.jpg"
                />
              )}

              {(index + 1) % 2 === 0 && index !== healthData.length - 1 && (
                <div className="col-span-full">
                  <hr className="my-2 border-gray-300" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </main>
    </div>
  );
}
