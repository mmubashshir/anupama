import type { ArticleCardProps } from '~/app/articles/components/article-card';

interface Article {
  id: string;
  category: 'SPORT' | 'ENTERTAINMENT' | 'TRAVEL';
  title: string;
  excerpt: string;
  date: string;
  image: string;
  comments: number;
}

export const articles: Article[] = [
  {
    id: '1',
    category: 'SPORT',
    title: "America's track and field team won the 2022 olympics?",
    excerpt:
      "Crime rates on trains and buses are up in some of the nation's biggest. [...]",
    date: 'Jun 18, 2022',
    image: '/anupama-2.jpg',
    comments: 0,
  },
  {
    id: '2',
    category: 'ENTERTAINMENT',
    title: "Logan Cee's Best Contemporary Art Works",
    excerpt:
      "Crime rates on trains and buses are up in some of the nation's biggest. [...]",
    date: 'Jun 18, 2022',
    image: '/anupama-2.jpg',
    comments: 0,
  },
  {
    id: '3',
    category: 'TRAVEL',
    title: 'Top 10 Most beautiful hot springs in the world',
    excerpt:
      "Crime rates on trains and buses are up in some of the nation's biggest To mark the first UK show of artist Herni Brande, developers ThemesCamp and G [...]",
    date: 'Jun 18, 2022',
    image: '/anupama-2.jpg',
    comments: 0,
  },
  {
    id: '4',
    category: 'SPORT',
    title: "How's Ameican Football Ball created out?",
    excerpt: '',
    date: '',
    image: '/anupama-3.jpg',
    comments: 0,
  },
  {
    id: '5',
    category: 'SPORT',
    title: 'Daniel share experience ski on Everest',
    excerpt: '',
    date: '',
    image: '/anupama-3.jpg',
    comments: 0,
  },
  {
    id: '6',
    category: 'ENTERTAINMENT',
    title: 'Netflix change their policy for package family',
    excerpt: '',
    date: '',
    image: '/anupama-3.jpg',
    comments: 0,
  },
  {
    id: '7',
    category: 'ENTERTAINMENT',
    title: 'Buy black vinyl record at Festival Oldschool market',
    excerpt: '',
    date: '',
    image: '/anupama-3.jpg',
    comments: 0,
  },
  {
    id: '8',
    category: 'TRAVEL',
    title: 'Experience in applying for a visa card for newcomers',
    excerpt: '',
    date: '',
    image: '/anupama-3.jpg',
    comments: 0,
  },
  {
    id: '9',
    category: 'TRAVEL',
    title: 'Release yourself on the sea and get the vibe chill',
    excerpt: '',
    date: '',
    image: '/anupama-3.jpg',
    comments: 0,
  },
];

export const smallArticles: ArticleCardProps[] = [
  {
    image: '/anupama-2.jpg',
    category: 'ಪ್ರತಿಬಿಂಬ',
    headline: 'ನಟ ಕಮಲ್ ಹಾಸನ್ ಅವರು ಕನ್ನಡ ಭಾಷೆ ತಮಿಳಿನಿಂದ',
    subhead:
      'ಈ ಫ್ಯಾಕ್ಟರಿ ಕೋಲಾರ ಜಿಲ್ಲೆಯ ವೆಮಗಲ್ ಇಂಡಸ್ಟ್ರಿಯಲ್ ಪ್ರದೇಶದಲ್ಲಿ ನಿರ್ಮಿಸಲಾಗುತ್ತಿದ್ದು, ಭಾಷಾ ವಿಚಾರಗಳನ್ನು',
    writerName: 'ಮ್ಯಾಥ್ಯೂ ಜೇಮ್ಸ್',
  },
  {
    image: '/anupama-2.jpg',
    category: 'ಪ್ರತಿಭೆ',
    headline: 'ನಟ ಕಮಲ್ ಹಾಸನ್ ಅವರು ಕನ್ನಡ ಭಾಷೆ ',
    subhead:
      'ಈ ಫ್ಯಾಕ್ಟರಿ ಕೋಲಾರ ಜಿಲ್ಲೆಯ ವೆಮಗಲ್ ಇಂಡಸ್ಟ್ರಿಯಲ್ ಪ್ರದೇಶದಲ್ಲಿ ನಿರ್ಮಿಸಲಾಗುತ್ತಿದ್ದು, ಭಾಷಾ ವಿಚಾರಗಳನ್ನು',
    writerName: 'ಮ್ಯಾಥ್ಯೂ ಜೇಮ್ಸ್',
  },
  {
    image: '/anupama-2.jpg',
    category: 'ಪ್ರತಿಭೆ',
    headline: 'ನಟ ಕಮಲ್ ಹಾಸನ್ ಅವರು ಕನ್ನಡ ',
    subhead:
      'ಈ ಫ್ಯಾಕ್ಟರಿ ಕೋಲಾರ ಜಿಲ್ಲೆಯ ವೆಮಗಲ್ ಇಂಡಸ್ಟ್ರಿಯಲ್ ಪ್ರದೇಶದಲ್ಲಿ ನಿರ್ಮಿಸಲಾಗುತ್ತಿದ್ದು, ಭಾಷಾ ವಿಚಾರಗಳನ್ನು',
    writerName: 'ಮ್ಯಾಥ್ಯೂ ಜೇಮ್ಸ್',
  },
];
