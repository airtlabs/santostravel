"use client";
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const slides = [
  {
    title: 'Portal to Adventure',
    subtitle: 'Step into a new world of travel',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&h=600&fit=crop',
  },
  {
    title: 'Futuristic Journeys',
    subtitle: 'Travel beyond imagination',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
  },
  {
    title: 'Timeless Destinations',
    subtitle: 'Experience the extraordinary',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&h=600&fit=crop',
  },
];

export default function PortalHeroSlider() {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  return (
    <section className="relative w-full h-[60vw] max-h-[520px] min-h-[340px] flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Portal Effect */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className={`relative w-[340px] h-[340px] md:w-[480px] md:h-[480px] rounded-full bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 shadow-2xl border-8 border-white/10 ${mounted ? 'animate-portal-glow' : ''}`}>
          {/* Portal inner glow */}
          <div className="absolute inset-8 rounded-full bg-white/10 blur-2xl" />
          {/* Portal shine */}
          <div className="absolute left-1/2 top-1/2 w-2/3 h-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-3xl opacity-60 animate-portal-shine" />
        </div>
      </div>
      {/* Slide Images */}
      {slides.map((slide, idx) => (
        <div
          key={slide.title}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out ${idx === current ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            style={{ objectFit: 'cover' }}
            className="w-full h-full object-cover scale-110 blur-[2px] brightness-75 transition-all duration-1000"
            priority={idx === 0}
          />
        </div>
      ))}
      {/* Foreground Content in Portal */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
        <div className="flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 uppercase tracking-tight animate-portal-title-glow drop-shadow-lg">
            {slides[current].title}
          </h1>
          <div className="mt-2 text-2xl md:text-3xl font-semibold text-white/90 animate-portal-subtitle-fade">
            {slides[current].subtitle}
          </div>
        </div>
      </div>
      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-40">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-4 h-4 rounded-full border-2 border-white/70 transition-all duration-300 ${idx === current ? 'bg-white/90 scale-125 shadow-lg' : 'bg-transparent'}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      {/* Animations */}
      <style jsx global>{`
        @keyframes portal-glow {
          0%, 100% { box-shadow: 0 0 80px 40px #a855f7, 0 0 0 0 #fff0; }
          50% { box-shadow: 0 0 120px 60px #f472b6, 0 0 0 0 #fff0; }
        }
        .animate-portal-glow {
          animation: portal-glow 3s ease-in-out infinite;
        }
        @keyframes portal-shine {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-portal-shine {
          animation: portal-shine 2.5s ease-in-out infinite;
        }
        @keyframes portal-title-glow {
          0%, 100% { text-shadow: 0 0 32px #fff, 0 0 64px #a855f7; }
          50% { text-shadow: 0 0 64px #fff, 0 0 128px #f472b6; }
        }
        .animate-portal-title-glow {
          animation: portal-title-glow 2.5s ease-in-out infinite;
        }
        @keyframes portal-subtitle-fade {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-portal-subtitle-fade {
          animation: portal-subtitle-fade 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </section>
  );
}
