import React from 'react';
import PropTypes from 'prop-types';
import { Mail, Phone, Calendar, MapPin } from 'lucide-react';
import RoleBadge from './RoleBadge';
import StatusPill from '../ui/StatusPill';

const EmployeeCard = ({ employee, showDetails = true, className = '' }) => {
    if (!employee) return null;

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className={`bg-white rounded-xl border border-slate-200 p-4 ${className}`}>
            <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    {employee.avatar ? (
                        <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-orange-200"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center border-2 border-orange-300">
                            <span className="text-xl font-bold text-orange-700">
                                {getInitials(employee.name)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                            <h3 className="font-semibold text-slate-900 text-lg">{employee.name}</h3>
                            <p className="text-sm text-slate-500">{employee.employeeId}</p>
                        </div>
                        <RoleBadge role={employee.role} />
                    </div>

                    {showDetails && (
                        <div className="space-y-1.5 text-sm">
                            <div className="flex items-center gap-2 text-slate-600">
                                <Mail size={14} />
                                <span>{employee.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <Phone size={14} />
                                <span>{employee.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <MapPin size={14} />
                                <span>{employee.branch}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <Calendar size={14} />
                                <span>Joined {new Date(employee.joinDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

EmployeeCard.propTypes = {
    employee: PropTypes.shape({
        name: PropTypes.string.isRequired,
        employeeId: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        branch: PropTypes.string.isRequired,
        joinDate: PropTypes.string.isRequired,
        avatar: PropTypes.string,
    }),
    showDetails: PropTypes.bool,
    className: PropTypes.string,
};

export default EmployeeCard;
