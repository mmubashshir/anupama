import { foodItems } from '~/constants/food-items';
import { socialCardsData } from '~/constants/social-news';

import { FoodCarousel } from './components/food-carousel';
import { SocialCards } from './components/social-card';

const sideCardData = {
  image: '/placeholder.svg?height=200&width=300',
  title: 'ಪಟ್ಟ ಗೆದ್ದ ಮಕ್ಕಳ ಏಕದಿನ ಗುರುವಾರ',
  bulletPoints: [
    'ಬೆಂಗಳೂರು: ಮಾಜಿ ಮುಖ್ಯಮಂತ್ರಿ ಸಿದ್ದರಾಮಯ್ಯ',
    'ಮಕ್ಕಳ ದಿನಾಚರಣೆ ಆಚರಣೆ ಕಾರ್ಯಕ್ರಮ',
    'ಶಾಲಾ ಮಕ್ಕಳ ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮ',
    'ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪ್ರಶಸ್ತಿ',
  ],
};

export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl space-y-12 p-4">
        {/* Header */}
        <div className="py-8">
          <h1 className="text-4xl font-black md:text-5xl">ಜೀವನಶೈಲಿ</h1>
        </div>

        {/* Social Section */}
        <section>
          <SocialCards mainCards={socialCardsData} sideCard={sideCardData} />
        </section>

        {/* Food Section */}
        <section>
          <FoodCarousel items={foodItems} />
        </section>

        {/* Additional Content Section */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">ಸುದ್ದಿಗಳು</h2>
            <div className="ml-auto text-sm text-gray-500">ಇಂದಿನ ಸುದ್ದಿ</div>
          </div>
          <div className="space-y-3">
            <div className="border-l-4 border-red-600 pl-4">
              <p className="text-sm text-gray-700">
                • ಕರ್ನಾಟಕದಲ್ಲಿ ಮಳೆಯ ಮುನ್ಸೂಚನೆ
              </p>
            </div>
            <div className="border-l-4 border-red-600 pl-4">
              <p className="text-sm text-gray-700">
                • ಬೆಂಗಳೂರು ಟ್ರಾಫಿಕ್ ಸಮಸ್ಯೆ ಪರಿಹಾರ
              </p>
            </div>
            <div className="border-l-4 border-red-600 pl-4">
              <p className="text-sm text-gray-700">• ಶಿಕ್ಷಣ ಇಲಾಖೆಯ ಹೊಸ ನೀತಿ</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
