import React from 'react';
import { User, Calendar, AlertCircle } from 'lucide-react';
import StatusPill from '../ui/StatusPill';

/**
 * AllocationStatus - Display vehicle allocation information
 * Reusable in Admin and Employee modules
 * @param {Object} allocation - Allocation data
 */
export default function AllocationStatus({ allocation }) {
    if (!allocation) {
        return (
            <div className="text-sm text-slate-500 italic">Not allocated</div>
        );
    }

    const { type, assignedTo, startDate, endDate, status, hasConflict } = allocation;

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <StatusPill status={status} />
                {hasConflict && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                        <AlertCircle className="w-3 h-3" />
                        Conflict
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-700">
                <User className="w-4 h-4 text-slate-400" />
                <span className="font-medium">{assignedTo}</span>
                <span className="text-slate-400">({type})</span>
            </div>

            {(startDate || endDate) && (
                <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>
                        {startDate ? new Date(startDate).toLocaleDateString() : '—'} to{' '}
                        {endDate ? new Date(endDate).toLocaleDateString() : '—'}
                    </span>
                </div>
            )}
        </div>
    );
}
