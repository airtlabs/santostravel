import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Simple in-memory user store (in production, use a proper database)
const users = [
    {
        id: 1,
        name: 'Santos Admin',
        email: 'admin@santos.travel',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // admin123
        isAdmin: true
    }
];

export async function POST(request: NextRequest) {
    try {
        const { name, email, password, isAdmin } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Name, email, and password are required' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = {
            id: users.length + 1,
            name,
            email,
            password: hashedPassword,
            isAdmin: Boolean(isAdmin)
        };

        users.push(newUser);

        // Return user data (without password)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: userPassword, ...userWithoutPassword } = newUser;

        return NextResponse.json({
            success: true,
            user: userWithoutPassword,
            message: 'User created successfully'
        });

    } catch (error) {
        console.error('Sign up error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
