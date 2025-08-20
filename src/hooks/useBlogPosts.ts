import { useState, useEffect, useCallback } from 'react';

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featured_image: string;
    author: string;
    category: string;
    tags: string[];
    status: 'draft' | 'published';
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

export const useBlogPosts = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = useCallback(async (filters?: {
        status?: string;
        category?: string;
        limit?: number;
    }) => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            if (filters?.status) params.append('status', filters.status);
            if (filters?.category) params.append('category', filters.category);
            if (filters?.limit) params.append('limit', filters.limit.toString());

            const response = await fetch(`/api/blogs?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch blog posts');
            }

            const data = await response.json();
            setPosts(data.posts || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error fetching blog posts:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const createPost = async (postData: Omit<BlogPost, 'id' | 'slug' | 'created_at' | 'updated_at' | 'published_at'>) => {
        try {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error('Failed to create blog post');
            }

            const data = await response.json();
            await fetchPosts(); // Refresh the list
            return data.post;
        } catch (err) {
            console.error('Error creating blog post:', err);
            throw err;
        }
    };

    const updatePost = async (id: string, postData: Partial<BlogPost>) => {
        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error('Failed to update blog post');
            }

            const data = await response.json();
            await fetchPosts(); // Refresh the list
            return data.post;
        } catch (err) {
            console.error('Error updating blog post:', err);
            throw err;
        }
    };

    const deletePost = async (id: string) => {
        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete blog post');
            }

            await fetchPosts(); // Refresh the list
        } catch (err) {
            console.error('Error deleting blog post:', err);
            throw err;
        }
    };

    const getPost = async (id: string): Promise<BlogPost | null> => {
        try {
            const response = await fetch(`/api/blogs/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch blog post');
            }

            const data = await response.json();
            return data.post;
        } catch (err) {
            console.error('Error fetching blog post:', err);
            return null;
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return {
        posts,
        loading,
        error,
        fetchPosts,
        createPost,
        updatePost,
        deletePost,
        getPost,
    };
};
