import React from 'react';
import PropTypes from 'prop-types';
import { MapPin, WifiOff, Pause } from 'lucide-react';
import { GPS_STATUS } from '../../utils/employeeConstants';
import StatusPill from '../ui/StatusPill';

const GPSStatus = ({ status, lastUpdate, className = '' }) => {
    const statusConfig = {
        [GPS_STATUS.ACTIVE]: {
            label: 'GPS Active',
            variant: 'active',
            icon: MapPin,
            dot: true,
        },
        [GPS_STATUS.PAUSED]: {
            label: 'GPS Paused',
            variant: 'warning',
            icon: Pause,
            dot: false,
        },
        [GPS_STATUS.OFFLINE]: {
            label: 'GPS Offline',
            variant: 'offline',
            icon: WifiOff,
            dot: false,
        },
    };

    const config = statusConfig[status] || statusConfig[GPS_STATUS.OFFLINE];
    const Icon = config.icon;

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Icon size={16} className={status === GPS_STATUS.ACTIVE ? 'text-orange-600' : 'text-slate-500'} />
            <StatusPill
                status={config.label}
                variant={config.variant}
                dot={config.dot}
            />
            {lastUpdate && status === GPS_STATUS.ACTIVE && (
                <span className="text-xs text-slate-500">
                    Updated {lastUpdate}
                </span>
            )}
        </div>
    );
};

GPSStatus.propTypes = {
    status: PropTypes.string.isRequired,
    lastUpdate: PropTypes.string,
    className: PropTypes.string,
};

export default GPSStatus;
