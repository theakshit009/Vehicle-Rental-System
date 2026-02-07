import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Car, User, LogOut, BookOpen } from 'lucide-react';
import CountrySelector from '../components/ui/CountrySelector';
import { useAuthStore } from '../store/auth.store';

const PublicLayout = () => {
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = () => {
        logout();
        setShowProfileMenu(false);
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
                                <Car size={24} className="text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-900">
                                VehicleRental
                            </span>
                        </Link>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            <Link
                                to="/"
                                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                to="/search"
                                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                            >
                                Browse Vehicles
                            </Link>
                            <Link
                                to="/about"
                                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                            >
                                About Us
                            </Link>
                        </nav>

                        {/* CTA / User Profile */}
                        <div className="flex items-center gap-3">
                            {/* Country Selector */}
                            <CountrySelector />

                            {isAuthenticated ? (
                                // Logged in - Show Profile Menu
                                <div className="relative">
                                    <button
                                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                                            <User size={18} className="text-white" />
                                        </div>
                                        <span className="font-medium text-slate-900 hidden sm:block">
                                            {user?.name || 'User'}
                                        </span>
                                    </button>

                                    {showProfileMenu && (
                                        <>
                                            {/* Backdrop */}
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setShowProfileMenu(false)}
                                            />
                                            {/* Dropdown Menu */}
                                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-20">
                                                <div className="px-4 py-3 border-b border-slate-200">
                                                    <p className="font-semibold text-slate-900">{user?.name}</p>
                                                    <p className="text-sm text-slate-500">{user?.email}</p>
                                                </div>
                                                <Link
                                                    to="/profile"
                                                    onClick={() => setShowProfileMenu(false)}
                                                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-slate-700"
                                                >
                                                    <User size={18} />
                                                    <span>My Profile</span>
                                                </Link>
                                                <Link
                                                    to="/my-bookings"
                                                    onClick={() => setShowProfileMenu(false)}
                                                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-slate-700"
                                                >
                                                    <BookOpen size={18} />
                                                    <span>My Bookings</span>
                                                </Link>
                                                <div className="border-t border-slate-200 mt-2 pt-2">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-red-600 w-full text-left"
                                                    >
                                                        <LogOut size={18} />
                                                        <span>Log Out</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                // Not logged in - Show Sign In/Get Started
                                <>
                                    <Link
                                        to="/login"
                                        className="text-slate-700 hover:text-slate-900 font-medium transition-colors hidden sm:block"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 mt-16">
                <div className="container-custom py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                                    <Car size={24} className="text-white" />
                                </div>
                                <span className="text-xl font-bold text-white">
                                    VehicleRental
                                </span>
                            </div>
                            <p className="text-sm text-slate-400 max-w-md">
                                Your trusted partner for vehicle rentals across India.
                                Experience premium vehicles, transparent pricing, and exceptional service.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link to="/search" className="hover:text-white transition-colors">
                                        Browse Vehicles
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="hover:text-white transition-colors">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="hover:text-white transition-colors">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="font-semibold text-white mb-4">Legal</h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link to="/terms" className="hover:text-white transition-colors">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/privacy" className="hover:text-white transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
                        <p>&copy; {new Date().getFullYear()} VehicleRental. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
