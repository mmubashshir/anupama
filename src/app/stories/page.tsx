import { moreStories } from '~/constants/more-stories';
import { featuredArticle, fetauredStories } from '~/constants/stories';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import FeaturedArticle from './components/featured-article';
import StoryCard from './components/story-card';
import HealthTipsList from './components/tips-list';

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl bg-white p-4 sm:px-6 lg:px-8">
      <div className="bg-white pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold md:text-5xl">ಕಥೆಗಳು</h1>
          <Link
            href=""
            className="group ml-auto flex items-center text-sm font-semibold decoration-1 underline-offset-4 hover:underline"
          >
            ಇನ್ನಷ್ಟು
            <ArrowUpRight className="mb-0.5 ml-1 inline h-4 w-4" />
          </Link>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {fetauredStories.slice(0, 2).map((story) => (
          <StoryCard
            key={story.headline}
            image={story.image}
            category={story.category}
            headline={story.headline}
            subhead={story.subhead}
            writerName={story.writerName}
          />
        ))}
      </section>

      <section className="pt-6">
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
      </section>
    </div>
  );
}
