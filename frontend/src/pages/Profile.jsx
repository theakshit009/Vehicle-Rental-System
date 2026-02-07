import React from 'react';
import { User, Mail, Phone, CreditCard, Award, FileText } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/auth.store';
import { getInitials } from '../utils/helpers';

const Profile = () => {
    const { user } = useAuthStore();

    if (!user) {
        return (
            <div className="container-custom py-16 text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Please log in to view your profile</h2>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className="container-custom max-w-4xl">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">My Profile</h1>

                <div className="space-y-6">
                    {/* User Info Card */}
                    <Card>
                        <div className="flex items-start gap-6">
                            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                                {getInitials(user.name)}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-slate-900 mb-1">{user.name}</h2>
                                <p className="text-slate-600 mb-4">{user.email}</p>
                                <Button variant="outline" size="sm">Edit Profile</Button>
                            </div>
                        </div>
                    </Card>

                    {/* Contact Information */}
                    <Card header={<h3 className="text-lg font-semibold text-slate-900">Contact Information</h3>}>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail size={20} className="text-slate-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600">Email</p>
                                    <p className="font-medium text-slate-900">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone size={20} className="text-slate-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600">Phone</p>
                                    <p className="font-medium text-slate-900">{user.phone}</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Documents */}
                    <Card header={<h3 className="text-lg font-semibold text-slate-900">Documents</h3>}>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FileText size={24} className="text-slate-600" />
                                    <div>
                                        <p className="font-medium text-slate-900">Driving License</p>
                                        <p className="text-sm text-slate-600">{user.documents?.license}</p>
                                    </div>
                                </div>
                                <Badge variant="success">Verified</Badge>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <CreditCard size={24} className="text-slate-600" />
                                    <div>
                                        <p className="font-medium text-slate-900">Identity Verification</p>
                                        <p className="text-sm text-slate-600">{user.documents?.verification}</p>
                                    </div>
                                </div>
                                <Badge variant="success">Verified</Badge>
                            </div>
                        </div>
                    </Card>

                    {/* Loyalty Points */}
                    <Card header={<h3 className="text-lg font-semibold text-slate-900">Loyalty Program</h3>}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                                    <Award size={32} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600">Total Points</p>
                                    <p className="text-3xl font-bold text-slate-900">{user.loyaltyPoints}</p>
                                </div>
                            </div>
                            <Button variant="outline">Redeem Points</Button>
                        </div>
                        <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
                            <p className="text-sm text-amber-800">
                                Earn loyalty points with every booking. Use points for discounts on future rentals!
                            </p>
                        </div>
                    </Card>

                    {/* Account Settings */}
                    <Card header={<h3 className="text-lg font-semibold text-slate-900">Account Settings</h3>}>
                        <div className="space-y-3">
                            <Button variant="outline" fullWidth className="justify-start">
                                Change Password
                            </Button>
                            <Button variant="outline" fullWidth className="justify-start">
                                Notification Preferences
                            </Button>
                            <Button variant="outline" fullWidth className="justify-start">
                                Privacy Settings
                            </Button>
                            <Button variant="danger" fullWidth className="justify-start">
                                Delete Account
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
