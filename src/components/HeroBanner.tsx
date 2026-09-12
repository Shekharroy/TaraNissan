import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';
import { HERO_SLIDES } from '../data/nissanData';

interface HeroBannerProps {
  onSelectCar: (carId: string) => void;
  onOpenTestDrive: (carId?: string) => void;
  onOpenEmi: (carId?: string) => void;
  onOpenBrochure: (carId?: string) => void;
  onOpenDealer: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCar,
  onOpenTestDrive,
  onOpenEmi,
  onOpenBrochure,
  onOpenDealer,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleSecondaryAction = (slideId: string) => {
    if (slideId === 'slide-tekton' || slideId === 'slide-kuro') {
      onOpenTestDrive(currentSlide.vehicleId);
    } else if (slideId === 'slide-gravite') {
      onOpenEmi(currentSlide.vehicleId);
    } else if (slideId === 'slide-magnite') {
      onOpenBrochure(currentSlide.vehicleId);
    } else if (slideId === 'slide-xtrail') {
      onOpenDealer();
    } else {
      onOpenTestDrive(currentSlide.vehicleId);
    }
  };

  return (
    <section 
      id="hero-banner-section"
      className="relative w-full bg-[#0a0a0a] text-white overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Nissan Featured Vehicles"
    >
      {/* Banner Image Container */}
      <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] bg-black">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image direct from https://www.nissan.in/ */}
            <img
              src={slide.desktopBanner}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />

            {/* Gradient Overlays for optimal text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent lg:bg-gradient-to-r lg:from-black/85 lg:via-black/35 lg:to-transparent" />

            {/* Hero Overlay Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 sm:pt-0">
                <div className="max-w-xl space-y-4">
                  {/* Badge or micro label */}
                  {slide.vehicleId === 'nissan-magnite' && (
                    <div className="inline-flex items-center gap-2 bg-[#c3002f] text-white px-3 py-1 text-[12px] font-nissan-bold tracking-widest uppercase">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>5-STAR GLOBAL NCAP RATING</span>
                    </div>
                  )}

                  {/* Nissan Strapline Font Size 16px Bold uppercase */}
                  <p className="nissan-strapline text-[#e2e2e2]">
                    {slide.subtitle}
                  </p>

                  {/* Nissan Hero Title: 48px Bold uppercase */}
                  <h1 className="nissan-hero-title text-white tracking-wide drop-shadow-md">
                    {slide.title}
                  </h1>

                  {/* Price Tag */}
                  {slide.priceNote && (
                    <div className="text-[20px] font-nissan-bold text-white flex items-baseline gap-2">
                      <span className="text-[#c3002f] font-nissan-bold">&bull;</span>
                      <span>{slide.priceNote}</span>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="pt-4 flex flex-wrap gap-4 items-center">
                    <button
                      id={`hero-cta-primary-${slide.id}`}
                      onClick={() => onSelectCar(slide.vehicleId)}
                      className="btn-mui-contained px-6 py-3"
                    >
                      <span>{slide.ctaPrimary}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      id={`hero-cta-secondary-${slide.id}`}
                      onClick={() => handleSecondaryAction(slide.id)}
                      className="btn-mui-white px-6 py-3"
                    >
                      <span>{slide.ctaSecondary}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Navigation Controls */}
      <button
        id="hero-prev-btn"
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 hover:bg-black/80 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        id="hero-next-btn"
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 hover:bg-black/80 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators with Model Names */}
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-4">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                id={`hero-dot-${slide.id}`}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`py-2 px-3 transition-all text-left group cursor-pointer border-t-2 ${
                  idx === currentSlideIndex
                    ? 'border-[#c3002f] bg-black/60 text-white'
                    : 'border-white/30 bg-black/30 text-neutral-400 hover:border-white/70 hover:text-white'
                }`}
              >
                <div className="text-[11px] font-nissan-bold uppercase tracking-wider block">
                  {slide.title.replace('THE ALL-NEW ', '').replace('DRIVE HOME ', '')}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
