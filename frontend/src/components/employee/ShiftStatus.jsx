import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Clock, Coffee, Play, Square } from 'lucide-react';
import { SHIFT_STATUS } from '../../utils/employeeConstants';
import useShiftStore from '../../store/shift.store';
import StatusPill from '../ui/StatusPill';
import Button from '../ui/Button';

const ShiftStatus = ({ compact = false }) => {
    const { currentShift, isOnBreak, activeShiftDuration, getShiftStatus } = useShiftStore();
    const [duration, setDuration] = useState(0);
    const status = getShiftStatus();

    useEffect(() => {
        if (currentShift && status === SHIFT_STATUS.ACTIVE) {
            const interval = setInterval(() => {
                setDuration(activeShiftDuration());
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [currentShift, status, activeShiftDuration]);

    const formatDuration = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const getStatusVariant = () => {
        if (status === SHIFT_STATUS.ACTIVE) return isOnBreak() ? 'warning' : 'active';
        if (status === SHIFT_STATUS.PAUSED) return 'warning';
        if (status === SHIFT_STATUS.ENDED) return 'neutral';
        return 'offline';
    };

    const getStatusLabel = () => {
        if (isOnBreak()) return 'On Break';
        if (status === SHIFT_STATUS.ACTIVE) return 'Shift Active';
        if (status === SHIFT_STATUS.PAUSED) return 'Shift Paused';
        if (status === SHIFT_STATUS.ENDED) return 'Shift Ended';
        return 'No Active Shift';
    };

    if (compact) {
        return (
            <div className="flex items-center gap-2">
                {status === SHIFT_STATUS.ACTIVE && (
                    <Clock size={16} className="text-orange-600" />
                )}
                <StatusPill
                    status={getStatusLabel()}
                    variant={getStatusVariant()}
                    dot={status === SHIFT_STATUS.ACTIVE}
                />
                {status === SHIFT_STATUS.ACTIVE && (
                    <span className="text-sm font-mono font-semibold text-slate-900">
                        {formatDuration(duration)}
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <Clock size={18} className="text-orange-600" />
                    Current Shift
                </h3>
                <StatusPill
                    status={getStatusLabel()}
                    variant={getStatusVariant()}
                    dot={status === SHIFT_STATUS.ACTIVE}
                />
            </div>

            {status === SHIFT_STATUS.ACTIVE && (
                <div className="space-y-3">
                    <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-100">
                        <p className="text-xs text-orange-600 font-medium mb-1">SHIFT DURATION</p>
                        <p className="text-3xl font-mono font-bold text-orange-700">
                            {formatDuration(duration)}
                        </p>
                    </div>

                    {currentShift && (
                        <div className="text-sm text-slate-600">
                            <div className="flex justify-between">
                                <span>Started:</span>
                                <span className="font-medium">
                                    {new Date(currentShift.startTime).toLocaleTimeString()}
                                </span>
                            </div>
                            {currentShift.breaks && currentShift.breaks.length > 0 && (
                                <div className="flex justify-between mt-1">
                                    <span>Breaks taken:</span>
                                    <span className="font-medium">{currentShift.breaks.length}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {status === SHIFT_STATUS.NOT_STARTED && (
                <p className="text-sm text-slate-500 text-center py-4">
                    No active shift. Start your shift to begin tracking.
                </p>
            )}
        </div>
    );
};

ShiftStatus.propTypes = {
    compact: PropTypes.bool,
};

export default ShiftStatus;
