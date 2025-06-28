import { foodItems } from '~/constants/food-items';
import { sideCardData } from '~/constants/side-card';
import { socialCardsData } from '~/constants/social-news';

import { fetchLimitedPosts } from '~/services/posts';

import { ArticleCardProps } from '../articles/components/article-card';
import { FoodCarousel } from './components/food-carousel';
import { SocialCards } from './components/social-card';

const mapToArticleCardProps = (article: any): ArticleCardProps => {
  return {
    key: article.id,
    image: article.featuredImage?.node.sourceUrl ?? '/fallback.jpg',
    category: article.categories?.nodes[0].name ?? 'Uncategorised',
    headline: article.title ?? '',
    subhead: '',
    writerName: article.author?.node.name ?? '',
    date: new Date(article.date ?? ''),
  };
};

export default async function Page() {
  const socialRaw = await fetchLifestyleArticles(
    4,
    LifestyleArticleTypes.Social,
  );

  const lifeTreasureRaw = await fetchLifestyleArticles(
    4,
    LifestyleArticleTypes.LifeTreasure,
  );

  const cookingRaw = await fetchLifestyleArticles(
    4,
    LifestyleArticleTypes.Cooking,
  );

  const social: Array<ArticleCardProps> =
    socialRaw.posts?.nodes.flatMap(mapToArticleCardProps) ?? [];
  const lifeTreasure =
    lifeTreasureRaw.posts?.nodes.flatMap(mapToArticleCardProps) ?? [];
  const cooking: Array<ArticleCardProps> =
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

enum LifestyleArticleTypes {
  Social = 'social',
  Cooking = 'cooking',
  LifeTreasure = 'life-treasure',
  Editorial = 'editorial',
}

async function fetchLifestyleArticles(
  limit: number,
  type: LifestyleArticleTypes,
) {
  return await fetchLimitedPosts({
    limit: limit,
    filter: {
      categoryName: type,
    },
  });
}
