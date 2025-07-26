'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { useState } from 'react';

const CustomizedHolidays = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const destinations = [
        {
            title: 'Taipei and Surrounds',
            subtitle: 'Visit Taipei 101, Jiufen Village, Pinglin Tea Plantation and a lot more',
            duration: '5 Days',
            price: 'just US$ 650',
            image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&h=400&fit=crop',
            location: 'Taiwan'
        },
        {
            title: 'Tokyo Adventure',
            subtitle: 'Explore Shibuya, Mount Fuji, Traditional temples and modern culture',
            duration: '7 Days',
            price: 'just US$ 890',
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop',
            location: 'Japan'
        },
        {
            title: 'Seoul Discovery',
            subtitle: 'Visit Gyeongbokgung Palace, Jeju Island, Busan beaches and K-culture sites',
            duration: '6 Days',
            price: 'just US$ 750',
            image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=600&h=400&fit=crop',
            location: 'South Korea'
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % destinations.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + destinations.length) % destinations.length);
    };

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side - Image Carousel */}
                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-600 to-purple-700">
                            {/* Background Image */}
                            <div className="relative h-96 lg:h-[500px]">
                                <Image
                                    src={destinations[currentSlide].image}
                                    alt={destinations[currentSlide].title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                    <div className="mb-4">
                                        <h3 className="text-3xl font-bold text-yellow-400 mb-2">
                                            {destinations[currentSlide].title}
                                        </h3>
                                        <p className="text-lg mb-4 opacity-90">
                                            {destinations[currentSlide].subtitle}
                                        </p>
                                        <div className="flex items-center gap-6">
                                            <span className="text-xl font-semibold">
                                                {destinations[currentSlide].duration}
                                            </span>
                                            <span className="text-2xl font-bold">
                                                @ {destinations[currentSlide].price}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>

                        {/* Slide Indicators */}
                        <div className="flex justify-center mt-6 space-x-3">
                            {destinations.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                            ? 'bg-blue-600 scale-125'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                Discover the World, <br />
                                <span className="text-blue-600">specially curated for you!</span>
                            </h2>

                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                Our exclusive customized holidays division can cater to every travel need:
                                hotel, air tickets, VISA, sightseeings, transfer or the entire package, all
                                designed keeping in mind your interests!
                            </p>

                            <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-500">
                                <p className="text-lg text-gray-700 font-medium">
                                    Tell us what you want and we will design it for you.
                                </p>
                            </div>
                        </div>

                        {/* Call to Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                                Enquire now
                            </button>

                            <div className="flex items-center">
                                <span className="text-gray-600 text-lg mr-4">or</span>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-blue-600" />
                                    <div className="space-y-1">
                                        <a
                                            href="tel:18002279979"
                                            className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors"
                                        >
                                            1800 22 7979
                                        </a>
                                        <span className="text-gray-500"> / </span>
                                        <a
                                            href="tel:18003135555"
                                            className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors"
                                        >
                                            1800 313 5555
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Features */}
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                                <div className="text-2xl font-bold text-blue-600 mb-1">500+</div>
                                <div className="text-sm text-gray-600">Custom Packages</div>
                            </div>
                            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                                <div className="text-2xl font-bold text-green-600 mb-1">24/7</div>
                                <div className="text-sm text-gray-600">Support Available</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Contact Button */}
                <div className="fixed bottom-6 right-6 z-50">
                    <div className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center gap-2">
                        <span className="font-semibold">Book Online</span>
                        <div className="text-xs">
                            <div>365 days, 24*7</div>
                            <div>from your city!</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomizedHolidays;
