'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePackages } from '@/hooks/usePackages';

const DestinationSection = () => {
  const { packages, loading } = usePackages();

  // Get featured packages for display (first 6 published packages)
  const featuredPackages = packages
    .filter(pkg => pkg.status === 'published')
    .slice(0, 6)
    .map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      price: `₹${pkg.price.toLocaleString()}`,
      duration: pkg.duration,
      departures: '4 Dept', // You can make this dynamic later
      image: pkg.images && pkg.images.length > 0 ? pkg.images[0] : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop',
      location: pkg.destination.split(',')[0] // First destination
    }));

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tour Package Cards */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading packages...</p>
          </div>
        ) : (
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
        )}

        {/* View More Button */}
        <div className="text-center mb-12">
          <Link href="/packages" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg transition-colors inline-block">
            View More
          </Link>
        </div>

        {/* Europe & America Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* All Set to Explore */}
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop"
                alt="Travel planning background"
                fill
                className="object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-white/85 rounded-2xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">All Set to Explore?</h2>
              <p className="text-gray-600 mb-6">
                From Europe to Asia, from families to solo journeys your perfect travel plan starts here...
              </p>
              <div className="mb-6">
                <span className="inline-block bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  NEW
                </span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg">
                View Travel Planner
              </button>
            </div>
          </div>

          {/* Europe & America */}
          <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-8 text-white overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop"
                alt="Europe landmarks background"
                fill
                className="object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-slate-900/75 rounded-2xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Europe & America</h2>
              <p className="text-lg mb-6 opacity-90">Always the right choice! Proven & trusted by thousands!</p>

              <div className="space-y-4">
                <Link href="/world/europe" className="block">
                  <div className="bg-white bg-opacity-10 rounded-lg p-4 hover:bg-opacity-20 transition-colors">
                    <h3 className="font-bold text-lg mb-2">Europe Tours</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-semibold">Europe</div>
                        <div className="opacity-75">147 tours</div>
                        <div className="opacity-75">172 departures</div>
                        <div className="opacity-75">98,549 guests travelled</div>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/world/america" className="block">
                  <div className="bg-white bg-opacity-10 rounded-lg p-4 hover:bg-opacity-20 transition-colors">
                    <h3 className="font-bold text-lg mb-2">America Tours</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-semibold">America</div>
                        <div className="opacity-75">38 tours</div>
                        <div className="opacity-75">29 departures</div>
                        <div className="opacity-75">13,348 guests travelled</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationSection;
