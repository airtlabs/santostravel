'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePackages } from '@/hooks/usePackages';
import { useMemo } from 'react';

const PopularDestinations = () => {
    const { packages } = usePackages();

    const destinationStats = useMemo(() => {
        const stats = new Map();

        packages.filter(pkg => pkg.status === 'published').forEach(pkg => {
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
    }, [packages]);

    const destinations = [
        {
            name: 'Kerala',
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop',
            tours: destinationStats.get('Kerala')?.count || destinationStats.get('Kochi')?.count || destinationStats.get('Alleppey')?.count || 0,
            departures: 153,
            guests: 51359,
            bgColor: 'from-green-600 to-emerald-700'
        },
        {
            name: 'Rajasthan',
            image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop',
            tours: destinationStats.get('Rajasthan')?.count || destinationStats.get('Jaipur')?.count || destinationStats.get('Udaipur')?.count || destinationStats.get('Jodhpur')?.count || 0,
            departures: 211,
            guests: 65820,
            bgColor: 'from-orange-600 to-red-700'
        },
        {
            name: 'Goa',
            image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop',
            tours: destinationStats.get('Goa')?.count || destinationStats.get('North & South Goa')?.count || 0,
            departures: 50,
            guests: 19751,
            bgColor: 'from-teal-600 to-cyan-700'
        },
        {
            name: 'Delhi & Agra',
            image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
            tours: destinationStats.get('Delhi')?.count || destinationStats.get('Agra')?.count || 0,
            departures: 99,
            guests: 7002,
            bgColor: 'from-purple-600 to-indigo-700'
        },
        {
            name: 'Thailand',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            tours: destinationStats.get('Bangkok')?.count || destinationStats.get('Phuket')?.count || 0,
            departures: 174,
            guests: 98549,
            bgColor: 'from-blue-600 to-slate-700'
        },
        {
            name: 'Dubai & UAE',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop',
            tours: destinationStats.get('Dubai')?.count || destinationStats.get('Abu Dhabi')?.count || 0,
            departures: 29,
            guests: 13348,
            bgColor: 'from-red-600 to-pink-700'
        },
        {
            name: 'Singapore & Malaysia',
            image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop',
            tours: destinationStats.get('Singapore')?.count || destinationStats.get('Kuala Lumpur')?.count || 0,
            departures: 232,
            guests: 142497,
            bgColor: 'from-emerald-600 to-teal-700'
        },
        {
            name: 'Himalayas',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            tours: destinationStats.get('Manali')?.count || destinationStats.get('Leh')?.count || destinationStats.get('Rishikesh')?.count || 0,
            departures: 48,
            guests: 12987,
            bgColor: 'from-yellow-600 to-orange-700'
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Explore Our Popular Destinations
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover amazing places around the world with our carefully curated tours and packages
                    </p>
                </div>

                {/* Left Side - Large Promotional Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-1">
                        <div className="relative bg-gradient-to-br from-cyan-400 to-teal-500 rounded-3xl p-8 text-white overflow-hidden h-full">
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop"
                                    alt="Travel testimonials background"
                                    fill
                                    className="object-cover rounded-3xl opacity-20"
                                />
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="mb-8">
                                    <div className="flex flex-wrap gap-4 mb-6">
                                        {/* Customer testimonial bubbles */}
                                        <div className="bg-white/90 text-gray-800 p-3 rounded-2xl text-sm max-w-xs">
                                            <p>&quot;After years of planning, this trip was amazing! The memories will last a lifetime.&quot;</p>
                                        </div>
                                        <div className="bg-white/90 text-gray-800 p-3 rounded-2xl text-sm max-w-xs ml-auto">
                                            <p>&quot;The best part? Everyone was my age. Nothing, no pressure!&quot;</p>
                                        </div>
                                        <div className="bg-white/90 text-gray-800 p-3 rounded-2xl text-sm max-w-xs">
                                            <p>&quot;I travelled solo, but never felt alone. Thanks to Santos.travel&apos;s group tours!&quot;</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <h3 className="text-2xl font-bold mb-2">Santos.travel Special</h3>
                                    <p className="text-lg mb-6 opacity-90">The Best Tour for the Best Years of Life!</p>

                                    <div className="mb-6">
                                        <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold">
                                            🎉 New Launch
                                        </span>
                                    </div>

                                    <button className="bg-white text-cyan-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                                        Explore Special Tours
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Destination Grid */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {destinations.map((destination) => (
                                <Link key={destination.name} href={`/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                    <div className={`relative bg-gradient-to-br ${destination.bgColor} rounded-xl overflow-hidden group cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                                        {/* Background Image */}
                                        <div className="absolute inset-0">
                                            <Image
                                                src={destination.image}
                                                alt={destination.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10 p-4 h-48 flex flex-col justify-between text-white">
                                            <h3 className="text-lg font-bold leading-tight">{destination.name}</h3>

                                            <div className="space-y-1 text-sm">
                                                <div className="flex justify-between">
                                                    <span>{destination.tours} tours</span>
                                                    <span>{destination.departures} departures</span>
                                                </div>
                                                <div className="text-xs opacity-90">
                                                    {destination.guests.toLocaleString()} guests travelled
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Effect */}
                                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                        View All Destinations
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PopularDestinations;
