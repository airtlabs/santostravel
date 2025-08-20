'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import {
    Save,
    Eye,
    ArrowLeft,
    Image,
    X
} from 'lucide-react';

const NewBlogPostPage = () => {
    const router = useRouter();
    const { createPost } = useBlogPosts();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        featured_image: '',
        author: 'Admin',
        category: 'travel-tips',
        tags: [] as string[],
        status: 'draft' as 'draft' | 'published'
    });
    const [newTag, setNewTag] = useState('');

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = async (status: 'draft' | 'published') => {
        if (!formData.title.trim() || !formData.content.trim()) {
            alert('Please fill in the title and content fields.');
            return;
        }

        setLoading(true);
        try {
            await createPost({
                ...formData,
                status
            });

            alert(`Blog post ${status === 'published' ? 'published' : 'saved as draft'} successfully!`);
            router.push('/admin/blogs');
        } catch (error) {
            console.error('Error creating blog post:', error);
            alert('Error creating blog post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <div>
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Create New Blog Post</h1>
                            <p className="text-gray-600 text-sm lg:text-base">Write and publish a new blog post</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleSubmit('draft')}
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            <Save className="h-4 w-4" />
                            Save Draft
                        </button>
                        <button
                            onClick={() => handleSubmit('published')}
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            <Eye className="h-4 w-4" />
                            {loading ? 'Publishing...' : 'Publish'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title */}
                        <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="Enter blog post title"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                required
                            />
                        </div>

                        {/* Excerpt */}
                        <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Excerpt
                            </label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                                placeholder="Brief description of the blog post"
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content *
                            </label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => handleInputChange('content', e.target.value)}
                                placeholder="Write your blog post content here..."
                                rows={15}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                You can use markdown formatting for better text styling.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Featured Image */}
                        <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Featured Image
                            </label>
                            <div className="space-y-3">
                                <input
                                    type="url"
                                    value={formData.featured_image}
                                    onChange={(e) => handleInputChange('featured_image', e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                                />
                                {formData.featured_image && (
                                    <div className="relative">
                                        <img
                                            src={formData.featured_image}
                                            alt="Featured"
                                            className="w-full h-32 object-cover rounded-lg"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="flex items-center text-xs text-gray-500">
                                    <Image className="h-3 w-3 mr-1" />
                                    Recommended: 1200x600px
                                </div>
                            </div>
                        </div>

                        {/* Author */}
                        <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Author
                            </label>
                            <input
                                type="text"
                                value={formData.author}
                                onChange={(e) => handleInputChange('author', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                            />
                        </div>

                        {/* Category */}
                        <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                            >
                                <option value="travel-tips">Travel Tips</option>
                                <option value="destination-guides">Destination Guides</option>
                                <option value="travel-stories">Travel Stories</option>
                                <option value="news">News</option>
                            </select>
                        </div>

                        {/* Tags */}
                        <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tags
                            </label>
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                                        placeholder="Add a tag"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddTag}
                                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                                    >
                                        Add
                                    </button>
                                </div>
                                {formData.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {formData.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full"
                                            >
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="hover:text-yellow-900"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default NewBlogPostPage;
