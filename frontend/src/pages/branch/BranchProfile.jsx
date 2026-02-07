import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Save, X, Building2, Calendar } from 'lucide-react';
import useBranchStore from '../../store/branch.store';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

/**
 * BranchProfile - Profile page for branch users
 */
export default function BranchProfile() {
    const { user, userRole, currentBranch } = useBranchStore();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: '+1 (555) 123-4567',
        address: '123 Main St, Los Angeles, CA 90001',
    });

    const handleSave = () => {
        // TODO: Implement save logic
        console.log('Saving profile:', formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            name: user.name,
            email: user.email,
            phone: '+1 (555) 123-4567',
            address: '123 Main St, Los Angeles, CA 90001',
        });
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
                    <p className="text-slate-600 mt-1">Manage your personal information</p>
                </div>
                {!isEditing && (
                    <Button
                        variant="primary"
                        onClick={() => setIsEditing(true)}
                        className="bg-emerald-600 hover:bg-emerald-700"
                    >
                        Edit Profile
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <Card>
                        <div className="p-6">
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">Personal Information</h2>

                            <div className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Full Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-lg">
                                            <User className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-900">{formData.name}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Email Address
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-lg">
                                            <Mail className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-900">{formData.email}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Phone Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-lg">
                                            <Phone className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-900">{formData.phone}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Address
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            rows={2}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-lg">
                                            <MapPin className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-900">{formData.address}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {isEditing && (
                                <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200">
                                    <Button
                                        variant="primary"
                                        leftIcon={<Save className="w-4 h-4" />}
                                        onClick={handleSave}
                                        className="bg-emerald-600 hover:bg-emerald-700"
                                    >
                                        Save Changes
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        leftIcon={<X className="w-4 h-4" />}
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Password Change */}
                    <Card>
                        <div className="p-6">
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">Change Password</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                className="mt-4 bg-emerald-600 hover:bg-emerald-700"
                            >
                                Update Password
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Right Column - Additional Info */}
                <div className="space-y-6">
                    {/* Role Card */}
                    <Card>
                        <div className="p-6">
                            <h3 className="text-sm font-medium text-slate-500 mb-3">Role & Branch</h3>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Briefcase className="w-4 h-4 text-emerald-600" />
                                        <span className="text-xs text-slate-500">Role</span>
                                    </div>
                                    <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                                        {user.role}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Building2 className="w-4 h-4 text-emerald-600" />
                                        <span className="text-xs text-slate-500">Branch</span>
                                    </div>
                                    <p className="text-sm font-medium text-slate-900">{currentBranch.name}</p>
                                    <p className="text-xs text-slate-600">{currentBranch.location}</p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Calendar className="w-4 h-4 text-emerald-600" />
                                        <span className="text-xs text-slate-500">Joined</span>
                                    </div>
                                    <p className="text-sm text-slate-900">January 2024</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Stats Card */}
                    <Card>
                        <div className="p-6">
                            <h3 className="text-sm font-medium text-slate-500 mb-3">Quick Stats</h3>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-600">Vehicles Managed</span>
                                    <span className="text-sm font-semibold text-slate-900">48</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-600">Tasks Completed</span>
                                    <span className="text-sm font-semibold text-slate-900">127</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-600">Active Since</span>
                                    <span className="text-sm font-semibold text-slate-900">Jan 2024</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
