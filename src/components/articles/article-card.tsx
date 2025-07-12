import Image from 'next/image';

export interface ArticleCardProps {
  key: string;
  slug: string;
  image: string;
  category: string;
  categorySlug: string;
  headline: string;
  subhead?: string;
  author: string;
  date: Date;
  small?: boolean;
}

export default function ArticleCard({
  image,
  category,
  headline,
  subhead,
  author,
  small = false,
}: ArticleCardProps) {
  if (small) {
    return (
      <div className="group flex">
        <Image
          src={image}
          alt={headline}
          width={96}
          height={96}
          className="h-24 w-24 object-cover group-hover:brightness-[1.1]"
        />

        <div className="ml-4">
          <p className="text-sm font-semibold text-gray-500">{category}</p>
          <h3 className="text-xl font-extrabold decoration-1 underline-offset-4 group-hover:underline">
            {headline}
          </h3>
          <p className="text-sm text-gray-500">-{author}</p>
        </div>
      </div>
    );
  }

  return (
    <div key={headline} className="group flex flex-col">
      <Image
        src={image}
        alt={headline}
        width={300}
        height={300}
        className="mb-2 aspect-[3/2] w-full max-w-full object-cover group-hover:brightness-[1.1] md:aspect-square"
      />
      <div className="flex-1">
        <span className="text-sm font-semibold text-gray-500">{category}</span>
        <h3 className="line-clamp-2 text-2xl font-black decoration-1 underline-offset-4 group-hover:underline">
          {headline}
        </h3>
        <p className="text-base font-light text-black">{subhead}</p>
        <p className="text-sm text-gray-500">-{author}</p>
      </div>
    </div>
  );
}
