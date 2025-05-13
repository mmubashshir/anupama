export interface NavLink {
  title: string;
  href?: `/${string}`;
  sublinks?: NavLink[];
}

export const navLinks: NavLink[] = [
  {
    // type: 'navWithSubLink',
    title: 'ಸುದ್ದಿ',
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
    // type: 'navWithSubLink',
    title: 'ಆರೋಗ್ಯ ಮತ್ತು ವೈದ್ಯಕೀಯ',

    sublinks: [
      { title: 'ಆರೋಗ್ಯ', href: '/health' },
      { title: 'ವೈದ್ಯಕೀಯ', href: '/medical' },
    ],
  },
  {
    // type: 'navWithSubLink',
    title: 'ಜೀವನಶೈಲಿ',

    sublinks: [
      { title: 'ಸಾಮಾಜಿಕ', href: '/samaajika' },
      { title: 'ಸರಣಿಗಳು', href: '/saranigalu' },
      { title: 'ಬಹುಮುಖ', href: '/bahumukha' },
    ],
  },
  {
    // type: 'navWithSubLink',
    title: 'ಕಥೆಗಳು',

    sublinks: [
      { title: 'ಕಥೆಗಳು', href: '/stories' },
      {
        title: 'ಹೃದಯಸ್ಪರ್ಶಿ ಕಥೆಗಳು',
        href: '/heart-stories',
      },
      { title: 'ಮಕ್ಕಳ ಲೋಕ', href: '/childrens-world' },
    ],
  },
  {
    // type: 'navWithoutSubLink',
    title: 'ಲೆಖನಗಳು',
    href: '/articles',
  },
  {
    // type: 'navWithoutSubLink',
    title: 'ಸಂಪರ್ಕಿಸಿ',
    href: '/contact',
  },
] as const;
