import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export type MagazineCardProps = {
  coverImageUrl?: string;
  title?: string;
  variant?: 'responsive' | 'desktop';
};

export default function MagazineCard({
  coverImageUrl = '/anupama-magazine.jpg',
  title = 'ಇತ್ತೀಚಿನ ಮಾಸಪತ್ರಿಕೆ',
  variant = 'responsive',
}: MagazineCardProps) {
  if (variant === 'desktop') {
    return (
      <DesktopMagazineCard
        coverImageUrl={coverImageUrl}
        title={title}
        forceShow
      />
    );
  }

  return (
    <>
      <MobileMagazineCard coverImageUrl={coverImageUrl} title={title} />
      <DesktopMagazineCard coverImageUrl={coverImageUrl} title={title} />
    </>
  );
}

function DesktopMagazineCard({
  coverImageUrl,
  title,
  forceShow = false,
}: {
  coverImageUrl?: string;
  title?: string;
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
          alt={title ?? 'Magazine cover'}
          width={300}
          height={434}
          className="mx-auto w-[300px] object-contain group-hover:brightness-[1.1]"
          priority
        />

        <div className="flex items-center justify-between">
          <span className="text-xl font-extrabold underline-offset-4 group-hover:underline">
            {title}
          </span>
          <ArrowUpRight className="h-6 w-6" />
        </div>
      </div>
    </Link>
  );
}

function MobileMagazineCard({
  coverImageUrl,
  title,
}: {
  coverImageUrl?: string;
  title?: string;
}) {
  return (
    <Link className="group block md:hidden" href="#">
      <div className="flex flex-row-reverse items-center gap-x-4">
        <Image
          src={coverImageUrl ?? '/anupama-magazine.jpg'}
          alt="Anupama Magazine Cover"
          width={136}
          height={186}
          className="object-contain"
          priority
        />
        <div className="text-xl font-extrabold underline-offset-4 group-hover:underline">
          ಇತ್ತೀಚಿನ
          <ArrowUpRight className="ml-1 inline h-6 w-6 align-text-bottom" />
          ಮಾಸಪತ್ರಿಕೆ
        </div>
      </div>
    </Link>
  );
}
