import { CATEGORY } from '~/enum/categories';
import { type ResultOf } from 'gql.tada';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

import { fetchLimitedPosts } from '~/services/posts';

import { type ArticleCardProps } from './articles/article-card';
import { Container } from './container';
import { FoodCarousel } from './social/food-carousel';
import { SocialCards } from './social/social-card';
import type { LIMITED_POSTS_QUERY } from '~/services/posts';

type QueryResult = ResultOf<typeof LIMITED_POSTS_QUERY>;
type Article = NonNullable<QueryResult['posts']>['nodes'][number];

export default async function Social() {
  const [socialResult, lifeTreasureResult, cookingResult] =
    await Promise.allSettled([
      fetchLifestyleArticles(2, CATEGORY.Social),
      fetchLifestyleArticles(4, CATEGORY.LifeTreasure),
      fetchLifestyleArticles(4, CATEGORY.Cooking),
    ]);

  if (
    socialResult.status === 'rejected' ||
    lifeTreasureResult.status === 'rejected' ||
    cookingResult.status === 'rejected'
  ) {
    return (
      <Container className="bg-white p-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-2xl font-bold text-red-500">
          ದೋಷ ಸಂಭವಿಸಿದೆ, ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.
        </h1>
      </Container>
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
    <Container className="bg-white p-4 sm:px-6 lg:px-8 lg:pb-14">
      <Container className="space-y-12">
        <SocialCards mainCards={social} sideCard={lifeTreasure} />

        <FoodCarousel items={cooking} />
      </Container>
    </Container>
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
    categorySlug: article.categories?.nodes[0].slug ?? '',
    headline: article.title ?? '',
    subhead: '',
    author:
      article.authorinfo?.writtenBy ?? article.author?.node.name ?? 'Unkwown',
    date: new Date(article.date ?? ''),
  };
};
