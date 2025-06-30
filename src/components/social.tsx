import { CATEGORY } from '~/enum/categories';
import { type ResultOf } from 'gql.tada';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

import { fetchLimitedPosts } from '~/services/posts';

import { type ArticleCardProps } from './articles/article-card';
import { FoodCarousel } from './social/food-carousel';
import { SocialCards } from './social/social-card';
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

export default async function Social() {
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

async function fetchLifestyleArticles(first: number, type: CATEGORY) {
  return await fetchLimitedPosts({
    first,
    filter: {
      categoryName: type,
    },
  });
}
