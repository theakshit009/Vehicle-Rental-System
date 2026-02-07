import React from 'react';
import { Wrench, Clock, AlertCircle } from 'lucide-react';
import Badge from '../ui/Badge';

/**
 * MaintenanceStatus - Display maintenance schedule and history
 * @param {Object} maintenance - Maintenance data
 */
export default function MaintenanceStatus({ maintenance }) {
    if (!maintenance) {
        return <div className="text-sm text-slate-500 italic">No maintenance scheduled</div>;
    }

    const { status, lastService, nextService, issues } = maintenance;

    const getStatusColor = () => {
        switch (status) {
            case 'overdue': return 'danger';
            case 'due-soon': return 'warning';
            case 'scheduled': return 'info';
            case 'completed': return 'success';
            default: return 'neutral';
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-slate-400" />
                <Badge variant={getStatusColor()}>
                    {status?.replace('-', ' ').toUpperCase()}
                </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                    <div className="flex items-center gap-1 text-slate-600 mb-1">
                        <Clock className="w-3 h-3" />
                        <span className="font-medium">Last Service</span>
                    </div>
                    <div className="text-slate-900">
                        {lastService ? new Date(lastService).toLocaleDateString() : 'N/A'}
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-1 text-slate-600 mb-1">
                        <Clock className="w-3 h-3" />
                        <span className="font-medium">Next Service</span>
                    </div>
                    <div className={status === 'overdue' ? 'text-red-600 font-medium' : 'text-slate-900'}>
                        {nextService ? new Date(nextService).toLocaleDateString() : 'N/A'}
                    </div>
                </div>
            </div>

            {issues && issues.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-sm font-medium text-amber-700 mb-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>Active Issues</span>
                    </div>
                    <ul className="space-y-1">
                        {issues.map((issue, index) => (
                            <li key={index} className="text-sm text-slate-700 pl-4 relative before:content-['•'] before:absolute before:left-0">
                                {issue}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
