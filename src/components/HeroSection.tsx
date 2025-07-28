'use client';

import Image from 'next/image';

const HeroSection = () => {

  const promotionalBanners = [
    {
      title: 'Europe',
      price: '150000',
      duration: '6 Days',
      description: 'Amazing offer! More fun',
      bgColor: 'bg-blue-600',
      bgImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop'
    },
    {
      title: 'Rajasthan',
      price: '45000',
      duration: '7 Days',
      description: 'Royal palaces & culture',
      bgColor: 'bg-orange-600',
      bgImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop'
    },
    {
      title: 'Kerala',
      price: '60000',
      duration: '6 Days',
      description: 'Backwaters & hill stations',
      bgColor: 'bg-green-600',
      bgImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop'
    },
    {
      title: 'Australia',
      price: '200000',
      duration: '8 Days',
      description: 'Down under adventure',
      bgColor: 'bg-yellow-600',
      bgImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    }
  ];

  return (
    <section className="relative bg-white text-gray-900">
      {/* Promotional Banners */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {promotionalBanners.map((banner, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 text-center transform hover:scale-105 transition-transform cursor-pointer overflow-hidden h-48 ${banner.bgColor}`}
            >
              <Image
                src={banner.bgImage}
                alt={`Background for ${banner.title}`}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-2xl"
                priority={index < 2}
                onError={() => {
                  console.error(`Failed to load image for ${banner.title}:`, banner.bgImage);
                }}
              />
              <div className="relative z-10">
                <div className="absolute top-2 right-2 w-8 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <div className="w-6 h-10 bg-yellow-400 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-1 text-white">{banner.title}</h3>
                <div className="text-2xl font-bold mb-1 text-white">₹{banner.price}</div>
                <div className="text-sm opacity-90 mb-2 text-white">{banner.duration}</div>
                <div className="text-xs opacity-75 text-white">{banner.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Promotional Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 mb-8 text-black">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Paisa Vasool Tours Starting at just 25000
              </h2>
              <p className="text-lg">July to September</p>
              <p className="text-sm">Less crowd, Great prices, Amazing weather, More fun.</p>
              <p className="text-sm font-semibold">All-Inclusive with airfares & Santos.travel Tour Manager Services</p>
            </div>
            <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Explore Deals
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
