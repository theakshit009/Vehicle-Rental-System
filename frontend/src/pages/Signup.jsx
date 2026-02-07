import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuthStore } from '../store/auth.store';

const Signup = () => {
    const navigate = useNavigate();
    const { mockLogin, isAuthenticated } = useAuthStore();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
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

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        // Phone validation
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase, and number';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Terms validation
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
        }, 1500);
    };

    const getPasswordStrength = () => {
        const password = formData.password;
        if (!password) return null;

        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;

        return strength;
    };

    const passwordStrength = getPasswordStrength();
    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Hero Image */}
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
                            Join VehicleRental
                        </h2>
                        <p className="text-xl text-indigo-100 drop-shadow-lg max-w-md">
                            Create an account and unlock exclusive deals on premium vehicles
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white py-8">
                <div className="max-w-md w-full space-y-6 md:space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Create Account
                        </h2>
                        <p className="mt-2 text-slate-600">
                            Sign up to start renting vehicles
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 md:mt-8 space-y-4 md:space-y-5">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="pl-10"
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && (
                                <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.name}</span>
                                </div>
                            )}
                        </div>

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

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="pl-10"
                                    placeholder="9876543210"
                                />
                            </div>
                            {errors.phone && (
                                <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.phone}</span>
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
                                    placeholder="Create a strong password"
                                />
                            </div>
                            {passwordStrength !== null && formData.password && (
                                <div className="mt-2">
                                    <div className="flex gap-1">
                                        {[0, 1, 2, 3].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1 flex-1 rounded ${level < passwordStrength
                                                    ? strengthColors[passwordStrength - 1]
                                                    : 'bg-slate-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-600 mt-1">
                                        {strengthLabels[passwordStrength - 1]} password
                                    </p>
                                </div>
                            )}
                            {errors.password && (
                                <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.password}</span>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="pl-10"
                                    placeholder="Re-enter your password"
                                />
                                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                                )}
                            </div>
                            {errors.confirmPassword && (
                                <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.confirmPassword}</span>
                                </div>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div>
                            <div className="flex items-start">
                                <input
                                    id="agreeToTerms"
                                    name="agreeToTerms"
                                    type="checkbox"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer mt-0.5"
                                />
                                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-slate-700 cursor-pointer">
                                    I agree to the{' '}
                                    <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                                        Terms and Conditions
                                    </a>
                                    {' '}and{' '}
                                    <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                            {errors.agreeToTerms && (
                                <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.agreeToTerms}</span>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </Button>

                        {/* Login Link */}
                        <div className="text-center text-sm">
                            <span className="text-slate-600">Already have an account? </span>
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
