import { moreStories } from '~/constants/more-stories';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import BlogCard, { BlogCardProps } from '~/components/blog-card';

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
    <div className="mx-auto max-w-6xl bg-white p-4 sm:px-6 lg:px-8">
      <header className="bg-white pb-4">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black md:text-4xl">ಕಥೆಗಳು</h1>
            <Link
              href="null"
              className="flex items-center text-sm font-semibold"
            >
              ಇನ್ನಷ್ಟು
              <ArrowUpRight className="mb-0.5 ml-1 inline h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {fetauredStories.map((story, index) => (
          <BlogCard
            key={index}
            image={story.image}
            category={story.category}
            headline={story.headline}
            subhead={story.subhead}
            writerName={story.writerName}
          />
        ))}
      </main>

      <main className="pt-6">
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

const fetauredStories: Array<BlogCardProps> = [
  {
    image: '/anupama-4.jpg',
    category: 'ಸುದ್ದಿ',
    headline:
      'ಕನ್ನಡ ಭಾಷೆ ತಮಿಳಿನಿಂದ ಹುಟ್ಟಿದೆ - ಎಂಬ ಹೇಳಿಕೆಯಿಂದ ಕರ್ನಾಟಕದಲ್ಲಿ ಭಾರೀ ವಿರೋಧಕ್ಕೆ ಗುರಿಯಾಗಿದ್ದಾರೆ.',
    subhead: 'ಬಹಿರ್ಮುಖ',
    writerName: '-ಮ್ಯಾಥ್ಯೂ ಜೇಮ್ಸ್',
  },
  {
    image: '/anupama-4.jpg',
    category: 'ಸುದ್ದಿ',
    headline: 'ಚಿಟ್ಕಿ ಗಿಡ ಮತ್ತು ಮೀನಿನ ಗೆಳೆತನ',
    subhead: 'ಬಹಿರ್ಮುಖ',
    writerName: '-ಮ್ಯಾಥ್ಯೂ ಜೇಮ್ಸ್',
  },
];
