export default function Page() {
  // Health tips data
  const healthTips = [
    {
      id: 1,
      text: 'ಬಾಯಲ್ಲಿದ ಆಚಿಕೆ ಮಾರಾಟದ ದಿನ',
    },
    {
      id: 2,
      text: 'ಅಲೆಮಾರಿ ನಾಯಿ ಪದುಗಿದ ಮನೆ',
    },
    {
      id: 3,
      text: 'ಅಜ್ಞಾತ ಜೀನುತುಪ್ಪದ ರಹಸ್ಯ',
    },
    {
      id: 4,
      text: 'ಮಳೆ ಬಿದ್ದಾಗ ಹಾದುವ ಮರ',
    },
    {
      id: 5,
      text: 'ಕಾಗೆ ಮತ್ತು ಕಲರವದ ಕಥೆಯಂಟ',
    },
  ];

  // Featured article data
  const featuredArticle = {
    title: 'ಚಿಕಿತ್ಸೆಯ',
    subtitle: 'ಭಯ ಗೀಡ ಮತ್ತು ಮಿತಿಯಿನ ಗಳತನ',
    description:
      'ಈ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯದ ಪರಿಚಯ ಮನೆಗಳ ಇಂದಿನೋಲ್ ಪ್ರದೇಶದಲ್ಲಿ ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಭಾವನಾ ವಿಮರ್ಶೆಗಳನ್ನು',
    readMoreText: 'ಮುಂದುವರೆದ ಓದಿಸುವ',
    imageUrl: '/images/mental-health.png',
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
            <HealthTipsList tips={healthTips} />
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
