import React, { useState } from 'react';
import { CarFront, QrCode, Camera, CheckCircle } from 'lucide-react';
import useEmployeeVehicleStore from '../../store/employeeVehicle.store';
import Button from '../../components/ui/Button';
import StatusPill from '../../components/ui/StatusPill';
import QRScanner from '../../components/ui/QRScanner';

const CheckInOut = () => {
    const { assignedVehicles, activeCheckout, checkIn, checkOut } = useEmployeeVehicleStore();
    const [scannerOpen, setScannerOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const handleCheckIn = (vehicleId) => {
        checkIn(vehicleId);
        setScannerOpen(false);
        setSelectedVehicle(null);
    };

    const handleCheckOut = (vehicleId) => {
        checkOut(vehicleId);
        setScannerOpen(false);
        setSelectedVehicle(null);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Vehicle Check-In/Out</h1>
                <p className="text-slate-600 mt-1">Manage vehicle handovers and inspections</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={() => setScannerOpen(true)}
                    className="p-6 bg-white rounded-xl border-2 border-dashed border-orange-300 hover:border-orange-500 hover:bg-orange-50 transition-all text-left"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <QrCode className="text-orange-600" size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">Scan QR Code</h3>
                            <p className="text-sm text-slate-600">Quick check-in with vehicle QR</p>
                        </div>
                    </div>
                </button>

                <button className="p-6 bg-white rounded-xl border-2 border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all text-left">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                            <Camera className="text-slate-600" size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">Manual Entry</h3>
                            <p className="text-sm text-slate-600">Enter vehicle number manually</p>
                        </div>
                    </div>
                </button>
            </div>

            {/* Active Checkout */}
            {activeCheckout && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-slate-900">Active Checkout</h2>
                        <StatusPill status="in progress" variant="warning" />
                    </div>
                    <p className="text-slate-600">Vehicle #{activeCheckout.vehicleId} is currently checked out</p>
                    <Button
                        onClick={() => handleCheckOut(activeCheckout.vehicleId)}
                        className="mt-4 bg-orange-600 hover:bg-orange-700 text-white"
                    >
                        Complete Check-Out
                    </Button>
                </div>
            )}

            {/* Assigned Vehicles */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <CarFront className="text-orange-600" size={20} />
                    Assigned Vehicles
                </h2>

                {assignedVehicles.length > 0 ? (
                    <div className="space-y-3">
                        {assignedVehicles.map((vehicle) => (
                            <div
                                key={vehicle.id}
                                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                            >
                                <div className="flex-1">
                                    <h3 className="font-medium text-slate-900">{vehicle.model || `Vehicle #${vehicle.id}`}</h3>
                                    <p className="text-sm text-slate-600">{vehicle.plateNumber || 'Plate number pending'}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <StatusPill status={vehicle.status} />
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleCheckIn(vehicle.id)}
                                    >
                                        Check In
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                        <p className="text-slate-600">No vehicles assigned</p>
                        <p className="text-sm text-slate-500 mt-1">Check back later for new assignments</p>
                    </div>
                )}
            </div>

            {/* QR Scanner Modal */}
            {scannerOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Scan Vehicle QR Code</h3>
                        <QRScanner />
                        <div className="mt-4 flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setScannerOpen(false)}
                                fullWidth
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => handleCheckIn('demo-vehicle')}
                                className="bg-orange-600 hover:bg-orange-700 text-white"
                                fullWidth
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckInOut;
