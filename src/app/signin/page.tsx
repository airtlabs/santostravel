'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const SignInPage = () => {
    const searchParams = useSearchParams();
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        isAdmin: false
    });
    const [error, setError] = useState('');
    const router = useRouter();
    const { signIn, signUp } = useAuth();

    // Check URL params for signup mode
    useEffect(() => {
        const mode = searchParams.get('mode');
        if (mode === 'signup') {
            setIsSignUp(true);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isSignUp) {
                // Sign up logic using AuthContext
                const success = await signUp(formData.name, formData.email, formData.password);
                
                if (success) {
                    // Redirect to home page after successful signup
                    router.push('/');
                } else {
                    setError('Sign up failed. Please try again.');
                }
            } else {
                // Sign in logic using AuthContext
                const success = await signIn(formData.email, formData.password);
                
                if (success) {
                    // Check if user is admin and redirect accordingly
                    const userData = JSON.parse(localStorage.getItem('user') || '{}');
                    if (userData.isAdmin) {
                        router.push('/admin/dashboard');
                    } else {
                        // Redirect to previous page or home
                        const returnUrl = searchParams.get('returnUrl') || '/';
                        router.push(returnUrl);
                    }
                } else {
                    setError('Invalid email or password');
                }
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <img
                            src="/santos-logo.png"
                            alt="Santos Travel"
                            className="h-12 mx-auto mb-4"
                        />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {isSignUp 
                            ? 'Sign up to start your travel journey' 
                            : 'Sign in to access your account'
                        }
                    </p>
                </div>

                {/* Sign In/Up Form */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field (Sign Up only) */}
                        {isSignUp && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required={isSignUp}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            {loading 
                                ? (isSignUp ? 'Creating Account...' : 'Signing In...') 
                                : (isSignUp ? 'Create Account' : 'Sign In')
                            }
                        </button>
                    </form>

                    {/* Toggle Sign In/Up */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                            <button
                                onClick={() => {
                                    setIsSignUp(!isSignUp);
                                    setError('');
                                    setFormData({ email: '', password: '', name: '', isAdmin: false });
                                }}
                                className="ml-2 text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </button>
                        </p>
                    </div>

                    {/* Quick Admin Access */}
                    {!isSignUp && (
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-800">
                                <strong>Demo Admin Access:</strong><br />
                                Email: <code className="bg-yellow-100 px-1 rounded">admin@santos.travel</code><br />
                                Password: <code className="bg-yellow-100 px-1 rounded">admin123</code>
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({
                                        ...formData,
                                        email: 'admin@santos.travel',
                                        password: 'admin123'
                                    });
                                }}
                                className="mt-2 text-xs bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-2 py-1 rounded transition-colors"
                            >
                                Fill Demo Credentials
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
