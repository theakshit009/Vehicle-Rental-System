import React from 'react';
import { Car, MapPin, Calendar, Fuel } from 'lucide-react';
import StatusPill from '../ui/StatusPill';
import Button from '../ui/Button';

/**
 * VehicleInventoryCard - Display vehicle in inventory list
 * Reusable in Admin module
 * @param {Object} vehicle - Vehicle data
 * @param {Function} onAssign - Assign button handler
 * @param {Function} onMaintenance - Maintenance button handler
 */
export default function VehicleInventoryCard({ vehicle, onAssign, onMaintenance }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <Car className="w-5 h-5 text-slate-400" />
                        <h3 className="text-lg font-semibold text-slate-900">
                            {vehicle.make} {vehicle.model}
                        </h3>
                    </div>
                    <div className="text-sm text-slate-600 mb-1">
                        {vehicle.year} • {vehicle.licensePlate}
                    </div>
                </div>
                <StatusPill status={vehicle.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{vehicle.location || 'Not set'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                    <Fuel className="w-4 h-4 text-slate-400" />
                    <span>{vehicle.fuelType}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-xs">
                        Last Inspect: {vehicle.lastInspection
                            ? new Date(vehicle.lastInspection).toLocaleDateString()
                            : 'N/A'}
                    </span>
                </div>
                <div className="text-slate-700 font-medium">
                    ${vehicle.dailyRate}/day
                </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onAssign?.(vehicle)}
                    disabled={vehicle.status !== 'available'}
                    className="flex-1"
                >
                    Assign
                </Button>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onMaintenance?.(vehicle)}
                    className="flex-1"
                >
                    Maintenance
                </Button>
            </div>
        </div>
    );
}
