import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { HeroImageData } from '@/constant/hero-image-data';
import Image from 'next/image';
import { ComponentProps } from '@/global-type/component-type';
import { cn } from '@/lib/utils';

export const Carousel: React.FC<ComponentProps> = ({ className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const goToSlide = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  };

  return (
    <div
      className={cn('embla h-37.5 w-full md:h-116.75', className)}
      ref={emblaRef}
    >
      <div className='embla__container w-full md:h-110.25'>
        {HeroImageData.map((image, index) => (
          <div
            key={index}
            className='embla__slide flex-center h-33 overflow-hidden rounded-md md:h-110.25 md:rounded-4xl'
          >
            <Image
              src={image.src}
              alt={image.alt}
              className='overflow-hidden rounded-md md:rounded-4xl'
            />
          </div>
        ))}
      </div>
      {/* Dot Navigation */}
      <div className='embla__dots mt-2 flex justify-center gap-x-1 md:mt-4 md:gap-x-1.5'>
        {Array.from({ length: 3 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`embla__dot size-1 cursor-pointer rounded-full md:size-2 ${
              index === currentIndex ? 'bg-primary-500' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
