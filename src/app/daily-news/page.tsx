import Image from 'next/image';

import NewsCard from './components/news-card';

export default function DailyNews() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      {/* Main heading */}
      <h1 className="mt-4 mb-8 text-4xl font-extrabold md:text-5xl">
        ಸುದ್ದಿಗಳು
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Featured Article */}
        <div className="group flex flex-col gap-4 border-b border-gray-200 bg-white pb-4 hover:cursor-pointer md:gap-0 md:border-0 lg:col-span-2">
          {/* Image */}
          <div>
            <Image
              src="/anupama-2.jpg"
              alt="Main news image"
              width={700}
              height={300}
              className="aspect-[3/2] w-full object-cover"
            />
          </div>

          {/* Overlay below image (styled box) */}
          <div className="z-10 ml-auto flex flex-col gap-2 bg-white md:-mt-16 md:max-w-[90%] md:p-4 md:text-left">
            <span className="text-sm text-black">ದಿನನಿತ್ಯದ ಸುದ್ದಿ</span>
            <h2 className="mt-1 text-lg font-extrabold decoration-1 underline-offset-4 group-hover:underline md:text-2xl">
              ನಟ ಕಮಲ್ ಹಾಸನ್ ಅವರು &quot;ಕನ್ನಡ ಭಾಷೆ ತಮಿಳಿನಿಂದ ಹುಟ್ಟಿದೆ&quot; ಎಂಬ
              ಹೇಳಿಕೆಯಿಂದ ಕರ್ನಾಟಕದಲ್ಲಿ ಭಾರೀ ವಿರೋಧಕ್ಕೆ ಗುರಿಯಾಗಿದ್ದಾರೆ.
            </h2>
            <p>
              ಈ ಫ್ಯಾಕ್ಟರಿ ಕೋಲಾರ ಜಿಲ್ಲೆಯ ವೆಮಗಲ್ ಇಂಡಸ್ಟ್ರಿಯಲ್ ಪ್ರದೇಶದಲ್ಲಿ
              ನಿರ್ಮಿಸಲಾಗುತ್ತಿದ್ದು, ಭಾಷಾ ವಿಚಾರಗಳನ್ನು
            </p>
            <p className="mt-2 text-sm text-gray-500">-ಮ್ಯಾಥ್ಯೂ ಜೇಮ್ಸ್</p>
          </div>
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
