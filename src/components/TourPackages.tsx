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

  // Get first 12 published packages for the home page (2 rows of 6)
  const featuredPackages = dbPackages
    .filter(pkg => pkg.status === 'published')
    .slice(0, 12)
    .map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      price: `₹${pkg.price.toLocaleString()}`,
      duration: pkg.duration,
      departures: '4 Dept', // You can make this dynamic later
      image: pkg.images && pkg.images.length > 0 ? pkg.images[0] : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop',
      location: pkg.destination.split(',')[0] // First destination
    }));

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
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Featured <span className="text-pink-500">Tour Packages</span>
          </h2>
          <p className="text-lg text-gray-500 font-medium">
            Handpicked journeys to the most beautiful places
          </p>
        </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {featuredPackages.map((pkg, index) => (
            <Link key={pkg.id || index} href={`/package/${pkg.id}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                <div
                  className="h-32 relative"
                  style={{
                    backgroundImage: `url(${pkg.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-semibold text-gray-900">
                    {pkg.price}
                  </div>
                  <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 text-gray-900 px-2 py-1 rounded text-xs font-semibold">
                    {pkg.duration} | {pkg.departures}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-gray-600">{pkg.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mb-12">
          <Link href="/packages" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg transition-colors inline-block">
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TourPackages;
