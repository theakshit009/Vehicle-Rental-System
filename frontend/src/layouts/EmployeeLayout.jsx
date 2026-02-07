import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Car, LogOut, Menu, X, LayoutDashboard, Clock,
    CarFront, Navigation, FileText, User
} from 'lucide-react';
import useEmployeeStore from '../store/employee.store';
import { EMPLOYEE_ROLES } from '../utils/employeeConstants';
import RoleBadge from '../components/employee/RoleBadge';

const EmployeeLayout = () => {
    const { employee, isAuthenticated, logout } = useEmployeeStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!isAuthenticated) {
        navigate('/employee/login');
        return null;
    }

    // Role-based navigation items
    const getNavigationItems = () => {
        const baseItems = [
            { path: '/employee', icon: LayoutDashboard, label: 'Dashboard', roles: ['all'] },
        ];

        const driverItems = [
            { path: '/employee/my-shifts', icon: Clock, label: 'My Shifts', roles: [EMPLOYEE_ROLES.DRIVER] },
            { path: '/employee/assigned-vehicles', icon: CarFront, label: 'Assigned Vehicles', roles: [EMPLOYEE_ROLES.DRIVER] },
            { path: '/employee/tracking', icon: Navigation, label: 'GPS Tracking', roles: [EMPLOYEE_ROLES.DRIVER] },
        ];

        const staffItems = [
            { path: '/employee/check-in-out', icon: CarFront, label: 'Check-In/Out', roles: [EMPLOYEE_ROLES.STAFF] },
            { path: '/employee/assigned-vehicles', icon: CarFront, label: 'Vehicle Queue', roles: [EMPLOYEE_ROLES.STAFF] },
        ];

        const supportItems = [
            { path: '/employee/tracking', icon: Navigation, label: 'Live Tracking', roles: [EMPLOYEE_ROLES.SUPPORT] },
        ];

        const commonItems = [
            { path: '/employee/documents', icon: FileText, label: 'Documents', roles: ['all'] },
            { path: '/employee/profile', icon: User, label: 'Profile', roles: ['all'] },
        ];

        const allItems = [...baseItems, ...driverItems, ...staffItems, ...supportItems, ...commonItems];

        return allItems.filter((item) =>
            item.roles.includes('all') || item.roles.includes(employee?.role)
        );
    };

    const navItems = getNavigationItems();

    const handleLogout = () => {
        logout();
        navigate('/employee/login');
    };

    const isActivePath = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-slate-200">
                        <Link to="/employee" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                                <Car size={24} className="text-white" />
                            </div>
                            <div>
                                <span className="text-lg font-bold text-slate-900">
                                    VehicleRental
                                </span>
                                <p className="text-xs text-orange-600 font-medium">Employee Portal</p>
                            </div>
                        </Link>
                    </div>

                    {/* Employee Info */}
                    {employee && (
                        <div className="p-4 border-b border-slate-200 bg-orange-50">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-white">
                                        {employee.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-slate-900 truncate text-sm">{employee.name}</p>
                                    <p className="text-xs text-slate-500">{employee.employeeId}</p>
                                </div>
                            </div>
                            <RoleBadge role={employee.role} className="text-xs" />
                        </div>
                    )}

                    {/* Navigation */}
                    <nav className="flex-1 p-4 overflow-y-auto">
                        <ul className="space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActivePath(item.path);

                                return (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${active
                                                    ? 'bg-orange-50 text-orange-700 border-l-4 border-orange-600 pl-3'
                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                }`}
                                        >
                                            <Icon size={18} className={active ? 'text-orange-600' : 'text-slate-400'} />
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-slate-200">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut size={18} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64">
                {/* Mobile Header */}
                <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                                <Car size={18} className="text-white" />
                            </div>
                            <span className="font-bold text-slate-900">VehicleRental</span>
                        </div>
                        <div className="w-10" /> {/* Spacer for centering */}
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default EmployeeLayout;
