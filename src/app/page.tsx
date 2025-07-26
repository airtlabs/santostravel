import HeroSection from '@/components/HeroSection';
import DestinationSection from '@/components/DestinationSection';
import PopularDestinations from '@/components/PopularDestinations';
import CustomizedHolidays from '@/components/CustomizedHolidays';
import ExploreWorldTours from '@/components/ExploreWorldTours';
import PromoBanner from '@/components/PromoBanner';
import TourPackages from '@/components/TourPackages';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogSection from '@/components/BlogSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <DestinationSection />
      <PopularDestinations />
      <CustomizedHolidays />
      <ExploreWorldTours />
      <PromoBanner />
      <TourPackages />
      <WhyChooseUs />
      <TestimonialsSection />
      <BlogSection />
    </div>
  );
}
