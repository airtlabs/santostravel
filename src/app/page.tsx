import HeroSection from '@/components/HeroSection';
import PopularDestinations from '@/components/PopularDestinations';
import TourPackages from '@/components/TourPackages';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogSection from '@/components/BlogSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PopularDestinations />
      <TourPackages />
      <WhyChooseUs />
      <TestimonialsSection />
      <BlogSection />
    </div>
  );
}
