import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuthStore } from '../store/auth.store';

const Login = () => {
    const navigate = useNavigate();
    const { mockLogin, isAuthenticated } = useAuthStore();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Redirect if already authenticated
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            mockLogin();
            setIsLoading(false);
            navigate('/');
        }, 1000);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white py-8">
                <div className="max-w-md w-full space-y-6 md:space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-slate-600">
                            Sign in to your account to continue
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="pl-10"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                {errors.email && (
                                    <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.email}</span>
                                    </div>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="pl-10"
                                        placeholder="Enter your password"
                                    />
                                </div>
                                {errors.password && (
                                    <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.password}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer"
                                />
                                <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-700 cursor-pointer">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>

                        {/* Sign Up Link */}
                        <div className="text-center text-sm">
                            <span className="text-slate-600">Don't have an account? </span>
                            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right Side - Hero Image */}
            <div className="hidden lg:block lg:flex-1 relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("/images/hero-background.jpg")',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-indigo-800/85 to-indigo-900/90" />
                </div>

                <div className="relative h-full flex items-center justify-center p-12">
                    <div className="text-center text-white">
                        <h2 className="text-4xl font-bold mb-4 drop-shadow-xl">
                            Start Your Journey
                        </h2>
                        <p className="text-xl text-indigo-100 drop-shadow-lg">
                            Access exclusive deals and manage your bookings
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
