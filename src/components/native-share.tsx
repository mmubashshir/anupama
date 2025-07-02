'use client';

import Image from 'next/image';

import { ShareTypeProp } from '~/components/social-icons';

const NativeShareIcon = (prop: ShareTypeProp) => {
  function share(url: string): void {
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
    <div className="p-4 hover:cursor-pointer" onClick={() => share(prop.url)}>
      <Image
        className="opacity-75"
        src={prop.image}
        alt={prop.image}
        width={18}
        height={18}
      />
    </div>
  );
};

export default NativeShareIcon;
