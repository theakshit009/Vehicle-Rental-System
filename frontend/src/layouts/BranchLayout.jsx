import React, { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Users,
    DollarSign,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    Building2,
    ChevronDown,
    User
} from 'lucide-react';
import useBranchStore from '../store/branch.store';

/**
 * BranchLayout - Main layout for branch module with role-based navigation
 */
export default function BranchLayout() {
    const { currentBranch, userRole, user, toggleRole } = useBranchStore();
    const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);
    const navigate = useNavigate();

    // Close sidebar on mobile when navigating
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarOpen(true); // Open on tablet/desktop
            } else {
                setSidebarOpen(false); // Closed on mobile
            }
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close profile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Role-based navigation items
    const getNavigationItems = () => {
        const commonItems = [
            { path: '/branch', icon: LayoutDashboard, label: 'Dashboard', end: true },
            { path: '/branch/inventory', icon: Package, label: 'Inventory' },
        ];

        const managerItems = [
            { path: '/branch/allocation', icon: Users, label: 'Vehicle Allocation' },
            { path: '/branch/pricing', icon: DollarSign, label: 'Pricing' },
            { path: '/branch/employees', icon: Users, label: 'Employees' },
            { path: '/branch/reports', icon: FileText, label: 'Reports' },
        ];

        return userRole === 'manager'
            ? [...commonItems, ...managerItems]
            : commonItems;
    };

    const navigationItems = getNavigationItems();

    const handleLogout = () => {
        // Clear branch auth and redirect to branch login
        navigate('/branch/login');
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2 md:gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            aria-label="Toggle sidebar"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="p-1.5 md:p-2 bg-emerald-100 rounded-lg">
                                <Building2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-sm md:text-lg font-bold text-slate-900">{currentBranch.name}</h1>
                                <p className="text-xs text-slate-600 hidden md:block">{currentBranch.location}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Role Toggle (Dev Tool) - Hidden on mobile */}
                        <button
                            onClick={toggleRole}
                            className="hidden sm:flex px-2 md:px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full hover:bg-emerald-100 transition-colors"
                        >
                            {userRole === 'manager' ? '👤 Manager' : '👤 Staff'}
                        </button>

                        {/* User Menu */}
                        <div className="relative" ref={profileMenuRef}>
                            <button
                                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                            >
                                <div className="text-right hidden sm:block">
                                    <div className="text-xs md:text-sm font-medium text-slate-900">{user.name}</div>
                                    <div className="text-xs text-slate-600 hidden md:block">{user.role}</div>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {profileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                                    <button
                                        onClick={() => {
                                            setProfileMenuOpen(false);
                                            navigate('/branch/profile');
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                        <User className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <div className="text-sm font-medium">Profile</div>
                                            <div className="text-xs text-slate-500">View and edit profile</div>
                                        </div>
                                    </button>
                                    <div className="border-t border-slate-100 my-1"></div>
                                    <button
                                        onClick={() => {
                                            setProfileMenuOpen(false);
                                            handleLogout();
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <div>
                                            <div className="text-sm font-medium">Logout</div>
                                            <div className="text-xs text-red-500">Sign out of branch portal</div>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex relative">
                {/* Sidebar Overlay for Mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-30 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 transition-transform duration-300 z-40 md:translate-x-0`}
                >
                    <nav className="p-4 space-y-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                            ? 'bg-emerald-50 text-emerald-700 font-medium'
                                            : 'text-slate-700 hover:bg-slate-50'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                                            <span>{item.label}</span>
                                        </>
                                    )}
                                </NavLink>
                            );
                        })}

                        <div className="pt-4 mt-4 border-t border-slate-200">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 w-full text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                            >
                                <LogOut className="w-5 h-5 text-slate-400" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6 w-full overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
