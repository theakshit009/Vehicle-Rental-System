import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldX, Home, LogOut } from 'lucide-react';
import Button from '../../components/ui/Button';
import useEmployeeStore from '../../store/employee.store';

const Unauthorized = () => {
    const { employee, logout } = useEmployeeStore();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldX size={40} className="text-red-600" />
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-slate-900 mb-3">
                        Access Denied
                    </h1>

                    {/* Message */}
                    <p className="text-slate-600 mb-6">
                        You don't have permission to access this page. This area is restricted to specific employee roles.
                    </p>

                    {/* Employee Info */}
                    {employee && (
                        <div className="bg-slate-50 rounded-lg p-4 mb-6">
                            <p className="text-sm text-slate-600">Logged in as:</p>
                            <p className="font-semibold text-slate-900">{employee.name}</p>
                            <p className="text-sm text-slate-500 capitalize">Role: {employee.role}</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Link to="/employee" className="flex-1">
                            <Button variant="outline" icon={<Home size={18} />} fullWidth>
                                Go to Dashboard
                            </Button>
                        </Link>
                        <Button
                            variant="danger"
                            icon={<LogOut size={18} />}
                            onClick={() => {
                                logout();
                                window.location.href = '/employee/login';
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
