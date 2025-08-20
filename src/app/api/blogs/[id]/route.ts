import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const { data: post, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching blog post:', error);
            return NextResponse.json(
                { error: 'Blog post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ post });
    } catch (error) {
        console.error('Error in blog post API:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await request.json();
        const {
            title,
            content,
            excerpt,
            featured_image,
            author,
            category,
            tags,
            status
        } = body;

        // Generate slug from title if title is being updated
        const updateData: any = {
            updated_at: new Date().toISOString()
        };

        if (title) {
            updateData.title = title;
            updateData.slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }

        if (content !== undefined) updateData.content = content;
        if (excerpt !== undefined) updateData.excerpt = excerpt;
        if (featured_image !== undefined) updateData.featured_image = featured_image;
        if (author !== undefined) updateData.author = author;
        if (category !== undefined) updateData.category = category;
        if (tags !== undefined) updateData.tags = tags;
        if (status !== undefined) {
            updateData.status = status;
            if (status === 'published') {
                updateData.published_at = new Date().toISOString();
            }
        }

        const { data, error } = await supabase
            .from('blog_posts')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating blog post:', error);
            return NextResponse.json(
                { error: 'Failed to update blog post' },
                { status: 500 }
            );
        }

        return NextResponse.json({ post: data });
    } catch (error) {
        console.error('Error in blog post update:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const { error } = await supabase
            .from('blog_posts')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting blog post:', error);
            return NextResponse.json(
                { error: 'Failed to delete blog post' },
                { status: 500 }
            );
        }

        return NextResponse.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Error in blog post deletion:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
