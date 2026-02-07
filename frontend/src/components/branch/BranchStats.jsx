import React from 'react';
import { Car, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';

/**
 * BranchStats - Dashboard statistics widget
 * @param {Object} stats - Statistics data
 */
export default function BranchStats({ stats }) {
    const statItems = [
        {
            label: 'Available Vehicles',
            value: stats.availableVehicles || 0,
            icon: CheckCircle,
            iconColor: 'text-emerald-500',
            bgColor: 'bg-emerald-50'
        },
        {
            label: 'Rented Vehicles',
            value: stats.rentedVehicles || 0,
            icon: Car,
            iconColor: 'text-blue-500',
            bgColor: 'bg-blue-50'
        },
        {
            label: 'Maintenance Queue',
            value: stats.maintenanceCount || 0,
            icon: AlertTriangle,
            iconColor: 'text-amber-500',
            bgColor: 'bg-amber-50'
        },
        {
            label: 'Today\'s Revenue',
            value: `$${(stats.todayRevenue || 0).toLocaleString()}`,
            icon: DollarSign,
            iconColor: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
            highlight: true
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statItems.map((item, index) => {
                const Icon = item.icon;
                return (
                    <div
                        key={index}
                        className={`bg-white rounded-lg shadow-sm border border-slate-200 p-5 ${item.highlight ? 'ring-2 ring-emerald-500 ring-opacity-50' : ''
                            }`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className={`p-2 rounded-lg ${item.bgColor}`}>
                                <Icon className={`w-5 h-5 ${item.iconColor}`} />
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900 mb-1">{item.value}</div>
                            <div className="text-sm text-slate-600">{item.label}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
