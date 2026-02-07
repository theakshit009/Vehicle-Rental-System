import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Car, LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Button from '../../components/ui/Button';
import useEmployeeStore from '../../store/employee.store';

const EmployeeLogin = () => {
    const navigate = useNavigate();
    const { login } = useEmployeeStore();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const result = login(formData.email, formData.password);

        if (result.success) {
            navigate('/employee');
        } else {
            setError('Invalid email or password');
        }

        setLoading(false);
    };

    const handleDemoLogin = (role) => {
        const demoCredentials = {
            driver: { email: 'demo-driver@company.com', password: 'driver123' },
            staff: { email: 'demo-staff@company.com', password: 'staff123' },
            support: { email: 'demo-support@company.com', password: 'support123' },
        };

        setFormData(demoCredentials[role]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                            <Car size={28} className="text-white" />
                        </div>
                        <span className="text-2xl font-bold text-slate-900">
                            VehicleRental
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Employee Portal
                    </h1>
                    <p className="text-slate-600">
                        Sign in to access your dashboard
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="your.email@company.com"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors pr-11"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            icon={<LogIn size={18} />}
                            disabled={loading}
                            fullWidth
                            className="bg-orange-600 hover:bg-orange-700 text-white"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    {/* Demo Accounts */}
                    <div className="mt-6 pt-6 border-t border-slate-200">
                        <p className="text-xs text-slate-500 mb-3 text-center">
                            Quick login with demo accounts:
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => handleDemoLogin('driver')}
                                className="px-3 py-2 text-xs font-medium bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors border border-orange-200"
                            >
                                Driver
                            </button>
                            <button
                                onClick={() => handleDemoLogin('staff')}
                                className="px-3 py-2 text-xs font-medium bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors border border-orange-200"
                            >
                                Staff
                            </button>
                            <button
                                onClick={() => handleDemoLogin('support')}
                                className="px-3 py-2 text-xs font-medium bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors border border-orange-200"
                            >
                                Support
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <Link
                        to="/"
                        className="text-sm text-slate-600 hover:text-orange-600 transition-colors"
                    >
                        ← Back to Customer Portal
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EmployeeLogin;
