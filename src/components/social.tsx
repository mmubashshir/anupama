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

export const revalidate = 240; // Revalidate every 4 minutes

export default async function Social() {
  const [socialResult, lifeTreasureResult, cookingResult] =
    await Promise.allSettled([
      fetchLifestyleArticles(4, CATEGORY.Social),
      fetchLifestyleArticles(4, CATEGORY.LifeTreasure),
      fetchLifestyleArticles(4, CATEGORY.Cooking),
    ]);

  if (
    socialResult.status === 'rejected' ||
    lifeTreasureResult.status === 'rejected' ||
    cookingResult.status === 'rejected'
  ) {
    return (
      <div className="mx-auto max-w-6xl bg-white p-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-2xl font-bold text-red-500">
          ದೋಷ ಸಂಭವಿಸಿದೆ, ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.
        </h1>
      </div>
    );
  }

  const socialRaw = socialResult.value;
  const lifeTreasureRaw = lifeTreasureResult.value;
  const cookingRaw = cookingResult.value;

  const social: ArticleCardProps[] =
    socialRaw.posts?.nodes.flatMap(mapToArticleCardProps) ?? [];
  const lifeTreasure =
    lifeTreasureRaw.posts?.nodes.flatMap(mapToArticleCardProps) ?? [];
  const cooking: ArticleCardProps[] =
    cookingRaw.posts?.nodes.flatMap(mapToArticleCardProps) ?? [];

  return (
    <div className="mx-auto max-w-6xl bg-white p-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-12">
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
