import { smallArticles } from '~/constants/articles';
import { fetauredStories } from '~/constants/stories';

import StoryCard from '../stories/components/story-card';
import ArticleCard from './components/article-card';

export default function Page() {
  return (
    <div className="p-4">
      <h1 className="pb-6 text-2xl font-black md:text-4xl">ಲೇಖನಗಳು</h1>

      {/* Main Layout Container */}
      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Main Featured Article (Left - Takes 3 columns out of 5) */}
        <div className="lg:col-span-1">
          {fetauredStories.slice(0, 1).map((story) => (
            <StoryCard
              key={story.headline}
              image={story.image}
              category={story.category}
              headline={story.headline}
              subhead={story.subhead}
              writerName={story.writerName}
            />
          ))}
        </div>

        {/* Secondary Articles (Right - Takes 1 column) */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {smallArticles.slice(0, 2).map((article) => (
              <ArticleCard
                key={article.headline}
                image={article.image}
                category={article.category}
                headline={article.headline}
                subhead={article.subhead}
                writerName={article.writerName}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-dashed border-black" />

      {/* Bottom Row - 3 Column Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {smallArticles.map((article) => (
          <ArticleCard
            key={article.headline}
            image={article.image}
            category={article.category}
            headline={article.headline}
            small
          />
        ))}
      </div>
    </div>
  );
}
