import { StaticImageData } from 'next/image';
import imgHero01 from '../../public/images/hero-image-01.png';

interface HeroImageProps {
  src: StaticImageData;
  alt: string;
}

export const HeroImageData: HeroImageProps[] = [
  {
    src: imgHero01,
    alt: 'Hero',
  },
  {
    src: imgHero01,
    alt: 'Hero',
  },
  {
    src: imgHero01,
    alt: 'Hero',
  },
];
