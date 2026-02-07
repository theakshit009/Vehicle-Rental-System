import React from 'react';
import { CarFront, Calendar, MapPin, CheckCircle } from 'lucide-react';
import useEmployeeVehicleStore from '../../store/employeeVehicle.store';
import StatusPill from '../../components/ui/StatusPill';
import Button from '../../components/ui/Button';

const AssignedVehicles = () => {
    const { assignedVehicles } = useEmployeeVehicleStore();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Assigned Vehicles</h1>
                <p className="text-slate-600 mt-1">View and manage your assigned vehicles</p>
            </div>

            {/* Vehicle Grid */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                {assignedVehicles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {assignedVehicles.map((vehicle) => (
                            <div
                                key={vehicle.id}
                                className="border border-slate-200 rounded-lg p-4 hover:border-orange-300 hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                            <CarFront className="text-orange-600" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900">
                                                {vehicle.model || `Vehicle #${vehicle.id}`}
                                            </h3>
                                            <p className="text-sm text-slate-600">
                                                {vehicle.plateNumber || 'Plate pending'}
                                            </p>
                                        </div>
                                    </div>
                                    <StatusPill status={vehicle.status} />
                                </div>

                                <div className="space-y-2 text-sm mb-4">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Calendar size={14} />
                                        <span>Assigned: {vehicle.assignedDate || 'Today'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <MapPin size={14} />
                                        <span>{vehicle.location || 'Main Branch'}</span>
                                    </div>
                                </div>

                                <Button variant="outline" size="sm" fullWidth>
                                    View Details
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                        <p className="text-slate-600">No vehicles currently assigned</p>
                        <p className="text-sm text-slate-500 mt-1">
                            New assignments will appear here when available
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssignedVehicles;
