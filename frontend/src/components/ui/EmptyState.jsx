import React from 'react';
import PropTypes from 'prop-types';

const EmptyState = ({
    icon: Icon,
    title,
    message,
    action = null,
    className = '',
}) => {
    return (
        <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
            {Icon && (
                <div className="mb-4 text-slate-300">
                    <Icon size={64} strokeWidth={1.5} />
                </div>
            )}

            {title && (
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {title}
                </h3>
            )}

            {message && (
                <p className="text-slate-600 max-w-md mb-6">
                    {message}
                </p>
            )}

            {action && (
                <div className="mt-2">
                    {action}
                </div>
            )}
        </div>
    );
};

EmptyState.propTypes = {
    icon: PropTypes.elementType,
    title: PropTypes.string,
    message: PropTypes.string,
    action: PropTypes.node,
    className: PropTypes.string,
};

export default EmptyState;
