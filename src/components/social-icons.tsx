import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SocialIcons = (prop: ShareTypeProp) => {
  return (
    <Link className="p-4" href={prop.url}>
      <Image
        className="opacity-75"
        src={prop.image}
        alt={'prop.image'}
        width={18}
        height={18}
      />
    </Link>
  );
};

export enum ShareType {
  FACEBOOK = '/facebook.png',
  WHATSAPP = '/whatsapp.png',
  NATIVE = '/native.png',
}

type ShareAction = () => void;

export interface ShareTypeProp {
  image: ShareType;
  url: string;
}

export { SocialIcons };
