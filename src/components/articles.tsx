import { CATEGORY } from '~/enum/categories';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import StoryCard from '~/components/stories/story-card';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

import { fetchLimitedPosts } from '~/services/posts';

import ArticleCard from './articles/article-card';
import type { ArticleCardProps } from './articles/article-card';

export const revalidate = 240; // Revalidate every 4 minutes

export default async function Articles() {
  const [
    columnsResponse,
    talentsResponse,
    achievementsResponse,
    reflectionsResponse,
    societyResponse,
  ] = await Promise.allSettled([
    fetchArticles(CATEGORY.Columns),
    fetchArticles(CATEGORY.Talent),
    fetchArticles(CATEGORY.Achievements),
    fetchArticles(CATEGORY.Reflection),
    fetchArticles(CATEGORY.Society),
  ]);

  if (
    columnsResponse.status === 'rejected' ||
    talentsResponse.status === 'rejected' ||
    achievementsResponse.status === 'rejected' ||
    reflectionsResponse.status === 'rejected' ||
    societyResponse.status === 'rejected'
  ) {
    return (
      <div className="mx-auto max-w-6xl bg-white p-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-2xl font-bold text-red-500">
          ದೋಷ ಸಂಭವಿಸಿದೆ, ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.
        </h1>
      </div>
    );
  }

  const columns = columnsResponse.value.posts?.nodes ?? [];
  const talents = talentsResponse.value.posts?.nodes ?? [];
  const achievements = achievementsResponse.value.posts?.nodes ?? [];
  const reflections = reflectionsResponse.value.posts?.nodes ?? [];
  const society = societyResponse.value.posts?.nodes ?? [];

  const articles: ArticleCardProps[] = [
    ...columns,
    ...talents,
    ...achievements,
    ...society,
    ...reflections,
  ]
    .map((article) => {
      return {
        key: article.id,
        slug: article.slug ?? '',
        image: article.featuredImage?.node.sourceUrl ?? getPlaceholderImage(),
        category: article.categories?.nodes[0].name ?? 'Uncategorised',
        categorySlug: article.categories?.nodes[0].slug ?? '',
        headline: article.title ?? '',
        subhead: '',
        author: article.author?.node.name ?? '',
        date: new Date(article.date ?? ''),
      };
    })
    .sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });

  return (
    <div className="mx-auto max-w-6xl bg-white p-4 sm:px-6 lg:px-8">
      <div className="pb-4 lg:pt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold md:text-5xl">ಲೇಖನಗಳು</h1>
          <Link
            href={`/${CATEGORY.Articles}`}
            className="group ml-auto flex items-center text-sm font-semibold decoration-1 underline-offset-4 hover:underline"
          >
            ಇನ್ನಷ್ಟು
            <ArrowUpRight className="mb-0.5 ml-1 inline h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Main Featured Article (Left - Takes 3 columns out of 5) */}
        <div className="lg:col-span-1">
          <Link
            key={articles[0].slug}
            href={`/${articles[0].categorySlug}/${articles[0].slug}`}
          >
            <StoryCard
              image={articles[0].image}
              category={articles[0].category}
              headline={articles[0].headline}
              writerName={articles[0].author}
            />
          </Link>
        </div>

        {/* Secondary Articles (Right - Takes 1 column) */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {articles.slice(1, 3).map((article) => (
              <Link
                key={article.slug}
                href={`/${article.categorySlug}/${article.slug}`}
              >
                <ArticleCard
                  key={article.key}
                  image={article.image}
                  category={article.category}
                  categorySlug={article.categorySlug}
                  headline={article.headline}
                  subhead={article.subhead}
                  author={article.author}
                  date={article.date}
                  slug={article.slug}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-dashed border-black" />

      {/* Bottom Row - 3 Column Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {articles.slice(3).map((article) => (
          <Link
            key={article.slug}
            href={`/${article.categorySlug}/${article.slug}`}
          >
            <ArticleCard
              key={article.key}
              image={article.image}
              category={article.category}
              categorySlug={article.categorySlug}
              headline={article.headline}
              subhead={article.subhead}
              author={article.author}
              date={article.date}
              slug={article.slug}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

async function fetchArticles(type: CATEGORY) {
  return await fetchLimitedPosts({
    first: 2,
    filter: {
      categoryName: type,
    },
  });
}
