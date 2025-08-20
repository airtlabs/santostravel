"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Package {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  image_url?: string;
  description?: string;
}

const TravelPlanner = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    fetch('/api/packages')
      .then((res) => res.json())
      .then((data) => {
        setPackages(data.packages || []);
        setLoading(false);
      });
  }, []);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-10 px-2 md:px-0">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-900 mb-8 drop-shadow-lg">Travel Planner</h1>
          <p className="text-center text-lg text-gray-700 mb-10">Select your favorite packages and create your own custom itinerary!</p>
        {loading ? (
          <div className="text-center text-blue-600 text-xl">Loading packages...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className={`relative rounded-xl shadow-lg border-2 transition-all duration-300 bg-white p-6 flex flex-col md:flex-row gap-4 ${selected.includes(pkg.id) ? 'border-yellow-400 scale-105' : 'border-gray-200'}`}
                onClick={() => toggleSelect(pkg.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="w-full md:w-40 h-32 relative flex-shrink-0">
                  <Image
                    src={pkg.image_url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'}
                    alt={pkg.title}
                    fill
                    className="object-cover rounded-lg"
                    unoptimized
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-blue-800 mb-1">{pkg.title}</h2>
                    <div className="text-sm text-gray-500 mb-2">{pkg.destination} &bull; {pkg.duration}</div>
                    <p className="text-gray-700 text-sm mb-2 line-clamp-2">{pkg.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-semibold text-yellow-600">₹{pkg.price}</span>
                    <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold ${selected.includes(pkg.id) ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'}`}>{selected.includes(pkg.id) ? 'Added' : 'Add'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {selected.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-blue-900 px-8 py-4 rounded-full shadow-xl border-2 border-yellow-600 flex items-center gap-4 z-50 animate-bounce-in">
            <span className="font-bold">{selected.length} package{selected.length > 1 ? 's' : ''} selected</span>
            <button
              className="bg-blue-900 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition"
              onClick={() => setShowSummary(true)}
            >
              Plan My Trip
            </button>
          </div>
        )}

        {/* Summary Modal */}
        {showSummary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in-up">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-700 text-2xl font-bold"
                onClick={() => setShowSummary(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">Your Custom Trip Plan</h2>
              <ul className="divide-y divide-gray-200 mb-6">
                {packages.filter(pkg => selected.includes(pkg.id)).map(pkg => (
                  <li key={pkg.id} className="py-3 flex items-center gap-4">
                    <div className="w-16 h-12 relative flex-shrink-0">
                      <Image
                        src={pkg.image_url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'}
                        alt={pkg.title}
                        fill
                        className="object-cover rounded-lg"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-blue-800">{pkg.title}</div>
                      <div className="text-xs text-gray-500">{pkg.destination} &bull; {pkg.duration}</div>
                    </div>
                    <div className="text-yellow-600 font-bold text-base">₹{pkg.price}</div>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col items-center gap-2">
                <span className="text-lg font-bold text-blue-900">Total: ₹{packages.filter(pkg => selected.includes(pkg.id)).reduce((sum, pkg) => sum + (pkg.price || 0), 0)}</span>
                <button
                  className="mt-2 bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-bold hover:bg-yellow-500 transition"
                  onClick={() => setShowSummary(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default TravelPlanner;
