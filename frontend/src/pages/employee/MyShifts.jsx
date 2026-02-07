import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import useShiftStore from '../../store/shift.store';
import Button from '../../components/ui/Button';
import StatusPill from '../../components/ui/StatusPill';

const MyShifts = () => {
    const { shiftHistory, currentShift } = useShiftStore();

    const formatDuration = (startTime, endTime) => {
        const duration = new Date(endTime) - new Date(startTime);
        const hours = Math.floor(duration / (1000 * 60 * 60));
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">My Shifts</h1>
                <p className="text-slate-600 mt-1">Track your shift history and attendance</p>
            </div>

            {/* Current Shift Card */}
            {currentShift && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                            <Clock className="text-orange-600" size={20} />
                            Active Shift
                        </h2>
                        <StatusPill status="active" variant="success" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-slate-600">Started</p>
                            <p className="font-medium text-slate-900">
                                {new Date(currentShift.startTime).toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-slate-600">Duration</p>
                            <p className="font-medium text-slate-900">
                                {formatDuration(currentShift.startTime, new Date())}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Shift History */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Calendar className="text-orange-600" size={20} />
                    Shift History
                </h2>

                {shiftHistory.length > 0 ? (
                    <div className="space-y-3">
                        {shiftHistory.map((shift, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                            >
                                <div className="flex-1">
                                    <p className="font-medium text-slate-900">
                                        {new Date(shift.startTime).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        {new Date(shift.startTime).toLocaleTimeString()} - {new Date(shift.endTime).toLocaleTimeString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-orange-600">
                                        {formatDuration(shift.startTime, shift.endTime)}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {shift.breaks?.length || 0} breaks
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <TrendingUp size={48} className="text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-600">No shift history yet</p>
                        <p className="text-sm text-slate-500 mt-1">Your completed shifts will appear here</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyShifts;
