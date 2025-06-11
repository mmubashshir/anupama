import Image from 'next/image';
import Link from 'next/link';

export interface ArticleCardProps {
  image: string;
  category: string;
  headline: string;
  subhead?: string;
  writerName?: string;
  small?: boolean;
}

export default function ArticleCard({
  image,
  category,
  headline,
  subhead,
  writerName,
  small = false,
}: ArticleCardProps) {
  if (small) {
    return (
      <Link className="group flex" href="null">
        <Image
          src={image}
          alt={headline}
          width={96}
          height={96}
          className="h-24 w-24 object-cover"
        />
        <div className="ml-4 pt-2">
          <p className="text-md mb-1">{category}</p>
          <h3 className="text-xl font-extrabold underline-offset-4 group-hover:underline">
            {headline}
          </h3>
        </div>
      </Link>
    );
  }

  return (
    <Link key={headline} className="group flex flex-col" href="null">
      <div className="mb-3">
        <Image
          src={image}
          alt={headline}
          width={300}
          height={300}
          className="aspect-square w-full max-w-full object-cover"
        />
      </div>
      <div className="flex-1">
        <span className="mb-2 block text-base text-black">{category}</span>
        <h3 className="mb-2 text-2xl font-black group-hover:underline">
          {headline}
        </h3>
        <p className="mb-2 text-base font-light text-black">{subhead}</p>
        <p className="text-base text-gray-500">-{writerName}</p>
      </div>
    </Link>
  );
}
