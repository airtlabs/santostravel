'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlogPosts';

const BlogsPage = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const params = new URLSearchParams();
                params.append('status', 'published');
                if (selectedCategory !== 'all') {
                    params.append('category', selectedCategory);
                }

                const response = await fetch(`/api/blogs?${params.toString()}`);
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data.posts || []);
                }
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [selectedCategory]);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'travel-tips', label: 'Travel Tips' },
        { value: 'destination-guides', label: 'Destination Guides' },
        { value: 'travel-stories', label: 'Travel Stories' },
        { value: 'news', label: 'News' }
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Santos Travel Blog
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover amazing destinations, travel tips, and inspiring stories from around the world
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search blog posts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="lg:w-64">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            >
                                {categories.map((category) => (
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Blog Posts */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
                        <p className="text-gray-600 mt-4">Loading blog posts...</p>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No blog posts found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <article
                                key={post.id}
                                className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
                            >
                                {post.featured_image && (
                                    <div className="aspect-w-16 aspect-h-9">
                                        <img
                                            src={post.featured_image}
                                            alt={post.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            <time dateTime={post.published_at || post.created_at}>
                                                {formatDate(post.published_at || post.created_at)}
                                            </time>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User className="h-4 w-4" />
                                            <span>{post.author}</span>
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {post.excerpt || truncateText(post.content, 150)}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <Tag className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm text-gray-500 capitalize">
                                                {post.category.replace('-', ' ')}
                                            </span>
                                        </div>
                                        <Link
                                            href={`/blogs/${post.slug}`}
                                            className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
                                        >
                                            Read More
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>

                                    {post.tags && post.tags.length > 0 && (
                                        <div className="mt-4 pt-4 border-t">
                                            <div className="flex flex-wrap gap-2">
                                                {post.tags.slice(0, 3).map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {post.tags.length > 3 && (
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                        +{post.tags.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogsPage;
