import { CATEGORY } from '~/enum/categories';
import { type ResultOf } from 'gql.tada';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

import { fetchLimitedPosts } from '~/services/posts';

import { type ArticleCardProps } from '../articles/components/article-card';
import { FoodCarousel } from './components/food-carousel';
import { SocialCards } from './components/social-card';
import type { LIMITED_POSTS_QUERY } from '~/services/posts';

type QueryResult = ResultOf<typeof LIMITED_POSTS_QUERY>;
type Article = NonNullable<QueryResult['posts']>['nodes'][number];

const mapToArticleCardProps = (article: Article): ArticleCardProps => {
  return {
    key: article.id,
    slug: article.slug ?? '',
    image: article.featuredImage?.node.sourceUrl ?? getPlaceholderImage(),
    category: article.categories?.nodes[0].name ?? 'Uncategorised',
    headline: article.title ?? '',
    subhead: '',
    writerName: article.author?.node.name ?? '',
    date: new Date(article.date ?? ''),
  };
};

export default async function Page() {
  const socialRaw = await fetchLifestyleArticles(4, CATEGORY.Social);

  const lifeTreasureRaw = await fetchLifestyleArticles(
    4,
    CATEGORY.LifeTreasure,
  );

  const cookingRaw = await fetchLifestyleArticles(4, CATEGORY.Cooking);

  const social: ArticleCardProps[] =
    socialRaw.posts?.nodes.flatMap(mapToArticleCardProps) ?? [];
  const lifeTreasure =
    lifeTreasureRaw.posts?.nodes.flatMap(mapToArticleCardProps) ?? [];
  const cooking: ArticleCardProps[] =
    cookingRaw.posts?.nodes.flatMap(mapToArticleCardProps) ?? [];

  return (
    <div className="mx-auto max-w-6xl bg-white px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-12 p-4">
        <SocialCards mainCards={social} sideCard={lifeTreasure} />

        <FoodCarousel items={cooking} />
      </div>
    </div>
  );
}

async function fetchLifestyleArticles(limit: number, type: CATEGORY) {
  return await fetchLimitedPosts({
    limit,
    filter: {
      categoryName: type,
    },
  });
}
