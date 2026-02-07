import React from 'react';
import { MapPin, Users, TrendingUp } from 'lucide-react';

/**
 * BranchCard - Display branch information with key metrics
 * @param {Object} branch - Branch data object
 * @param {Boolean} isActive - Whether this is the active branch
 * @param {Function} onClick - Click handler
 */
export default function BranchCard({ branch, isActive = false, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-lg shadow-sm border-2 p-5 transition-all cursor-pointer hover:shadow-md ${isActive ? 'border-emerald-500' : 'border-slate-200 hover:border-slate-300'
                }`}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-slate-900">{branch.name}</h3>
                        {isActive && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                                Active
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                        <MapPin className="w-4 h-4" />
                        <span>{branch.location}</span>
                    </div>
                </div>
                {branch.status === 'operational' && (
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                )}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100">
                <div>
                    <div className="text-xs text-slate-500 mb-1">Vehicles</div>
                    <div className="text-lg font-semibold text-slate-900">{branch.vehicleCount || 0}</div>
                </div>
                <div>
                    <div className="text-xs text-slate-500 mb-1">Staff</div>
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-lg font-semibold text-slate-900">{branch.staffCount || 0}</span>
                    </div>
                </div>
                <div>
                    <div className="text-xs text-slate-500 mb-1">Utilization</div>
                    <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        <span className="text-lg font-semibold text-emerald-600">
                            {branch.utilization || 0}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
