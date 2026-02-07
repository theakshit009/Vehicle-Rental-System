import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Button from '../../components/ui/Button';
import useBranchStore from '../../store/branch.store';
import { SUPPORTED_COUNTRIES } from '../../config/i18n.config';

const BranchLogin = () => {
    const navigate = useNavigate();
    const { setUserRole, setCurrentBranch } = useBranchStore();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        branch: '',
        country: '',
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

        // Validate branch and country selection
        if (!formData.branch || !formData.country) {
            setError('Please select both country and branch');
            setLoading(false);
            return;
        }

        // Demo authentication logic
        const validCredentials = {
            'manager@branch.com': { password: 'manager123', role: 'manager' },
            'staff@branch.com': { password: 'staff123', role: 'staff' },
        };

        const userCreds = validCredentials[formData.email];

        if (userCreds && userCreds.password === formData.password) {
            // Find selected branch data from the country-specific branches
            const selectedBranch = availableBranches.find(b => b.id === formData.branch);

            // Update branch store with selected branch
            if (selectedBranch) {
                setCurrentBranch({
                    id: selectedBranch.id,
                    name: selectedBranch.name,
                    location: selectedBranch.location,
                    country: formData.country,
                    status: 'operational',
                    vehicleCount: 48,
                    staffCount: 12,
                    utilization: 78
                });
            }

            setUserRole(userCreds.role);
            navigate('/branch');
        } else {
            setError('Invalid email or password');
        }

        setLoading(false);
    };

    const handleDemoLogin = (role) => {
        const demoCredentials = {
            manager: { email: 'manager@branch.com', password: 'manager123', branch: 'in-001', country: 'IN' },
            staff: { email: 'staff@branch.com', password: 'staff123', branch: 'in-001', country: 'IN' },
        };

        setFormData(demoCredentials[role]);
    };

    // Country-specific branches
    const branchesByCountry = {
        IN: [
            { id: 'in-001', name: 'Mumbai Central Branch', location: 'Mumbai, Maharashtra' },
            { id: 'in-002', name: 'Delhi Airport Branch', location: 'New Delhi' },
            { id: 'in-003', name: 'Bangalore Tech Park Branch', location: 'Bangalore, Karnataka' },
        ],
        US: [
            { id: 'us-001', name: 'Downtown LA Branch', location: 'Los Angeles, CA' },
            { id: 'us-002', name: 'LAX Airport Branch', location: 'Los Angeles, CA' },
            { id: 'us-003', name: 'Manhattan Branch', location: 'New York, NY' },
            { id: 'us-004', name: 'Miami Beach Branch', location: 'Miami, FL' },
        ],
        GB: [
            { id: 'gb-001', name: 'London City Branch', location: 'London' },
            { id: 'gb-002', name: 'Heathrow Airport Branch', location: 'London' },
            { id: 'gb-003', name: 'Manchester Branch', location: 'Manchester' },
        ],
        EU: [
            { id: 'eu-001', name: 'Brussels Central Branch', location: 'Brussels, Belgium' },
            { id: 'eu-002', name: 'Amsterdam Branch', location: 'Amsterdam, Netherlands' },
        ],
        AU: [
            { id: 'au-001', name: 'Sydney CBD Branch', location: 'Sydney, NSW' },
            { id: 'au-002', name: 'Melbourne Branch', location: 'Melbourne, VIC' },
        ],
        CA: [
            { id: 'ca-001', name: 'Toronto Downtown Branch', location: 'Toronto, ON' },
            { id: 'ca-002', name: 'Vancouver Branch', location: 'Vancouver, BC' },
        ],
        SG: [
            { id: 'sg-001', name: 'Orchard Road Branch', location: 'Singapore' },
            { id: 'sg-002', name: 'Changi Airport Branch', location: 'Singapore' },
        ],
        AE: [
            { id: 'ae-001', name: 'Dubai Marina Branch', location: 'Dubai' },
            { id: 'ae-002', name: 'Abu Dhabi Branch', location: 'Abu Dhabi' },
        ],
        JP: [
            { id: 'jp-001', name: 'Tokyo Shibuya Branch', location: 'Tokyo' },
            { id: 'jp-002', name: 'Osaka Branch', location: 'Osaka' },
        ],
        DE: [
            { id: 'de-001', name: 'Berlin Central Branch', location: 'Berlin' },
            { id: 'de-002', name: 'Munich Branch', location: 'Munich' },
        ],
        FR: [
            { id: 'fr-001', name: 'Paris Champs-Élysées Branch', location: 'Paris' },
            { id: 'fr-002', name: 'Lyon Branch', location: 'Lyon' },
        ],
        MX: [
            { id: 'mx-001', name: 'Mexico City Branch', location: 'Mexico City' },
            { id: 'mx-002', name: 'Cancun Branch', location: 'Cancun' },
        ],
    };

    // Get branches for selected country
    const availableBranches = formData.country ? branchesByCountry[formData.country] || [] : [];

    // Use the same countries as customer portal
    const countries = SUPPORTED_COUNTRIES;

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                            <Building2 size={28} className="text-white" />
                        </div>
                        <span className="text-2xl font-bold text-slate-900">
                            VehicleRental
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Branch Portal
                    </h1>
                    <p className="text-slate-600">
                        Sign in to manage branch operations
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Country */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Country
                            </label>
                            <select
                                required
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors bg-white"
                            >
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.flag} {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Branch */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Branch
                            </label>
                            <select
                                required
                                value={formData.branch}
                                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors bg-white"
                                disabled={!formData.country}
                            >
                                <option value="">{formData.country ? 'Select Branch' : 'Select country first'}</option>
                                {availableBranches.map((branch) => (
                                    <option key={branch.id} value={branch.id}>
                                        {branch.name} - {branch.location}
                                    </option>
                                ))}
                            </select>
                            {!formData.country && (
                                <p className="text-xs text-slate-500 mt-1">Please select a country to view available branches</p>
                            )}
                        </div>

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
                                placeholder="your.email@branch.com"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
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
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors pr-11"
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
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    {/* Demo Accounts */}
                    <div className="mt-6 pt-6 border-t border-slate-200">
                        <p className="text-xs text-slate-500 mb-3 text-center">
                            Quick login with demo accounts:
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => handleDemoLogin('manager')}
                                className="px-3 py-2 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200"
                            >
                                Branch Manager
                            </button>
                            <button
                                onClick={() => handleDemoLogin('staff')}
                                className="px-3 py-2 text-xs font-medium bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                            >
                                Branch Staff
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <Link
                        to="/"
                        className="text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                    >
                        ← Back to Customer Portal
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BranchLogin;
