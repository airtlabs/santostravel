import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogSection = () => {
  const blogPosts = [
    {
      title: 'Floating Cities: A New Era of Travel',
      excerpt: 'Discover the fascinating world of floating cities and how they&apos;re changing the way we think about travel and accommodation.',
      author: 'Neil Patil',
      date: '2025-01-20',
      category: 'Travel Trends',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop',
      href: '/blog/floating-cities'
    },
    {
      title: 'Is India on your list?',
      excerpt: 'Explore the incredible diversity of India and why it should be at the top of your travel bucket list this year.',
      author: 'Sunila Patil',
      date: '2025-01-18',
      category: 'Destinations',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=250&fit=crop',
      href: '/blog/is-india-on-your-list'
    },
    {
      title: 'Luxury Group Tours: The Perfect Balance',
      excerpt: 'Discover how luxury group tours combine the best of both worlds - premium experiences with the joy of shared adventures.',
      author: 'Santos.travel Team',
      date: '2025-01-15',
      category: 'Travel Tips',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop',
      href: '/blog/luxury-group-tours'
    }
  ];

  const podcasts = [
    {
      title: 'Travel. Explore. Celebrate Life Podcast with Neil and Sunila Patil',
      episodes: 31,
      language: 'English',
      description: 'Join our founders as they share travel stories, tips, and insights from around the world.'
    },
    {
      title: 'ट्रॅव्हल कट्टा | Travel Katta with Sunila Patil',
      episodes: 181,
      language: 'मराठी',
      description: 'Travel stories and experiences shared in Marathi for our regional audience.'
    },
    {
      title: 'Life Stories by Santos.travel',
      episodes: 423,
      language: 'English',
      description: 'Inspiring life stories from travelers who have explored the world with us.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Blog Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Travel tips, hacks, tricks and a whole lot more...
            </h2>
            <p className="text-xl text-gray-600">
              Stay updated with the latest travel insights and inspiration from our experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${post.image})` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <div className="text-sm font-semibold mb-2 bg-black bg-opacity-50 rounded-full px-3 py-1 inline-block">
                        {post.category}
                      </div>
                      <h3 className="text-lg font-bold bg-black bg-opacity-50 px-3 py-1 rounded">
                        {post.title.substring(0, 30)}...
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    <Link href={post.href}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Link
                    href={post.href}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              View All Blog Posts
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* Podcast Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Listen to our travel stories
            </h2>
            <p className="text-xl text-gray-600">
              Get inspired by real travel experiences and expert insights through our podcasts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcasts.map((podcast, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">🎧</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {podcast.title}
                  </h3>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-semibold">
                      {podcast.episodes} Episodes
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      {podcast.language}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-center mb-6">
                  {podcast.description}
                </p>

                <div className="text-center">
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
                    Listen Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/podcast"
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
            >
              Explore All Podcasts
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
