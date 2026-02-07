import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
    children,
    header = null,
    footer = null,
    hoverable = false,
    className = '',
    ...props
}) => {
    const baseStyles = 'bg-white rounded-xl shadow-sm border border-slate-200';
    const hoverStyles = hoverable ? 'transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer' : '';

    return (
        <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
            {header && (
                <div className="px-6 py-4 border-b border-slate-200">
                    {header}
                </div>
            )}

            <div className="px-6 py-4">
                {children}
            </div>

            {footer && (
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-xl">
                    {footer}
                </div>
            )}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.node,
    footer: PropTypes.node,
    hoverable: PropTypes.bool,
    className: PropTypes.string,
};

export default Card;
