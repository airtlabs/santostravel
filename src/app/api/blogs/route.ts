import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const category = searchParams.get('category');
        const limit = searchParams.get('limit');

        let query = supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (status && status !== 'all') {
            query = query.eq('status', status);
        }

        if (category && category !== 'all') {
            query = query.eq('category', category);
        }

        if (limit) {
            query = query.limit(parseInt(limit));
        }

        const { data: posts, error } = await query;

        if (error) {
            console.error('Error fetching blog posts:', error);
            return NextResponse.json(
                { error: 'Failed to fetch blog posts' },
                { status: 500 }
            );
        }

        return NextResponse.json({ posts: posts || [] });
    } catch (error) {
        console.error('Error in blog posts API:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            title,
            content,
            excerpt,
            featured_image,
            author,
            category,
            tags,
            status = 'draft'
        } = body;

        if (!title || !content || !author || !category) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Generate slug from title
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        const blogPost = {
            title,
            slug,
            content,
            excerpt,
            featured_image,
            author,
            category,
            tags: tags || [],
            status,
            published_at: status === 'published' ? new Date().toISOString() : null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('blog_posts')
            .insert([blogPost])
            .select()
            .single();

        if (error) {
            console.error('Error creating blog post:', error);
            return NextResponse.json(
                { error: 'Failed to create blog post' },
                { status: 500 }
            );
        }

        return NextResponse.json({ post: data }, { status: 201 });
    } catch (error) {
        console.error('Error in blog post creation:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
