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
        alt="share icon"
        width={prop.width ?? 25}
        height={prop.height ?? 25}
      />
    </Link>
  );
}

export enum ShareType {
  FACEBOOK = '/facebook.png',
  WHATSAPP = '/whatsapp.png',
  NATIVE = '/native.jpg',
}

export interface ShareTypeProp {
  image: ShareType;
  url: string;
  width?: number;
  height?: number;
}
