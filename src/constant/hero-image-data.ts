import { StaticImageData } from 'next/image';
import imgHero01 from '../../public/images/hero-image-01.svg';
import imgHero02 from '../../public/images/hero-image-02.jpg';

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
    src: imgHero02,
    alt: 'Hero',
  },
  {
    src: imgHero02,
    alt: 'Hero',
  },
];
