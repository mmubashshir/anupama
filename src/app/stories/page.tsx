import { moreStories } from '~/constants/more-stories';

import FeaturedArticle from './components/featured-article';
import HealthTipsList from './components/tips-list';

export default function Page() {
  // Featured article data
  const featuredArticle = {
    title: 'ಚಿಟ್ಕಿ ಗಿಡ ಮತ್ತು ಮೀನಿನ ಗೆಳೆತನ',
    subtitle: 'ಬಹಿರ್ಮುಖ',
    description:
      'ಈ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯದ ಪರಿಚಯ ಮನೆಗಳ ಇಂದಿನೋಲ್ ಪ್ರದೇಶದಲ್ಲಿ ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಭಾವನಾ ವಿಮರ್ಶೆಗಳನ್ನು',
    author: '-ಮ್ಯಾಥ್ಯೂ ಜೇಮ್ಸ್',
    imageUrl: '/anupama-4.jpg',
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
          ಇನ್ನಷ್ಟು ಕಥೆಗಳು
        </h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Health Tips List - Takes 7 columns on large screens */}
          <div className="lg:col-span-7">
            <HealthTipsList tips={moreStories} />
          </div>

          {/* Featured Article - Takes 5 columns on large screens */}
          <div className="lg:col-span-5">
            <FeaturedArticle article={featuredArticle} />
          </div>
        </div>
      </main>
    </div>
  );
}
