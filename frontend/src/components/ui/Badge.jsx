import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({
    children,
    variant = 'neutral',
    size = 'md',
    dot = false,
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full';

    const variants = {
        success: 'bg-green-100 text-green-800',
        warning: 'bg-amber-100 text-amber-800',
        danger: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800',
        neutral: 'bg-slate-100 text-slate-800',
        primary: 'bg-indigo-100 text-indigo-800',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
    };

    const dotColors = {
        success: 'bg-green-600',
        warning: 'bg-amber-600',
        danger: 'bg-red-600',
        info: 'bg-blue-600',
        neutral: 'bg-slate-600',
        primary: 'bg-indigo-600',
    };

    return (
        <span
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
            {children}
        </span>
    );
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['success', 'warning', 'danger', 'info', 'neutral', 'primary']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    dot: PropTypes.bool,
    className: PropTypes.string,
};

export default Badge;
