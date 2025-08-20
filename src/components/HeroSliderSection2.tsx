"use client";
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const slides = [
  {
    title: 'Bold Adventures Await',
    subtitle: 'Experience the world like never before',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&h=600&fit=crop',
  },
  {
    title: 'Colorful Journeys',
    subtitle: 'Travel with style and excitement',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
  },
  {
    title: 'Distinct Destinations',
    subtitle: 'Discover unique places and cultures',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&h=600&fit=crop',
  },
];

export default function HeroSliderSection2() {
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
    }, 4000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  return (
    <section className="relative w-full h-[60vw] max-h-[500px] min-h-[320px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background overlays: static fallback for SSR, animated after mount */}
      {mounted ? (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-blue-500/20 to-yellow-400/20 animate-gradient-move" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-pink-500/40 to-yellow-300/30 rounded-full blur-3xl animate-blob1" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-tr from-blue-400/40 to-pink-400/30 rounded-full blur-3xl animate-blob2" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-blue-500/10 to-yellow-400/10" />
        </div>
      )}
      {slides.map((slide, idx) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            style={{ objectFit: 'cover' }}
            className="w-full h-full object-cover scale-105 transition-all duration-1000 blur-sm brightness-75"
            priority={idx === 0}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl md:text-8xl font-extrabold text-white animate-title-glow relative mb-4 uppercase tracking-tight">
              <span className="relative z-10 animate-title-glow">{slide.title}</span>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none animate-title-shine" />
            </h1>
            <div className="mt-4 text-2xl md:text-3xl font-semibold text-white drop-shadow-lg animate-fade-in-up animate-subtitle-slide">
              {slide.subtitle}
            </div>
            <button className="mt-8 px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 text-white font-bold text-lg shadow-xl hover:scale-110 hover:from-yellow-400 hover:to-blue-500 transition-all duration-300 animate-fade-in-up delay-300 border-2 border-white/30 backdrop-blur-md flex items-center gap-2 group">
              <span>Explore Now</span>
              <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        </div>
      ))}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300 ${idx === current ? 'bg-white scale-125' : 'bg-transparent'}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      <style jsx global>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 8s ease-in-out infinite;
        }
        @keyframes blob1 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.1) translate(20px, -10px); }
          66% { transform: scale(0.95) translate(-10px, 20px); }
        }
        .animate-blob1 {
          animation: blob1 8s ease-in-out infinite;
        }
        @keyframes blob2 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.05) translate(-20px, 10px); }
          66% { transform: scale(0.9) translate(10px, -20px); }
        }
        .animate-blob2 {
          animation: blob2 7s ease-in-out infinite;
        }
        @keyframes title-glow {
          0%, 100% { text-shadow: 0 0 32px #fff, 0 0 64px #fff; }
          50% { text-shadow: 0 0 64px #fff, 0 0 128px #fff; }
        }
        .animate-title-glow {
          animation: title-glow 2.5s ease-in-out infinite;
        }
        @keyframes title-shine {
          0% { opacity: 0; left: 0%; }
          40% { opacity: 0.7; left: 50%; }
          60% { opacity: 0.7; left: 50%; }
          100% { opacity: 0; left: 100%; }
        }
        .animate-title-shine {
          background: linear-gradient(120deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.2) 100%);
          filter: blur(8px);
          opacity: 0.5;
          animation: title-shine 3s linear infinite;
        }
        @keyframes subtitle-slide {
          0% { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-subtitle-slide {
          animation: subtitle-slide 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </section>
  );
}
