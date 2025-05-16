import { articles } from '~/constants/articles';
import { ArrowUp, Calendar, ChevronRight, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function TopStories() {
  const categories = ['SPORT', 'ENTERTAINMENT', 'TRAVEL'] as const;

  // Group articles by category
  const articlesByCategory = categories.map((category) => ({
    category,
    articles: articles.filter((article) => article.category === category),
  }));

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Category Navigation */}
      <div className="flex justify-between px-4 py-3">
        {categories.map((category) => (
          <Link
            key={category}
            href={`#${category.toLowerCase()}`}
            className="flex items-center text-sm font-medium"
          >
            {category} <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden gap-6 p-4 md:grid md:grid-cols-3">
        {articlesByCategory.map(({ category, articles }) => (
          <div key={category} className="space-y-6">
            {/* Only render if there are articles */}
            {articles.length > 0 && (
              <>
                {/* Featured Article */}
                {articles[0] && (
                  <div className="space-y-3">
                    <div className="overflow-hidden">
                      <Image
                        src={articles[0].image}
                        alt={articles[0].title}
                        width={500}
                        height={300}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500">{category}</div>
                      <h2 className="text-xl leading-tight font-bold">
                        <Link href="#">{articles[0].title}</Link>
                      </h2>
                      <p className="text-sm text-gray-600">
                        {articles[0].excerpt}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <span className="mr-1">
                            <Calendar className="size-4" />
                          </span>
                          {articles[0].date}
                        </div>
                        <div className="flex items-center">
                          <span className="mr-1">
                            <MessageCircle className="size-4" />
                          </span>
                          {articles[0].comments}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Smaller Articles */}
                <div className="space-y-4">
                  {articles.slice(1).map((article) => (
                    <div
                      key={article.id}
                      className="flex gap-3 border-t border-gray-300 pt-4"
                    >
                      <div className="h-20 w-25 flex-shrink-0 overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          width={100}
                          height={100}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-md mb-1 text-slate-500">
                          {category}
                        </div>
                        <h3 className="text-md leading-tight font-semibold">
                          <Link href="#">{article.title}</Link>
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {articlesByCategory.map(({ category, articles }) => (
          <div
            key={category}
            id={category.toLowerCase()}
            className="last:border-b-0"
          >
            <div className="p-4">
              <h2 className="text-lg font-medium">{category}</h2>
            </div>

            {/* Featured Article */}
            {articles[0]?.image && articles[0]?.title && (
              <div className="space-y-3 p-4">
                <div className="overflow-hidden">
                  <Image
                    src={articles[0].image}
                    alt={articles[0].title}
                    width={500}
                    height={300}
                    className="h-auto w-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">{category}</div>
                  <h2 className="text-xl leading-tight font-bold">
                    <Link href="#">{articles[0].title}</Link>
                  </h2>
                  <p className="text-sm text-gray-600">{articles[0].excerpt}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <span className="mr-1">
                        <Calendar />
                      </span>
                      {articles[0].date}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">
                        <MessageCircle />
                      </span>
                      {articles[0].comments}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Smaller Articles */}
            <div className="space-y-0">
              {articles.slice(1).map((article) => (
                <div key={article.id} className="flex gap-3 p-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-xs text-gray-500">{category}</div>
                    <h3 className="text-base leading-tight font-semibold">
                      <Link href="#">{article.title}</Link>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Back to top button */}
      <div className="fixed right-6 bottom-6 z-50">
        <Link
          href="#"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-600 text-white shadow-lg"
        >
          <ArrowUp className="h-5 w-5" />
          <span className="sr-only">Back to top</span>
        </Link>
      </div>
    </div>
  );
}
