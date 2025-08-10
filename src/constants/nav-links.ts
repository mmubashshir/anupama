export interface NavLink {
  title: string;
  href?: `/${string}`;
  sublinks?: NavLink[];
}

export interface SubLinks {
  title: string;
  href: `/${string}`;
  image?: string;
}

export const navLinks: NavLink[] = [
  {
    title: 'ಸುದ್ದಿಗಳು',
    sublinks: [
      {
        title: 'ದಿನನಿತ್ಯದ ಸುದ್ದಿ',
        href: '/daily-news',
      },
      {
        title: 'ವೀಡಿಯೊ ಸುದ್ದಿ',
        href: '/video-news',
      },
    ],
  },
  {
    title: 'ಆರೋಗ್ಯ ಮತ್ತು ವೈದ್ಯಕೀಯ',
    sublinks: [
      {
        title: 'ಆರೋಗ್ಯ',
        href: '/health',
      },
      {
        title: 'ವೈದ್ಯಕೀಯ',
        href: '/medicine',
      },
    ],
  },
  {
    title: 'ಜೀವನಶೈಲಿ',
    sublinks: [
      {
        title: 'ಸಾಮಾಜಿಕ',
        href: '/social',
      },
      {
        title: 'ಅಡುಗೆ',
        href: '/cooking',
      },
      {
        title: 'ಬಹಿರ್ಮುಖ',
        href: '/editorial',
      },
      {
        title: 'ಬಾಳಬುತ್ತಿ',
        href: '/life-treasure',
      },
    ],
  },
  {
    title: 'ಕಥೆಗಳು',
    sublinks: [
      {
        title: 'ಕಥಾಲೋಕ',
        href: '/story-world',
      },
      {
        title: 'ಮಕ್ಕಳ ರಂಗ',
        href: '/childrens-arena',
      },
    ],
  },
  {
    title: 'ಲೇಖನಗಳು',
    sublinks: [
      {
        title: 'ಅಂಕಣಗಳು',
        href: '/columns',
      },
      {
        title: 'ಪ್ರತಿಭೆ',
        href: '/talent',
      },
      {
        title: 'ಸಾಧನೆ',
        href: '/achievements',
      },
      {
        title: 'ಈ ಸಮಾಜ',
        href: '/this-society',
      },
      {
        title: 'ಪ್ರತಿಬಿಂಬ',
        href: '/reflection',
      },
    ],
  },
  {
    title: 'ಗಣ್ಯರ ಅಭಿಪ್ರಾಯ',
    sublinks: [
      {
        title: 'ನಿಮ್ಮ ಪತ್ರ',
        href: '/your-letter',
      },
    ],
  },
  {
    title: 'ಮುಖಪುಟ',
    href: '/cover-page',
  },
  {
    title: 'ನಮ್ಮ ಬಗ್ಗೆ',
    href: '/about-us',
  },
] as const;

export const subLinks: SubLinks[] = [
  {
    title: 'ದಿನನಿತ್ಯದ ಸುದ್ದಿ',
    href: '/daily-news',
  },
  {
    title: 'ವೀಡಿಯೊ ಸುದ್ದಿ',
    href: '/video-news',
  },
  {
    title: 'ಸಾಮಾಜಿಕ',
    href: '/social',
  },
  {
    title: 'ಅಡುಗೆ',
    href: '/cooking',
  },
  {
    title: 'ಬಹಿರ್ಮುಖ',
    href: '/editorial',
  },
  {
    title: 'ಬಾಳಬುತ್ತಿ',
    href: '/life-treasure',
  },
  {
    title: 'ಕಥಾಲೋಕ',
    href: '/story-world',
  },
  {
    title: 'ಮಕ್ಕಳ ರಂಗ',
    href: '/childrens-arena',
  },
  {
    title: 'ಅಂಕಣಗಳು',
    href: '/columns',
  },
  {
    title: 'ಪ್ರತಿಭೆ',
    href: '/talent',
  },
  {
    title: 'ಸಾಧನೆ',
    href: '/achievements',
  },
  {
    title: 'ಈ ಸಮಾಜ',
    href: '/this-society',
  },
  {
    title: 'ಪ್ರತಿಬಿಂಬ',
    href: '/reflection',
  },
  {
    title: 'ನಿಮ್ಮ ಪತ್ರ',
    href: '/your-letter',
  },
  {
    title: 'ಮುಖಪುಟ',
    href: '/cover-page',
  },
  {
    title: 'ನಮ್ಮ ಬಗ್ಗೆ',
    href: '/about-us',
  },
];
