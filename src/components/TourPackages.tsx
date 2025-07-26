'use client';

import Link from 'next/link';
import { MapPin, Calendar, Users, Star } from 'lucide-react';
import { usePackages } from '@/hooks/usePackages';
import { useMemo } from 'react';
import Image from 'next/image';

const TourPackages = () => {
  const { packages: dbPackages, loading, error } = usePackages();

  // Calculate destination statistics
  const destinationStats = useMemo(() => {
    const stats = new Map();

    dbPackages.filter(pkg => pkg.status === 'published').forEach(pkg => {
      const destinations = pkg.destination.split(',').map(d => d.trim());
      destinations.forEach(dest => {
        if (!stats.has(dest)) {
          stats.set(dest, { count: 0, packages: [] });
        }
        stats.get(dest).count++;
        stats.get(dest).packages.push(pkg);
      });
    });

    return stats;
  }, [dbPackages]);

  // Get first 8 published packages for the home page
  const featuredPackages = dbPackages
    .filter(pkg => pkg.status === 'published')
    .slice(0, 8);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Tour Packages</h2>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Tour Packages</h2>
            <p className="text-red-600">Error loading packages</p>
          </div>
        </div>
      </section>
    );
  }

  // Keep city packages but make them more dynamic
  const cityPackages = [
    {
      city: 'Mumbai',
      tours: destinationStats.get('Mumbai')?.count || 0,
      departures: 1396,
      startingPrice: destinationStats.get('Mumbai')?.packages?.[0]?.price ? `₹${destinationStats.get('Mumbai').packages[0].price.toLocaleString()}` : '₹25,000',
      image: 'https://images.unsplash.com/photo-1595655402168-e69de7464019?w=400&h=250&fit=crop',
      href: '/packages?destination=Mumbai'
    },
    {
      city: 'Delhi',
      tours: destinationStats.get('Delhi')?.count || 0,
      departures: 463,
      startingPrice: destinationStats.get('Delhi')?.packages?.[0]?.price ? `₹${destinationStats.get('Delhi').packages[0].price.toLocaleString()}` : '₹30,000',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=250&fit=crop',
      href: '/packages?destination=Delhi'
    },
    {
      city: 'Goa',
      tours: destinationStats.get('Goa')?.count || destinationStats.get('North & South Goa')?.count || 0,
      departures: 1006,
      startingPrice: destinationStats.get('Goa')?.packages?.[0]?.price || destinationStats.get('North & South Goa')?.packages?.[0]?.price ?
        `₹${(destinationStats.get('Goa')?.packages?.[0]?.price || destinationStats.get('North & South Goa')?.packages?.[0]?.price).toLocaleString()}` : '₹28,000',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=250&fit=crop',
      href: '/packages?destination=Goa'
    },
    {
      city: 'Kerala',
      tours: destinationStats.get('Kerala')?.count || destinationStats.get('Kochi')?.count || destinationStats.get('Alleppey')?.count || 0,
      departures: 301,
      startingPrice: destinationStats.get('Kerala')?.packages?.[0]?.price || destinationStats.get('Kochi')?.packages?.[0]?.price ?
        `₹${(destinationStats.get('Kerala')?.packages?.[0]?.price || destinationStats.get('Kochi')?.packages?.[0]?.price).toLocaleString()}` : '₹32,000',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=250&fit=crop',
      href: '/packages?destination=Kerala'
    },
    {
      city: 'Rajasthan',
      tours: destinationStats.get('Rajasthan')?.count || destinationStats.get('Jaipur')?.count || destinationStats.get('Udaipur')?.count || 0,
      departures: 402,
      startingPrice: destinationStats.get('Rajasthan')?.packages?.[0]?.price || destinationStats.get('Jaipur')?.packages?.[0]?.price ?
        `₹${(destinationStats.get('Rajasthan')?.packages?.[0]?.price || destinationStats.get('Jaipur')?.packages?.[0]?.price).toLocaleString()}` : '₹29,000',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=250&fit=crop',
      href: '/packages?destination=Rajasthan'
    },
    {
      city: 'International',
      tours: dbPackages.filter(pkg => pkg.status === 'published' && pkg.category === 'world').length,
      departures: 298,
      startingPrice: dbPackages.filter(pkg => pkg.status === 'published' && pkg.category === 'world')?.[0]?.price ?
        `₹${dbPackages.filter(pkg => pkg.status === 'published' && pkg.category === 'world')[0].price.toLocaleString()}` : '₹65,000',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      href: '/packages?category=world'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* India Tour Packages */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover India
            </h2>
            <p className="text-xl text-gray-600">
              Explore the incredible diversity of India with our specially curated tour packages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map((pkg) => (
              <Link key={pkg.id} href={`/package/${pkg.id}`} className="group">
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      src={pkg.images && pkg.images.length > 0 ? pkg.images[0] : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop'}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-bold group-hover:text-blue-200 transition-colors">
                        {pkg.title}
                      </h3>
                      <p className="text-sm opacity-90">{pkg.category.toUpperCase()}</p>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-white">4.5</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{pkg.destination}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>Max {pkg.max_participants}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-green-600">
                          ₹{pkg.price.toLocaleString()}
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/packages"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              View All Tour Packages
            </Link>
          </div>
        </div>

        {/* Tours from Cities */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Santos.travel offers
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              All Inclusive tour packages
            </p>
            <p className="text-lg text-gray-600">
              No matter where you are in India or around the World, Choose from a wide range of tours, conveniently departing from your city.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityPackages.map((city, index) => (
              <Link key={index} href={city.href} className="group">
                <div className="rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${city.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-200 transition-colors">
                        Tour Packages From {city.city}
                      </h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>{city.tours} tours</span>
                          <span>{city.departures} departures</span>
                        </div>
                        <div className="text-lg font-semibold text-green-300">
                          Starts from {city.startingPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center bg-blue-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Can&apos;t find tours from your city?
            </h3>
            <p className="text-gray-600 mb-6">
              Check our Joining & leaving option. Book your own flights and join directly at the first destination of the tour.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Know More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourPackages;
