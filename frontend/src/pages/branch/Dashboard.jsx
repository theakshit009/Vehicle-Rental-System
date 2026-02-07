import React, { useEffect, useState } from 'react';
import { Calendar, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import useBranchStore from '../../store/branch.store';
import BranchStats from '../../components/branch/BranchStats';
import VehicleInventoryCard from '../../components/vehicle/VehicleInventoryCard';
import { getBranchStatistics } from '../../services/branch.service';

/**
 * Branch Dashboard - Role-aware dashboard
 * Shows different widgets based on user role (Manager vs Staff)
 */
export default function Dashboard() {
    const { userRole, currentBranch } = useBranchStore();
    const [stats, setStats] = useState({
        availableVehicles: 28,
        rentedVehicles: 15,
        maintenanceCount: 5,
        todayRevenue: 3420
    });

    // Manager-specific data
    const [revenueData, setRevenueData] = useState({
        today: 3420,
        week: 18450,
        month: 72800,
        trend: '+12%'
    });

    // Staff-specific data
    const [todayHandovers, setTodayHandovers] = useState([
        { id: 1, vehicle: 'Toyota Camry', customer: 'John Doe', time: '10:00 AM', status: 'pending' },
        { id: 2, vehicle: 'Honda Civic', customer: 'Jane Smith', time: '11:30 AM', status: 'completed' },
        { id: 3, vehicle: 'Tesla Model 3', customer: 'Bob Johnson', time: '2:00 PM', status: 'pending' }
    ]);

    const [inspectionQueue, setInspectionQueue] = useState([
        { id: 'v-001', make: 'Toyota', model: 'Camry', licensePlate: 'ABC-1234', priority: 'high' },
        { id: 'v-004', make: 'Ford', model: 'Explorer', licensePlate: 'DEF-5678', priority: 'medium' }
    ]);

    useEffect(() => {
        // Load statistics
        const loadStats = async () => {
            const data = await getBranchStatistics(currentBranch.id);
            setStats(data);
        };
        loadStats();
    }, [currentBranch.id]);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        {userRole === 'manager' ? 'Branch Manager Dashboard' : 'Branch Staff Dashboard'}
                    </h1>
                    <p className="text-slate-600 mt-1">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
            </div>

            {/* Statistics Cards */}
            <BranchStats stats={stats} />

            {/* Role-specific content */}
            {userRole === 'manager' ? (
                // Manager View
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Revenue Snapshot */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-slate-900">Revenue Overview</h2>
                            <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                                <TrendingUp className="w-4 h-4" />
                                {revenueData.trend}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <div className="text-xs text-slate-500 mb-1">Today</div>
                                <div className="text-xl font-bold text-slate-900">${revenueData.today.toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 mb-1">This Week</div>
                                <div className="text-xl font-bold text-slate-900">${revenueData.week.toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 mb-1">This Month</div>
                                <div className="text-xl font-bold text-emerald-600">${revenueData.month.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>

                    {/* Maintenance Alerts */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            <h2 className="text-lg font-semibold text-slate-900">Pending Maintenance</h2>
                        </div>
                        <div className="space-y-3">
                            {stats.maintenanceCount > 0 ? (
                                <>
                                    <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                                        <span className="text-sm text-slate-700">Overdue inspections</span>
                                        <span className="font-semibold text-amber-700">2</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                        <span className="text-sm text-slate-700">Scheduled this week</span>
                                        <span className="font-semibold text-blue-700">3</span>
                                    </div>
                                </>
                            ) : (
                                <p className="text-sm text-slate-600">All maintenance up to date</p>
                            )}
                        </div>
                    </div>

                    {/* Utilization Chart Placeholder */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 lg:col-span-2">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4">Daily Utilization</h2>
                        <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                            <div className="text-center text-slate-500">
                                <TrendingUp className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                                <p className="text-sm">Chart placeholder - No chart library</p>
                                <p className="text-xs mt-1">Current utilization: {currentBranch.utilization}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Staff View
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Today's Handovers */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-5 h-5 text-emerald-500" />
                            <h2 className="text-lg font-semibold text-slate-900">Today's Handovers</h2>
                        </div>
                        <div className="space-y-3">
                            {todayHandovers.map((handover) => (
                                <div key={handover.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                    <div className="flex-1">
                                        <div className="font-medium text-slate-900">{handover.vehicle}</div>
                                        <div className="text-sm text-slate-600">{handover.customer}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-slate-700">{handover.time}</div>
                                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${handover.status === 'completed'
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {handover.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Inspection Queue */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar className="w-5 h-5 text-blue-500" />
                            <h2 className="text-lg font-semibold text-slate-900">Inspection Queue</h2>
                        </div>
                        <div className="space-y-3">
                            {inspectionQueue.map((vehicle) => (
                                <div key={vehicle.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                    <div>
                                        <div className="font-medium text-slate-900">
                                            {vehicle.make} {vehicle.model}
                                        </div>
                                        <div className="text-sm text-slate-600">{vehicle.licensePlate}</div>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${vehicle.priority === 'high'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {vehicle.priority}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Assigned Vehicles */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 lg:col-span-2">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4">My Assigned Vehicles</h2>
                        <div className="text-center py-8 text-slate-500">
                            <p>No vehicles currently assigned</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
