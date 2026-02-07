import React from 'react';
import PropTypes from 'prop-types';
import { User2, Car, Headset } from 'lucide-react';
import { EMPLOYEE_ROLES } from '../../utils/employeeConstants';

const RoleBadge = ({ role, showIcon = true, className = '' }) => {
    const roleConfig = {
        [EMPLOYEE_ROLES.DRIVER]: {
            label: 'Driver',
            icon: Car,
            className: 'bg-orange-100 text-orange-700 border-orange-300',
        },
        [EMPLOYEE_ROLES.STAFF]: {
            label: 'Staff',
            icon: User2,
            className: 'bg-orange-50 text-orange-600 border-orange-200',
        },
        [EMPLOYEE_ROLES.SUPPORT]: {
            label: 'Support',
            icon: Headset,
            className: 'bg-orange-200 text-orange-800 border-orange-400',
        },
    };

    const config = roleConfig[role] || roleConfig[EMPLOYEE_ROLES.STAFF];
    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold border ${config.className} ${className}`}
        >
            {showIcon && <Icon size={14} />}
            {config.label}
        </span>
    );
};

RoleBadge.propTypes = {
    role: PropTypes.string.isRequired,
    showIcon: PropTypes.bool,
    className: PropTypes.string,
};

export default RoleBadge;
