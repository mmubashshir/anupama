import { CATEGORY } from '~/enum/categories';

import { fetchLimitedPosts } from '~/services/posts';

import StoryCard from '../stories/components/story-card';
import ArticleCard from './components/article-card';
import type { ArticleCardProps } from './components/article-card';

export default async function Articles() {
  const { posts: columnsRaw } = await fetchArticles(CATEGORY.Columns);
  const { posts: talentsRaw } = await fetchArticles(CATEGORY.Talent);
  const { posts: achievementsRaw } = await fetchArticles(CATEGORY.Achievements);
  const { posts: reflectionsRaw } = await fetchArticles(CATEGORY.Reflection);
  const { posts: societyRaw } = await fetchArticles(CATEGORY.Society);

  const columns = columnsRaw?.nodes ?? [];
  const talents = talentsRaw?.nodes ?? [];
  const achievements = achievementsRaw?.nodes ?? [];
  const reflections = reflectionsRaw?.nodes ?? [];
  const society = societyRaw?.nodes ?? [];

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
        image: article.featuredImage?.node.sourceUrl ?? '/fallback.jpg',
        category: article.categories?.nodes[0].name ?? 'Uncategorised',
        headline: article.title ?? '',
        subhead: '',
        writerName: article.author?.node.name ?? '',
        date: new Date(article.date ?? ''),
      };
    })
    .sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="px-4 pb-6 text-2xl font-black md:text-4xl">ಲೇಖನಗಳು</h1>

      {/* Main Layout Container */}
      <div className="mb-8 grid grid-cols-1 gap-8 px-4 lg:grid-cols-2">
        {/* Main Featured Article (Left - Takes 3 columns out of 5) */}
        <div className="lg:col-span-1">
          <StoryCard
            image={articles[0].image}
            category={articles[0].category}
            headline={articles[0].headline}
            writerName={articles[0].writerName ?? ''}
          />
        </div>

        {/* Secondary Articles (Right - Takes 1 column) */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {articles.slice(1, 3).map((article) => (
              <ArticleCard
                key={article.key}
                image={article.image}
                category={article.category}
                headline={article.headline}
                subhead={article.subhead}
                writerName={article.writerName}
                date={article.date}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 my-8 border-t border-dashed border-black" />

      {/* Bottom Row - 3 Column Grid */}
      <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-3">
        {articles.slice(3).map((article) => (
          <ArticleCard
            key={article.key}
            image={article.image}
            category={article.category}
            headline={article.headline}
            subhead={article.subhead}
            writerName={article.writerName}
            date={article.date}
          />
        ))}
      </div>
    </div>
  );
}

async function fetchArticles(type: CATEGORY) {
  return await fetchLimitedPosts({
    limit: 2,
    filter: {
      categoryName: type,
    },
  });
}
