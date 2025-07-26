import Link from 'next/link';

const PromoBanner = () => {
    return (
        <section className="py-8 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Large Promotional Banner */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
                    {/* Background with image */}
                    <div
                        className="relative h-96"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=400&fit=crop)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 opacity-80"></div>

                        {/* Content */}
                        <div className="relative h-full flex items-center justify-between px-8 md:px-16">
                            {/* Left side with penguins illustration */}
                            <div className="flex-1">
                                <div className="flex items-center space-x-4">
                                    {/* Penguin silhouettes */}
                                    <div className="hidden md:flex space-x-2">
                                        <div className="w-8 h-12 bg-black rounded-full opacity-80"></div>
                                        <div className="w-6 h-10 bg-black rounded-full opacity-60"></div>
                                        <div className="w-10 h-14 bg-black rounded-full opacity-90"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Center content */}
                            <div className="flex-1 text-center">
                                <div className="bg-yellow-400 text-black rounded-2xl p-8 transform -rotate-2 shadow-2xl">
                                    <h2 className="text-3xl md:text-5xl font-black mb-2">
                                        Asia Europe
                                    </h2>
                                    <h2 className="text-3xl md:text-5xl font-black mb-2">
                                        Africa Australia
                                    </h2>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                        The World is Waiting!
                                    </h3>
                                    <h4 className="text-xl md:text-2xl font-bold italic mb-4">
                                        Chalo, Bag Bharo, Nikal Pado with Santos.travel!
                                    </h4>
                                    <button className="bg-black text-yellow-400 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-800 transition-colors">
                                        Decide Now!
                                    </button>
                                </div>
                            </div>

                            {/* Right side */}
                            <div className="flex-1 flex justify-end">
                                <div className="bg-white rounded-2xl p-4 shadow-lg">
                                    <div className="text-center">
                                        <div className="text-blue-600 font-bold text-lg">365 days 24*7</div>
                                        <div className="text-gray-600 text-sm">from your City!</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation arrows */}
                        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-colors">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-colors">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Destination Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="flex">
                            <button className="bg-yellow-400 text-black font-bold py-3 px-8 hover:bg-yellow-500 transition-colors">
                                World
                            </button>
                            <button className="bg-white text-gray-700 font-bold py-3 px-8 hover:bg-gray-50 transition-colors border-l">
                                India
                            </button>
                        </div>
                    </div>
                </div>

                {/* Destination Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link href="/world/europe" className="group">
                        <div
                            className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-48 relative"
                            style={{
                                backgroundImage: 'url(https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-white text-2xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded">Europe</h3>
                            </div>
                        </div>
                    </Link>

                    <Link href="/world/america" className="group">
                        <div
                            className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-48 relative"
                            style={{
                                backgroundImage: 'url(https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-white text-2xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded">America</h3>
                            </div>
                        </div>
                    </Link>

                    <Link href="/world/south-east-asia" className="group">
                        <div
                            className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-48 relative"
                            style={{
                                backgroundImage: 'url(https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <h3 className="text-white text-2xl font-bold">South East Asia</h3>
                            </div>
                        </div>
                    </Link>

                    <Link href="/world/australia-new-zealand" className="group">
                        <div
                            className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-48 relative"
                            style={{
                                backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <h3 className="text-white text-2xl font-bold">Australia New Zealand</h3>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Quick Enquiry Button */}
                <div className="fixed bottom-6 right-6 z-50">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full shadow-lg transition-colors flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Quick Enquiry
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PromoBanner;
