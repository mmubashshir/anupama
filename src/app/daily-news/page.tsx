import Image from 'next/image';

import NewsCard from './components/news-card';

export default function DailyNews() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      {/* Red accent bar */}
      <div className="mb-6 h-5 w-16 bg-red-500" />

      {/* Main heading */}
      <h1 className="mb-8 text-4xl font-bold md:text-5xl">ಸುದ್ದಿಗಳು</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Featured Article */}
        <div className="lg:col-span-2">
          <div className="relative">
            <Image
              src="/anupama-2.jpg"
              alt="Main news image"
              width={700}
              height={300}
              className="object-cover p-2"
            />

            {/* Text overlay positioned at bottom right */}
            <div className="absolute right-0 bottom-0 max-w-[80%] bg-white p-4 md:max-w-[90%]">
              <span className="text-sm text-black">ದಿನನಿತ್ಯದ ಸುದ್ದಿ</span>
              <h2 className="mt-1 text-lg font-extrabold md:text-2xl">
                ನಟ ಕಮಲ್ ಹಾಸನ್ ಅವರು &quot;ಕನ್ನಡ ಭಾಷೆ ತಮಿಳಿನಿಂದ ಹುಟ್ಟಿದೆ&quot; ಎಂಬ
                ಹೇಳಿಕೆಯಿಂದ ಕರ್ನಾಟಕದಲ್ಲಿ ಭಾರೀ ವಿರೋಧಕ್ಕೆ ಗುರಿಯಾಗಿದ್ದಾರೆ.
              </h2>
            </div>
          </div>

          {/* Article description */}
          <p>
            ಈ ಫ್ಯಾಕ್ಟರಿ ಕೋಲಾರ ಜಿಲ್ಲೆಯ ವೆಮಗಲ್ ಇಂಡಸ್ಟ್ರಿಯಲ್ ಪ್ರದೇಶದಲ್ಲಿ
            ನಿರ್ಮಿಸಲಾಗುತ್ತಿದ್ದು, ಭಾಷಾ ವಿಚಾರಗಳನ್ನು
          </p>
          <p className="mt-2 text-sm text-gray-500">-ಮ್ಯಾಥ್ಯೂ ಜೇಮ್ಸ್</p>
        </div>

        {/* Sidebar News Items */}
        <div className="space-y-6">
          <NewsCard
            category="ದಿನನಿತ್ಯದ ಸುದ್ದಿ"
            title="ನಟ ಕಮಲ್ ಹಾಸನ್ ಅವರು."
            imageUrl="/anupama-3.jpg"
          />

          <NewsCard
            category="ದಿನನಿತ್ಯದ ಸುದ್ದಿ"
            title="ನಟ ಕಮಲ್ ಹಾಸನ್ ಅವರು."
            imageUrl="/anupama-3.jpg"
          />

          <NewsCard
            category="ದಿನನಿತ್ಯದ ಸುದ್ದಿ"
            title="ನಟ ಕಮಲ್ ಹಾಸನ್ ಅವರು."
            imageUrl="/anupama-3.jpg"
          />

          <NewsCard
            category="ದಿನನಿತ್ಯದ ಸುದ್ದಿ"
            title="ನಟ ಕಮಲ್ ಹಾಸನ್ ಅವರು."
            imageUrl="/anupama-3.jpg"
          />
        </div>
      </div>
    </main>
  );
}
