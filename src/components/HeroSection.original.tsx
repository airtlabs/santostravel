'use client';

import { useState } from 'react';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
    const [searchType, setSearchType] = useState('destination');

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
        <section className="relative bg-white text-gray-900 min-h-screen">
            {/* Promotional Banners */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
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

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        All Set to Explore?
                    </h1>
                    <p className="text-xl md:text-2xl mb-4">
                        From Europe to Asia, from families to solo journeys
                    </p>
                    <p className="text-lg opacity-90">
                        Your perfect travel plan starts here with Santos.travel
                    </p>
                </div>

                {/* Search Section */}
                <div className="max-w-5xl mx-auto relative">
                    {/* Main Search Container */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                        {/* Search Type Toggle */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-gray-100 p-1 rounded-full">
                                <button
                                    onClick={() => setSearchType('destination')}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${searchType === 'destination'
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                                        : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                >
                                    🌍 Search by Destination
                                </button>
                                <button
                                    onClick={() => setSearchType('departure')}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${searchType === 'departure'
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                                        : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                >
                                    ✈️ Search by Departure
                                </button>
                            </div>
                        </div>

                        {/* Search Form */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            {/* Destination/Departure Input */}
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder={searchType === 'destination' ? '🏖️ Where to?' : '🛫 Departure City'}
                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 transition-all duration-300 hover:border-gray-300"
                                />
                            </div>

                            {/* Date Input */}
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <input
                                    type="date"
                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-300 hover:border-gray-300"
                                />
                            </div>

                            {/* Travelers Select */}
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors z-10">
                                    <Users className="h-5 w-5" />
                                </div>
                                <select className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-300 hover:border-gray-300 appearance-none bg-white">
                                    <option value="">👥 Travelers</option>
                                    <option value="1">1 Person</option>
                                    <option value="2">2 People</option>
                                    <option value="3">3 People</option>
                                    <option value="4">4+ People</option>
                                </select>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Search Button */}
                            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105">
                                <Search className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                                <span>Search Tours</span>
                            </button>
                        </div>

                        {/* Popular Destinations */}
                        <div className="text-center">
                            <p className="text-gray-600 mb-4 font-medium">✨ Popular Destinations:</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {[
                                    { name: 'Europe', emoji: '🏰' },
                                    { name: 'Thailand', emoji: '🏝️' },
                                    { name: 'Dubai', emoji: '🏙️' },
                                    { name: 'Switzerland', emoji: '🏔️' },
                                    { name: 'Kerala', emoji: '🌴' },
                                    { name: 'Rajasthan', emoji: '🕌' },
                                    { name: 'Goa', emoji: '🏖️' }
                                ].map((dest) => (
                                    <button
                                        key={dest.name}
                                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium hover:from-blue-100 hover:to-purple-100 transition-all duration-300 border border-blue-200 hover:border-blue-300 transform hover:scale-105 shadow-sm hover:shadow-md"
                                    >
                                        {dest.emoji} {dest.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Floating Elements for Visual Enhancement */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-70 animate-bounce"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-70 animate-pulse"></div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105">
                        View Travel Planner 2025
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
