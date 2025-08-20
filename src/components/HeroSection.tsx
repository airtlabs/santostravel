'use client';


import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

const HeroSection = () => {

  const slides = [
    {
      title: 'Vágar',
      subtitle: 'Faroe Islands',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=1000&fit=crop',
    },
    {
      title: 'Mancora',
      subtitle: 'Peru',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=1000&fit=crop',
    },
    {
      title: 'Petra',
      subtitle: 'Jordan',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=1000&fit=crop',
    },
  ];

  const [current, setCurrent] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const sliderRef = useRef<HTMLDivElement>(null);
  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // Autoplay effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [current, slides.length]);

  // Mouse parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setParallax({ x, y });
  };
  const handleMouseLeave = () => setParallax({ x: 0, y: 0 });

  return (
    <section className="relative w-full min-h-[520px] flex items-center justify-center bg-gradient-to-br from-[#f5f6fa] to-[#e7e6e1] py-8 px-2 md:px-0 overflow-hidden">
      {/* Animated gradient and blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-blue-400/10 to-yellow-300/20 animate-gradient-move" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-pink-400/40 to-yellow-300/30 rounded-full blur-3xl animate-blob1" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-tr from-blue-400/40 to-pink-400/30 rounded-full blur-3xl animate-blob2" />
      </div>
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Left: Text & Button */}
        <div className="flex-1 flex flex-col items-start justify-center pl-2 md:pl-8">
          <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_8px_32px_rgba(255,0,128,0.5)] animate-title-glow mb-4 uppercase tracking-tight">
            <span className="relative z-10 animate-title-glow">{slides[current].title}</span>
          </h1>
          <p className="text-lg md:text-2xl font-semibold text-white/90 drop-shadow-lg animate-fade-in-up mb-8 max-w-md">
            {slides[current].subtitle}
          </p>
          <button className="mb-8 px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 text-white font-bold text-lg shadow-xl hover:scale-110 hover:from-yellow-400 hover:to-blue-500 transition-all duration-300 animate-fade-in-up delay-300 border-2 border-white/30 backdrop-blur-md flex items-center gap-2 group">
            <span>Explore</span>
            <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-white hover:text-pink-400 text-xl"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-white hover:text-pink-400 text-xl"><i className="fab fa-youtube"></i></a>
            <a href="#" className="text-white hover:text-pink-400 text-xl"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        {/* Right: Card Slider */}
  <div className="flex-[2] flex flex-col items-center justify-center w-full">
          <div
            className="flex gap-6 w-full max-w-3xl"
            ref={sliderRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1200 }}
          >
            {slides.map((slide, idx) => {
              // Parallax only on the active card
              const isActive = idx === current;
              const transform = isActive
                ? `scale(1) rotateY(${parallax.x * 10}deg) rotateX(${-parallax.y * 8}deg)`
                : 'scale(0.9)';
              return (
                <div
                  key={slide.title}
                  className={`relative rounded-2xl overflow-hidden shadow-xl transition-all duration-700 flex-1 min-w-[220px] max-w-[320px] h-[380px] flex flex-col justify-end ${isActive ? 'opacity-100 z-10' : 'opacity-60 z-0'} ${Math.abs(idx - current) > 1 ? 'hidden md:block opacity-0 scale-90' : ''}`}
                  style={{ background: '#fff', transform }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="w-full h-full object-cover transition-all duration-700"
                    priority={idx === 0}
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent">
                    <h2 className="text-2xl font-bold text-white mb-1 animate-fade-in-up">{slide.title}</h2>
                    <div className="text-sm text-white/80 flex items-center gap-2 animate-fade-in-up delay-200">
                      <span className="inline-block w-2 h-2 bg-pink-500 rounded-full"></span>
                      {slide.subtitle.toUpperCase()}
                    </div>
                  </div>
      {/* Animations */}
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
          0%, 100% { text-shadow: 0 0 32px #f472b6, 0 0 64px #60a5fa; }
          50% { text-shadow: 0 0 64px #f472b6, 0 0 128px #fbbf24; }
        }
        .animate-title-glow {
          animation: title-glow 2.5s ease-in-out infinite;
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
                </div>
              );
            })}
          </div>
          {/* Pagination & Arrows */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <span className="text-[#18123b] font-bold tracking-widest text-sm">
              UNIQUE DESTINATIONS
            </span>
            <div className="flex items-center gap-2">
              <button onClick={goPrev} className="w-10 h-10 rounded-full border-2 border-[#18123b] flex items-center justify-center text-[#18123b] hover:bg-[#18123b] hover:text-white transition-all duration-300">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <span className="text-[#18123b] font-bold text-lg">
                {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
              <button onClick={goNext} className="w-10 h-10 rounded-full border-2 border-[#18123b] flex items-center justify-center text-[#18123b] hover:bg-[#18123b] hover:text-white transition-all duration-300">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
