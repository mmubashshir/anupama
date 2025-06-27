import { fetchLimitedPosts } from '~/services/posts';

import StoryCard from '../stories/components/story-card';
import ArticleCard, { ArticleCardProps } from './components/article-card';

export default async function Articles() {
  const { posts: columnsRaw } = await fetchArticles(ArticleTypes.Columns);
  const { posts: talentsRaw } = await fetchArticles(ArticleTypes.Talent);
  const { posts: achievementsRaw } = await fetchArticles(
    ArticleTypes.Achievements,
  );
  const { posts: reflectionsRaw } = await fetchArticles(
    ArticleTypes.Reflection,
  );
  const { posts: societyRaw } = await fetchArticles(ArticleTypes.Society);

  const columns = columnsRaw?.nodes ?? [];
  const talents = talentsRaw?.nodes ?? [];
  const achievements = achievementsRaw?.nodes ?? [];
  const reflections = reflectionsRaw?.nodes ?? [];
  const society = societyRaw?.nodes ?? [];

  const articles: Array<ArticleCardProps & { key: string }> = [
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
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1; // a is null, put it after b
      if (!b.date) return -1; // b is null, put a before b
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
            key={articles[0].key}
            image={articles[0].image}
            category={articles[0].category}
            headline={articles[0].headline}
            date={articles[0].date}
          />
        </div>

        {/* Secondary Articles (Right - Takes 1 column) */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {articles.slice(1, 3).map((article) => (
              <ArticleCard {...article} />
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 my-8 border-t border-dashed border-black" />

      {/* Bottom Row - 3 Column Grid */}
      <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-3">
        {articles.slice(3).map((article) => (
          <ArticleCard {...article} />
        ))}
      </div>
    </div>
  );
}

export enum ArticleTypes {
  Columns = 'columns',
  Talent = 'talent',
  Achievements = 'achievements',
  Society = 'society',
  Reflection = 'reflection',
}

async function fetchArticles(type: ArticleTypes) {
  return await fetchLimitedPosts({
    limit: 2,
    filter: {
      categoryName: type,
    },
  });
}
