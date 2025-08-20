'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, User, Tag, ArrowLeft, Share2, Clock } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlogPosts';

const BlogPostPage = ({ params }: { params: Promise<{ slug: string }> }) => {
    const router = useRouter();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null);

    useEffect(() => {
        const loadParams = async () => {
            const resolvedParams = await params;
            setResolvedParams(resolvedParams);
        };
        loadParams();
    }, [params]);

    useEffect(() => {
        if (!resolvedParams) return;
        
        const fetchPost = async () => {
            try {
                // Fetch all published posts first (since we need to find by slug)
                const response = await fetch('/api/blogs?status=published');
                if (response.ok) {
                    const data = await response.json();
                    const foundPost = data.posts.find((p: BlogPost) => p.slug === resolvedParams.slug);

                    if (foundPost) {
                        setPost(foundPost);

                        // Get related posts from the same category
                        const related = data.posts
                            .filter((p: BlogPost) =>
                                p.id !== foundPost.id &&
                                p.category === foundPost.category
                            )
                            .slice(0, 3);
                        setRelatedPosts(related);
                    } else {
                        router.push('/blogs');
                    }
                }
            } catch (error) {
                console.error('Error fetching blog post:', error);
                router.push('/blogs');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [resolvedParams, router]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const estimateReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return minutes;
    };

    const handleShare = async () => {
        if (navigator.share && post) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading blog post...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h1>
                    <p className="text-gray-600 mb-4">The blog post you're looking for doesn't exist.</p>
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Blog
                    </Link>

                    <div className="mb-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
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
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{estimateReadingTime(post.content)} min read</span>
                            </div>
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            {post.title}
                        </h1>

                        {post.excerpt && (
                            <p className="text-xl text-gray-600 mb-6">
                                {post.excerpt}
                            </p>
                        )}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <Tag className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-500 capitalize">
                                        {post.category.replace('-', ' ')}
                                    </span>
                                </div>
                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <Share2 className="h-4 w-4" />
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            {post.featured_image && (
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-64 lg:h-96 object-cover"
                        />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="bg-white rounded-lg shadow-sm border p-8 lg:p-12">
                    <div className="prose prose-lg max-w-none">
                        {post.content.split('\n').map((paragraph, index) => (
                            paragraph.trim() && (
                                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                                    {paragraph}
                                </p>
                            )
                        ))}
                    </div>
                </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t bg-white">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedPosts.map((relatedPost) => (
                            <article
                                key={relatedPost.id}
                                className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                            >
                                {relatedPost.featured_image && (
                                    <div className="aspect-w-16 aspect-h-9">
                                        <img
                                            src={relatedPost.featured_image}
                                            alt={relatedPost.title}
                                            className="w-full h-32 object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                        {relatedPost.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                        {relatedPost.excerpt || relatedPost.content.substring(0, 100) + '...'}
                                    </p>
                                    <Link
                                        href={`/blogs/${relatedPost.slug}`}
                                        className="text-yellow-600 hover:text-yellow-700 font-medium text-sm transition-colors"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogPostPage;
