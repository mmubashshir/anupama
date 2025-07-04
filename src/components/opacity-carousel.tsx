'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import { cn } from '~/utils/cn';

import type {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from 'embla-carousel';
import type { EmblaViewportRefType } from 'embla-carousel-react';
import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';

interface EmblaCarouselContextType {
  carouselRef: EmblaViewportRefType;
  emblaApi?: EmblaCarouselType;
}

const EmblaCarouselContext = createContext<EmblaCarouselContextType | null>(
  null,
);

interface EmblaCarouselProps extends PropsWithChildren<EmblaOptionsType> {
  className?: string;
  tweenFactorBase?: number;
}

export function OpacityCarousel(props: EmblaCarouselProps) {
  const {
    className,
    children,
    tweenFactorBase = 0.64,
    loop = true,
    ...rest
  } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop, ...rest }, []);
  const tweenFactor = useRef(0);

  function numberWithinRange(number: number, min: number, max: number): number {
    return Math.min(Math.max(number, min), max);
  }

  const setTweenFactor = useCallback(
    (emblaCarouselApi: EmblaCarouselType) => {
      tweenFactor.current =
        tweenFactorBase * emblaCarouselApi.scrollSnapList().length;
    },
    [tweenFactorBase],
  );

  const tweenOpacity = useCallback(
    (carouselAPI: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = carouselAPI.internalEngine();
      const scrollProgress = carouselAPI.scrollProgress();
      const slidesInView = carouselAPI.slidesInView();
      const isScrollEvent = eventName === 'scroll';

      carouselAPI.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }

                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const opacity = numberWithinRange(tweenValue, 0, 1).toString();
          const slideNode = carouselAPI.slideNodes()[slideIndex];

          slideNode.style.opacity = opacity;
          slideNode.style.pointerEvents =
            parseFloat(opacity) < 0.9 ? 'none' : 'auto';
          carouselAPI.slideNodes()[slideIndex].style.opacity = opacity;
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);
    emblaApi
      .on('reInit', setTweenFactor)
      .on('reInit', tweenOpacity)
      .on('scroll', tweenOpacity)
      .on('slideFocus', tweenOpacity);
  }, [emblaApi, tweenOpacity, setTweenFactor]);

  return (
    <EmblaCarouselContext.Provider value={{ carouselRef: emblaRef, emblaApi }}>
      <div className={cn('mx-auto', className)}>{children}</div>
    </EmblaCarouselContext.Provider>
  );
}

interface OpacityCarouselContainerProps extends PropsWithChildren {
  className?: string;
}

export function OpacityCarouselContainer(props: OpacityCarouselContainerProps) {
  const { className, children } = props;
  const context = useContext(EmblaCarouselContext);

  return (
    <div className="overflow-hidden" ref={context?.carouselRef}>
      <div className={cn('flex touch-pan-y touch-pinch-zoom', className)}>
        {children}
      </div>
    </div>
  );
}

interface OpacityCarouselItemProps extends PropsWithChildren {
  className?: string;
  uniqueClass?: string;
}

export function OpacityCarouselSlide(props: OpacityCarouselItemProps) {
  const { className, uniqueClass, children } = props;

  return (
    <div
      className={
        uniqueClass ??
        cn(
          'w-full min-w-0 flex-shrink-0 flex-grow-0 basis-[75%] pb-3 pl-3',
          className,
        )
      }
    >
      {children}
    </div>
  );
}

export function OpacityCarouselPrevButton(
  props: ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren,
) {
  const { children, className, onClick, disabled, ...rest } = props;
  const context = useContext(EmblaCarouselContext);

  return (
    <button
      type="button"
      className={cn(
        'z-10 m-0 flex aspect-square cursor-pointer touch-manipulation items-center justify-center rounded-full border-0 border-none bg-transparent p-0 outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      disabled={context?.emblaApi?.canScrollPrev() === false || disabled}
      onClick={(e) => {
        if (context?.emblaApi) {
          context.emblaApi.scrollPrev();
        }

        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function OpacityCarouselNextButton(
  props: ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren,
) {
  const { children, className, onClick, disabled, ...rest } = props;
  const context = useContext(EmblaCarouselContext);

  return (
    <button
      type="button"
      className={cn(
        'z-10 m-0 flex aspect-square cursor-pointer touch-manipulation items-center justify-center rounded-full border-0 border-none bg-transparent p-0 outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      disabled={context?.emblaApi?.canScrollNext() === false || disabled}
      onClick={(e) => {
        if (context?.emblaApi) {
          context.emblaApi.scrollNext();
        }

        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function OpacityCarouselIndicator(props: {
  children: (activeIndex?: number) => ReactNode;
}) {
  const { children } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const context = useContext(EmblaCarouselContext);

  useEffect(() => {
    if (!context?.emblaApi) return;

    const onSelect = () => {
      if (!context.emblaApi) return;

      setActiveIndex(context.emblaApi.selectedScrollSnap());
    };

    context.emblaApi
      .on('init', () => {
        if (!context.emblaApi) return;

        setActiveIndex(context.emblaApi.selectedScrollSnap());
      })
      .on('reInit', () => {
        if (!context.emblaApi) return;

        setActiveIndex(context.emblaApi.selectedScrollSnap());
      })
      .on('select', onSelect);

    return () => {
      context.emblaApi?.off('select', onSelect);
    };
  }, [context?.emblaApi]);

  if (!context?.emblaApi) return null;

  return children(activeIndex);
}
