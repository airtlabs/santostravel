'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { useState } from 'react';
import { usePackages } from '@/hooks/usePackages';

const ExploreWorldTours = () => {
    const [activeCategory, setActiveCategory] = useState('world');
    const { packages, loading } = usePackages();

    const categories = [
        { id: 'world', name: 'World Tours' },
        { id: 'specialty', name: 'Specialty Tours' },
        { id: 'customized', name: 'Customized Holidays' },
        { id: 'corporate', name: 'Corporate Travel' },
        { id: 'india', name: 'India Tours' }
    ];

    // Filter packages by active category
    const filteredPackages = packages
        .filter(pkg => pkg.status === 'published' && pkg.category === activeCategory)
        .slice(0, 4); // Show only 4 packages

    const blogPosts = [
        {
            title: 'Travel Planning Guide',
            image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
            category: 'Planning'
        },
        {
            title: 'ಬ್ಯಾಂಕಾಕ್ ಕೀಲಿ',
            image: 'https://images.unsplash.com/photo-1563492065187-53ae68b8d153?w=400&h=300&fit=crop',
            category: 'Destination'
        },
        {
            title: 'The Centre of the Universe',
            image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
            category: 'Culture'
        },
        {
            title: 'Sakal Newspaper Article',
            image: 'https://images.unsplash.com/photo-1526779259212-939e64788e8e?w=400&h=300&fit=crop',
            category: 'News'
        },
        {
            title: 'देशी आपला देश',
            image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop',
            category: 'Domestic'
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Explore the World
                    </h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeCategory === category.id
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Tour Cards Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading packages...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {filteredPackages.map((pkg) => (
                            <Link key={pkg.id} href={`/package/${pkg.id}`} className="group">
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                                    {/* Image Section */}
                                    <div className="relative h-48">
                                        <Image
                                            src={pkg.images && pkg.images.length > 0 ? pkg.images[0] : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop'}
                                            alt={pkg.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 space-y-2">
                                            <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                                                {pkg.category.toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Heart Icon */}
                                        <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                                            <Heart className="h-4 w-4 text-gray-600" />
                                        </button>

                                        {/* All Inclusive Badge */}
                                        <div className="absolute bottom-4 left-4">
                                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                                ∞ All Inclusive
                                                <span className="text-xs">ⓘ</span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>

                                        {/* Rating */}
                                        <div className="flex items-center mb-4">
                                            <div className="flex text-orange-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-current' : ''}`} />
                                                ))}
                                            </div>
                                            <span className="ml-2 text-sm text-gray-600">4.5 (25 reviews)</span>
                                        </div>

                                        {/* Tour Details */}
                                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                                            <div className="flex justify-between">
                                                <span>Duration</span>
                                                <span>Destination</span>
                                                <span>Max Guests</span>
                                            </div>
                                            <div className="flex justify-between font-semibold text-gray-900">
                                                <span>{pkg.duration}</span>
                                                <span>{pkg.destination.split(',')[0]}</span>
                                                <span>{pkg.max_participants}</span>
                                            </div>
                                        </div>

                                        {/* Pricing */}
                                        <div className="border-t pt-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <div>
                                                    <div className="text-sm text-gray-600">EMI from</div>
                                                    <div className="font-bold text-blue-600">₹{Math.round(pkg.price / 12).toLocaleString()}/mo</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-gray-600">Starts from</div>
                                                    <div className="text-2xl font-bold text-gray-900">₹{pkg.price.toLocaleString()}</div>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-500 mb-4">per person on twin sharing</div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2">
                                                <button className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold">
                                                    View Details
                                                </button>
                                                <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg transition-colors text-sm font-bold">
                                                    Book Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                {/* Blog Section */}
                <div className="border-t pt-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Travel tips, hacks, tricks and a whole lot more...
                        </h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {blogPosts.map((post, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                </div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">{post.category}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                            View All Articles
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExploreWorldTours;
