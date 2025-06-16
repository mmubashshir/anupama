import { foodItems } from '~/constants/food-items';
import { sideCardData } from '~/constants/side-card';
import { socialCardsData } from '~/constants/social-news';

import { FoodCarousel } from './components/food-carousel';
import { SocialCards } from './components/social-card';

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl bg-white px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-12 p-4">
        <SocialCards mainCards={socialCardsData} sideCard={sideCardData} />

        <FoodCarousel items={foodItems} />
      </div>
    </div>
  );
}
