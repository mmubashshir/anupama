import aboutUs from '~/constants/about-us';
import { writers } from '~/constants/writers';
import Image from 'next/image';

import { Container } from '~/components/container';

import anupamaCover from '../../../public/anupama-magazine.jpg';
import type { WriterCardProps } from '~/constants/writers';

export default function AboutUs() {
  return (
    <Container className="bg-white p-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold md:text-4xl">ನಮ್ಮ ಬಗ್ಗೆ</h2>

      <div className="flex flex-col items-start gap-10 py-8 md:flex-row">
        <Image
          className="mx-auto h-auto w-[300px] object-contain"
          width={300}
          height={434}
          src={anupamaCover}
          placeholder="blur"
          alt="anupama-magazine"
        />

        <p className="text-justify leading-relaxed">{aboutUs}</p>
      </div>

      <div className="py-10">
        <h2 className="text-3xl font-extrabold md:text-4xl">ಲೇಖಕರು</h2>
        <div className="md: flex flex-wrap items-start justify-between gap-y-10 py-6 md:py-8">
          {writers.map((writer) => (
            <WriterCard key={writer.name} {...writer} />
          ))}
        </div>
      </div>
    </Container>
  );
}

function WriterCard({ name, image, position }: WriterCardProps) {
  return (
    <div className="flex w-86 gap-4">
      <div className="h-24 w-24">
        <Image
          className="h-full w-full rounded-full object-cover"
          src={image}
          alt={name}
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <h3 className="text-lg">{name}</h3>
        <span className="text-gray-600">{position}</span>
      </div>
    </div>
  );
}
