import { healthData } from '~/constants/health-data';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import HealthCard from './components/health-card';

export default function Page() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-6">
      {/* Header */}
      <header className="bg-white">
        <div className="px-4">
        <div className="px-4">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-black md:text-4xl">
              ಆರೋಗ್ಯ ಮತ್ತು ವೈದ್ಯಕೀಯ
            </h1>
            <Link href="" className="flex items-center text-sm font-semibold">
              ಇನ್ನಷ್ಟು
              <ArrowUpRight className="mb-0.5 ml-1 inline h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
          {healthData.map((professional) => (
            <HealthCard
              key={professional.id}
              name={professional.name}
              description={professional.description}
              imageUrl="/anupama-4.jpg"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
