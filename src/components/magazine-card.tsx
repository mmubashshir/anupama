import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface MagazineCardProps {
  coverImageUrl?: string;
  _title?: string;
  variant?: 'responsive' | 'desktop';
}

export default function MagazineCard({
  coverImageUrl = '/anupama-magazine.jpg',
  _title = 'ಇತ್ತೀಚಿನ ಮಾಸಪತ್ರಿಕೆ',
  variant = 'responsive',
}: MagazineCardProps) {
  if (variant === 'desktop') {
    return (
      <DesktopMagazineCard
        coverImageUrl={coverImageUrl}
        _title={_title}
        forceShow
      />
    );
  }

  return (
    <>
      <MobileMagazineCard coverImageUrl={coverImageUrl} _title={_title} />
      <DesktopMagazineCard coverImageUrl={coverImageUrl} _title={_title} />
    </>
  );
}

function DesktopMagazineCard({
  coverImageUrl,
  _title,
  forceShow = false,
}: {
  coverImageUrl?: string;
  _title?: string;
  forceShow?: boolean;
}) {
  return (
    <Link
      href="#"
      className={`group ${forceShow ? 'block' : 'hidden md:block'}`}
    >
      <div className="flex flex-col gap-y-4">
        <Image
          src={coverImageUrl ?? '/anupama-magazine.jpg'}
          alt={_title ?? 'Magazine cover'}
          width={300}
          height={434}
          className="mx-auto w-75 object-contain group-hover:brightness-[1.1]"
          priority
        />

        <div className="flex items-center justify-between">
          <span className="text-xl font-extrabold underline-offset-4 group-hover:underline">
            {_title}
          </span>
          <ArrowUpRight className="h-6 w-6" />
        </div>
      </div>
    </Link>
  );
}

function MobileMagazineCard({
  coverImageUrl,
  _title,
}: {
  coverImageUrl?: string;
  _title?: string;
}) {
  return (
    <Link className="group block md:hidden" href="#">
      <div className="flex flex-row-reverse items-center gap-x-4">
        <Image
          src={coverImageUrl ?? '/anupama-magazine.jpg'}
          alt={_title ?? 'Magazine cover'}
          width={136}
          height={186}
          className="object-contain"
          priority
        />
        <div className="text-xl font-extrabold underline-offset-4 group-hover:underline">
          {_title}
          <ArrowUpRight className="ml-1 inline h-6 w-6" />
        </div>
      </div>
    </Link>
  );
}
