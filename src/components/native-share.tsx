'use client';

import Image from 'next/image';

import { type ShareTypeProp } from '~/components/social-icons';

function NativeShareIcon(prop: ShareTypeProp) {
  function share(url: string): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- to  ensure compatibility with older browsers
    if (navigator.share) {
      navigator
        .share({
          url,
        })
        .catch(() => {
          // Error
        });
    } else {
      window.open(url, '_blank');
    }
  }

  return (
    <button
      type="button"
      className="transition-transform hover:scale-110 hover:cursor-pointer"
      onClick={() => {
        share(prop.url);
      }}
    >
      <Image
        className="opacity-75 hover:opacity-100"
        src={prop.image}
        alt={prop.image}
        width={18}
        height={18}
      />
    </button>
  );
}

export default NativeShareIcon;
