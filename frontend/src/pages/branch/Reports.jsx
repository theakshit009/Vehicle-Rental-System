import React, { useState } from 'react';
import { Calendar, Download, TrendingUp, FileText } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

/**
 * Reports Page - Analytics and reporting (UI only, no chart library)
 */
export default function Reports() {
    const [dateRange, setDateRange] = useState('week');
    const [reportType, setReportType] = useState('utilization');

    // Mock report data
    const summaryData = {
        daily: {
            totalRentals: 12,
            revenue: 3420,
            utilizationRate: 78,
            newBookings: 8
        },
        weekly: {
            totalRentals: 64,
            revenue: 18450,
            utilizationRate: 72,
            topVehicles: ['Toyota Camry', 'Honda Civic', 'Tesla Model 3']
        },
        monthly: {
            totalRentals: 248,
            revenue: 72800,
            utilizationRate: 75,
            averageBookingDuration: '4.2 days'
        }
    };

    const maintenanceStats = {
        totalMaintenances: 15,
        completedMaintenances: 10,
        pendingMaintenances: 5,
        averageDowntime: '2.3 days'
    };

    const exportReport = () => {
        // TODO: Implement export functionality
        alert('Export functionality not implemented. This would trigger a download of the report data.');
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Reports & Analytics</h1>
                    <p className="text-slate-600 mt-1">View branch performance and analytics</p>
                </div>
                <Button
                    variant="primary"
                    leftIcon={<Download className="w-4 h-4" />}
                    onClick={exportReport}
                >
                    Export Report
                </Button>
            </div>

            {/* Report Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Date Range
                        </label>
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="quarter">This Quarter</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Report Type
                        </label>
                        <select
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                            <option value="utilization">Utilization Report</option>
                            <option value="revenue">Revenue Report</option>
                            <option value="maintenance">Maintenance Report</option>
                            <option value="bookings">Bookings Report</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <Button variant="secondary" className="w-full">
                            Generate Report
                        </Button>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                    {dateRange === 'week' ? 'Weekly' : dateRange === 'month' ? 'Monthly' : 'Daily'} Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <FileText className="w-5 h-5 text-slate-400" />
                            <div className="text-sm text-slate-600">Total Rentals</div>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">
                            {dateRange === 'week' ? summaryData.weekly.totalRentals :
                                dateRange === 'month' ? summaryData.monthly.totalRentals :
                                    summaryData.daily.totalRentals}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                            <div className="text-sm text-slate-600">Revenue</div>
                        </div>
                        <div className="text-2xl font-bold text-emerald-600">
                            ${(dateRange === 'week' ? summaryData.weekly.revenue :
                                dateRange === 'month' ? summaryData.monthly.revenue :
                                    summaryData.daily.revenue).toLocaleString()}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <Calendar className="w-5 h-5 text-blue-500" />
                            <div className="text-sm text-slate-600">Utilization Rate</div>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">
                            {dateRange === 'week' ? summaryData.weekly.utilizationRate :
                                dateRange === 'month' ? summaryData.monthly.utilizationRate :
                                    summaryData.daily.utilizationRate}%
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="w-5 h-5 text-blue-500" />
                            <div className="text-sm text-slate-600">New Bookings</div>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">
                            {dateRange === 'today' ? summaryData.daily.newBookings : '—'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Utilization Chart Placeholder */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Utilization Overview</h2>
                <div className="h-80 flex items-center justify-center bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                    <div className="text-center text-slate-500">
                        <TrendingUp className="w-16 h-16 mx-auto mb-3 text-slate-300" />
                        <p className="font-medium">Chart Placeholder</p>
                        <p className="text-sm mt-1">No chart library implemented</p>
                        <p className="text-xs mt-2 text-slate-400">
                            Chart would display utilization trends, peak hours, and vehicle performance
                        </p>
                    </div>
                </div>
            </div>

            {/* Maintenance Statistics */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Maintenance Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="text-sm text-slate-600 mb-1">Total Maintenances</div>
                        <div className="text-xl font-bold text-slate-900">{maintenanceStats.totalMaintenances}</div>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg">
                        <div className="text-sm text-slate-600 mb-1">Completed</div>
                        <div className="text-xl font-bold text-emerald-600">{maintenanceStats.completedMaintenances}</div>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg">
                        <div className="text-sm text-slate-600 mb-1">Pending</div>
                        <div className="text-xl font-bold text-amber-600">{maintenanceStats.pendingMaintenances}</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-sm text-slate-600 mb-1">Avg. Downtime</div>
                        <div className="text-xl font-bold text-blue-600">{maintenanceStats.averageDowntime}</div>
                    </div>
                </div>
            </div>

            {/* Top Vehicles (Weekly) */}
            {dateRange === 'week' && (
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Top Performing Vehicles</h2>
                    <div className="space-y-3">
                        {summaryData.weekly.topVehicles.map((vehicle, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                        <span className="font-bold text-emerald-700">{index + 1}</span>
                                    </div>
                                    <span className="font-medium text-slate-900">{vehicle}</span>
                                </div>
                                <Badge variant="success">High Demand</Badge>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
