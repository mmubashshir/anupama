export interface NavLink {
  title: string;
  href?: `/${string}`;
  sublinks?: NavLink[];
}

export const navLinks: NavLink[] = [
  {
    // type: 'navWithSubLink',
    title: 'ಸುದ್ದಿಗಳು',
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
      {
        title: 'ಆರೋಗ್ಯ',
        href: '/health',
      },
      {
        title: 'ವೈದ್ಯಕೀಯ',
        href: '/medical',
      },
    ],
  },
  {
    // type: 'navWithSubLink',
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
        title: 'ಬಾಲಬುತ್ತಿ',
        href: '/childrens-corner',
      },
    ],
  },
  {
    // type: 'navWithSubLink',
    title: 'ಕಥೆಗಳು',
    sublinks: [
      {
        title: 'ಕಥಾಲೋಕ',
        href: '/stories',
      },
      {
        title: 'ಮಕ್ಕಳ ರಂಗ',
        href: '/childrens-arena',
      },
    ],
  },
  {
    // type: 'navWithoutSubLink',
    title: 'ಲೆಖನಗಳು',
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
    // type: 'navWithoutSubLink',
    title: 'ಗಣ್ಯರ ಅಭಿಪ್ರಾಯ',
    sublinks: [
      {
        title: 'ನಿಮ್ಮ ಪತ್ರ',
        href: '/your-letter',
      },
    ],
  },
  {
    // type: 'navWithoutSubLink',
    title: 'ಸಂಪರ್ಕ',
    href: '/contact',
  },
  {
    // type: 'navWithoutSubLink',
    title: 'ಬರಹಗಾರರು',
    href: '/writers',
  },
] as const;
