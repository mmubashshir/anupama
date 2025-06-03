// import { foodItems } from '~/constants/food-items';
import { sideCardData } from '~/constants/side-card';
import { socialCardsData } from '~/constants/social-news';

// import { FoodCarousel } from './components/food-carousel';
import { SocialCards } from './components/social-card';

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl space-y-12 p-4">
        {/* Header */}
        <div className="py-8">
          <h1 className="text-4xl font-black md:text-5xl">ಜೀವನಶೈಲಿ</h1>
        </div>

        <SocialCards mainCards={socialCardsData} sideCard={sideCardData} />

        {/* <FoodCarousel items={foodItems} /> */}
      </div>
    </div>
  );
}
