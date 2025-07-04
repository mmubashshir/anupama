// SocialIcons.tsx
import Image from 'next/image';
import Link from 'next/link';

export function SocialIcons(prop: ShareTypeProp) {
  return (
    <Link
      className="transition-transform hover:scale-110"
      href={prop.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        className="opacity-75 hover:opacity-100"
        src={prop.image}
        alt="prop.image"
        width={18}
        height={18}
      />
    </Link>
  );
}

export enum ShareType {
  FACEBOOK = '/facebook.png',
  WHATSAPP = '/whatsapp.png',
  NATIVE = '/native.png',
}

export interface ShareTypeProp {
  image: ShareType;
  url: string;
}
