import React from 'react';
import PropTypes from 'prop-types';

const StatusPill = ({ status, variant, dot = false, className = '' }) => {
    const variants = {
        active: 'bg-orange-100 text-orange-700 border-orange-200',
        success: 'bg-green-100 text-green-700 border-green-200',
        warning: 'bg-amber-100 text-amber-700 border-amber-200',
        danger: 'bg-red-100 text-red-700 border-red-200',
        info: 'bg-blue-100 text-blue-700 border-blue-200',
        neutral: 'bg-slate-100 text-slate-700 border-slate-200',
        offline: 'bg-slate-100 text-slate-500 border-slate-200',
    };

    const variantClass = variants[variant] || variants.neutral;

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${variantClass} ${className}`}
        >
            {dot && (
                <span className={`w-2 h-2 rounded-full ${variant === 'active' ? 'bg-orange-600 animate-pulse' : variant === 'success' ? 'bg-green-600' : variant === 'warning' ? 'bg-amber-600' : variant === 'danger' ? 'bg-red-600' : variant === 'offline' ? 'bg-slate-400' : 'bg-blue-600'}`} />
            )}
            {status}
        </span>
    );
};

StatusPill.propTypes = {
    status: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['active', 'success', 'warning', 'danger', 'info', 'neutral', 'offline']),
    dot: PropTypes.bool,
    className: PropTypes.string,
};

StatusPill.defaultProps = {
    variant: 'neutral',
    dot: false,
    className: '',
};

export default StatusPill;
