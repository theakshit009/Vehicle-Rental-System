import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Edit2, Save, X } from 'lucide-react';
import useEmployeeStore from '../../store/employee.store';
import Button from '../../components/ui/Button';
import RoleBadge from '../../components/employee/RoleBadge';

const EmployeeProfile = () => {
    const { employee } = useEmployeeStore();
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        phone: employee?.phone || '',
        address: employee?.address || '',
    });

    const handleSave = () => {
        // In real app, this would call an API
        setEditing(false);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
                <p className="text-slate-600 mt-1">Manage your personal information</p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-32" />

                {/* Profile Info */}
                <div className="px-6 pb-6">
                    <div className="flex items-end justify-between -mt-16 mb-6">
                        <div className="flex items-end gap-4">
                            <div className="w-32 h-32 bg-white rounded-xl border-4 border-white shadow-lg flex items-center justify-center">
                                <span className="text-4xl font-bold text-orange-600">
                                    {employee?.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                                </span>
                            </div>
                            <div className="mb-2">
                                <h2 className="text-2xl font-bold text-slate-900">{employee?.name}</h2>
                                <p className="text-slate-600">{employee?.employeeId}</p>
                            </div>
                        </div>
                        <div className="mb-2">
                            {!editing ? (
                                <Button
                                    icon={<Edit2 size={16} />}
                                    variant="outline"
                                    onClick={() => setEditing(true)}
                                >
                                    Edit Profile
                                </Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button
                                        icon={<Save size={16} />}
                                        className="bg-orange-600 hover:bg-orange-700 text-white"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        icon={<X size={16} />}
                                        variant="outline"
                                        onClick={() => setEditing(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                                <Briefcase className="text-orange-600" size={20} />
                                <div className="flex-1">
                                    <p className="text-sm text-slate-600">Role</p>
                                    <RoleBadge role={employee?.role} />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                                <Mail className="text-orange-600" size={20} />
                                <div className="flex-1">
                                    <p className="text-sm text-slate-600">Email</p>
                                    <p className="font-medium text-slate-900">{employee?.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                                <Phone className="text-orange-600" size={20} />
                                <div className="flex-1">
                                    <p className="text-sm text-slate-600">Phone</p>
                                    {editing ? (
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-3 py-1 border border-slate-300 rounded"
                                        />
                                    ) : (
                                        <p className="font-medium text-slate-900">
                                            {employee?.phone || 'Not provided'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                                <Calendar className="text-orange-600" size={20} />
                                <div className="flex-1">
                                    <p className="text-sm text-slate-600">Joined</p>
                                    <p className="font-medium text-slate-900">
                                        {new Date().toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                                <MapPin className="text-orange-600 mt-1" size={20} />
                                <div className="flex-1">
                                    <p className="text-sm text-slate-600">Address</p>
                                    {editing ? (
                                        <textarea
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            className="w-full px-3 py-1 border border-slate-300 rounded"
                                            rows={2}
                                        />
                                    ) : (
                                        <p className="font-medium text-slate-900">
                                            {employee?.address || 'Not provided'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;
