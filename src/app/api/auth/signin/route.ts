import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory user store (in production, use a proper database)
const users = [
    {
        id: 1,
        name: 'Santos Admin',
        email: 'admin@santos.travel',
        password: 'admin123', // Plain text for now - will hash during comparison
        isAdmin: true
    }
];

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Check password (simple comparison for demo)
        const isValidPassword = password === user.password;
        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Return user data (without password)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: userPassword, ...userWithoutPassword } = user;

        return NextResponse.json({
            success: true,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Sign in error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
