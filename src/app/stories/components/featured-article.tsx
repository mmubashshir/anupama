import Image from 'next/image';

interface FeaturedArticleProps {
  article: {
    title: string;
    subtitle: string;
    description: string;
    author: string;
    imageUrl: string;
  };
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <div className="overflow-hidden bg-[#FFF4F2]">
      <div className="p-6">
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <Image
            src={article.imageUrl || '/placeholder.svg'}
            alt={article.subtitle}
            width={400}
            height={300}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mb-4">
          <h2 className="mb-3 text-xl font-semibold text-black">
            {article.subtitle}
          </h2>
          <p className="mb-1 text-2xl font-black">{article.title}</p>
        </div>

        <p className="mb-4 text-sm font-semibold text-black sm:text-base">
          {article.description}
        </p>

        <p className="text-sm text-gray-500">{article.author}</p>
      </div>
    </div>
  );
}
