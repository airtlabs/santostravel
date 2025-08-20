'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import {
    Plus,
    Search,
    Edit,
    Eye,
    Trash2,
    Calendar,
    User,
    Tag,
    ChevronDown
} from 'lucide-react';

const AdminBlogsPage = () => {
    const { posts, loading, error, deletePost } = useBlogPosts();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    const filteredPosts = posts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const handleDelete = async (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                await deletePost(id);
                alert('Blog post deleted successfully');
            } catch (error) {
                console.error('Error deleting blog post:', error);
                alert('Error deleting blog post. Please try again.');
            }
        }
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            draft: 'bg-yellow-100 text-yellow-800',
            published: 'bg-green-100 text-green-800'
        };
        return `px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`;
    };

    const truncateContent = (content: string, maxLength: number = 100) => {
        if (content.length <= maxLength) return content;
        return content.substr(0, maxLength) + '...';
    };

    if (error) {
        return (
            <AdminLayout>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Blog Posts</h1>
                        <p className="text-gray-600">{error}</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                    <div>
                        <h1 className="text-xl lg:text-3xl font-bold text-gray-900">Blog Management</h1>
                        <p className="text-gray-600 mt-1 text-sm lg:text-base">Create and manage blog posts</p>
                    </div>
                    <Link
                        href="/admin/blogs/new"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 lg:px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm lg:text-base"
                    >
                        <Plus className="h-4 w-4" />
                        Create Blog Post
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search blog posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                            />
                        </div>

                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'published')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 appearance-none text-sm"
                            >
                                <option value="all">All Status</option>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                        </div>

                        <div className="relative">
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 appearance-none text-sm"
                            >
                                <option value="all">All Categories</option>
                                <option value="travel-tips">Travel Tips</option>
                                <option value="destination-guides">Destination Guides</option>
                                <option value="travel-stories">Travel Stories</option>
                                <option value="news">News</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Blog Posts List */}
                <div className="bg-white rounded-lg shadow-sm border">
                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
                            <p className="text-gray-600 mt-2">Loading blog posts...</p>
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-600">No blog posts found matching your criteria.</p>
                        </div>
                    ) : (
                        <>
                            {/* Mobile Cards */}
                            <div className="lg:hidden">
                                {filteredPosts.map((post) => (
                                    <div key={post.id} className="border-b border-gray-200 p-4 last:border-b-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900 text-sm">{post.title}</h3>
                                                <p className="text-xs text-gray-500">{truncateContent(post.excerpt || post.content, 80)}</p>
                                            </div>
                                            <span className={getStatusBadge(post.status)}>
                                                {post.status}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                                            <div className="flex items-center gap-2">
                                                <User className="h-3 w-3" />
                                                <span>{post.author}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-3 w-3" />
                                                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Tag className="h-3 w-3" />
                                                <span className="capitalize">{post.category.replace('-', ' ')}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/blogs/${post.slug}`}
                                                    className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded"
                                                    target="_blank"
                                                >
                                                    <Eye className="h-3 w-3" />
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/admin/blogs/edit/${post.id}`}
                                                    className="flex items-center gap-1 px-2 py-1 text-xs text-yellow-600 hover:bg-yellow-50 rounded"
                                                >
                                                    <Edit className="h-3 w-3" />
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.id, post.title)}
                                                    className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop Table */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Blog Post
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Author & Category
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredPosts.map((post) => (
                                            <tr key={post.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {post.title}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {truncateContent(post.excerpt || post.content)}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{post.author}</div>
                                                    <div className="text-sm text-gray-500 capitalize">
                                                        {post.category.replace('-', ' ')}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={getStatusBadge(post.status)}>
                                                        {post.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {new Date(post.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={`/blogs/${post.slug}`}
                                                            className="text-blue-600 hover:text-blue-900 p-1"
                                                            title="View Blog Post"
                                                            target="_blank"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                        <Link
                                                            href={`/admin/blogs/edit/${post.id}`}
                                                            className="text-yellow-600 hover:text-yellow-900 p-1"
                                                            title="Edit Blog Post"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(post.id, post.title)}
                                                            className="text-red-600 hover:text-red-900 p-1"
                                                            title="Delete Blog Post"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <div className="text-xl lg:text-2xl font-bold text-gray-900">{posts.length}</div>
                        <div className="text-xs lg:text-sm text-gray-600">Total Posts</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <div className="text-xl lg:text-2xl font-bold text-green-600">
                            {posts.filter(p => p.status === 'published').length}
                        </div>
                        <div className="text-xs lg:text-sm text-gray-600">Published</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <div className="text-xl lg:text-2xl font-bold text-yellow-600">
                            {posts.filter(p => p.status === 'draft').length}
                        </div>
                        <div className="text-xs lg:text-sm text-gray-600">Drafts</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <div className="text-xl lg:text-2xl font-bold text-blue-600">
                            {new Set(posts.map(p => p.category)).size}
                        </div>
                        <div className="text-xs lg:text-sm text-gray-600">Categories</div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminBlogsPage;
