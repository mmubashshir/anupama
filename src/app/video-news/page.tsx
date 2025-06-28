import Image from 'next/image';

import VideoCard from './components/video-card';

export default function VideoNews() {
  return (
    <main className="w-full bg-gray-100/90">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="my-4 px-4 text-2xl font-extrabold md:text-3xl">
          ವಿಡಿಯೋ ಸುದ್ದಿ
        </h1>

        <div className="grid grid-cols-1 gap-6 px-4 lg:grid-cols-3">
          {/* Main Featured Article */}
          <div className="overflow-hidden lg:col-span-2">
            <div className="relative bg-white inset-shadow-2xs">
              {/* Image section with hover + play button */}
              <div className="group relative cursor-pointer">
                <Image
                  src="/dummy-anupama.jpg"
                  alt="Featured image"
                  width={400}
                  height={100}
                  className="aspect-video w-full object-cover p-6 pb-0"
                />

                {/* Centered Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-black/75 p-3 transition-colors duration-300 group-hover:bg-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="white"
                      viewBox="0 0 24 24"
                      stroke="none"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Text section below */}
              <div className="group cursor-pointer p-4 text-center md:p-6">
                <span className="text-sm text-black">ವೀಡಿಯೊ</span>
                <h2 className="text-lg font-extrabold decoration-1 underline-offset-4 group-hover:underline md:text-2xl">
                  ವಿಶ್ವಸಂಸ್ಥೆಯಲ್ಲಿ ಸೇವೆ ಈ ಹುಡುಗಿಯ ಕನಸು
                </h2>
                <p className="mt-3 text-gray-700">
                  ಈ ಫ್ಯಾಕ್ಟರಿ ಕೋಲಾರ ಜಿಲ್ಲೆಯ ವೆಮಗಲ್ ಇಂಡಸ್ಟ್ರಿಯಲ್ ಪ್ರದೇಶದಲ್ಲಿ
                  ನಿರ್ಮಿಸಲಾಗುತ್ತಿದ್ದು, ಭಾಷಾ ವಿಚಾರಗಳನ್ನು
                </p>
              </div>
            </div>
          </div>

          {/* Video Suggestions */}
          <div className="space-y-4">
            <VideoCard
              title="ವಿಶ್ವಸಂಸ್ಥೆಯಲ್ಲಿ ಸೇವೆ ಈ ಹುಡುಗಿಯ ಕನಸು"
              imageUrl="/anupama-2.jpg"
            />
            <VideoCard
              title="ವಿಶ್ವಸಂಸ್ಥೆಯಲ್ಲಿ ಸೇವೆ ಈ ಹುಡುಗಿಯ ಕನಸು"
              imageUrl="/anupama-2.jpg"
            />
            <VideoCard
              title="ವಿಶ್ವಸಂಸ್ಥೆಯಲ್ಲಿ ಸೇವೆ ಈ ಹುಡುಗಿಯ ಕನಸು"
              imageUrl="/anupama-2.jpg"
            />
            <VideoCard
              title="ವಿಶ್ವಸಂಸ್ಥೆಯಲ್ಲಿ ಸೇವೆ ಈ ಹುಡುಗಿಯ ಕನಸು"
              imageUrl="/anupama-2.jpg"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
