export interface NavLink {
  title: string;
  href: string;
  sublinks?: NavLink[];
}

export const navLinks: NavLink[] = [
  {
    title: 'ಸುದ್ದಿ',
    href: '/1',
    sublinks: [
      {
        title: 'ದಿನನಿತ್ಯದ ಸುದ್ದಿ',
        href: '/daily-news',
      },
      {
        title: 'ವಿಡಿಯೋ ಸುದ್ದಿ',
        href: '/video-news',
      },
    ],
  },
  {
    title: 'ಆರೋಗ್ಯ ಮತ್ತು ವೈದ್ಯಕೀಯ',
    href: '/2',
    sublinks: [
      { title: 'ಆರೋಗ್ಯ', href: '/health' },
      { title: 'ವೈದ್ಯಕೀಯ', href: '/medical' },
    ],
  },
  {
    title: 'ಜೀವನಶೈಲಿ',
    href: '/3',
    sublinks: [
      { title: 'ಸಾಮಾಜಿಕ', href: '/samaajika' },
      { title: 'ಸರಣಿಗಳು', href: '/saranigalu' },
      { title: 'ಬಹುಮುಖ', href: '/bahumukha' },
    ],
  },
  {
    title: 'ಕಥೆಗಳು',
    href: '/4',
    sublinks: [
      { title: 'ಕಥೆಗಳು', href: '/stories' },
      { title: 'ಹೃದಯಸ್ಪರ್ಶಿ ಕಥೆಗಳು', href: '/heart-stories' },
      { title: 'ಮಕ್ಕಳ ಲೋಕ', href: '/childrens-world' },
    ],
  },
  {
    title: 'ಲೆಖನಗಳು',
    href: '/articles',
  },
  {
    title: 'ಸಂಪರ್ಕಿಸಿ',
    href: '/contact',
  },
];
