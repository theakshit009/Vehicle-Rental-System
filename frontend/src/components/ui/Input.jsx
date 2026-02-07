import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(({
    label,
    type = 'text',
    placeholder = '',
    error = '',
    helperText = '',
    icon = null,
    disabled = false,
    required = false,
    fullWidth = false,
    className = '',
    ...props
}, ref) => {
    const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseInputStyles = 'block w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed';

    const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
    const iconPadding = icon ? 'pl-11' : '';
    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <div className={`${widthClass} ${className}`}>
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1.5">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        {icon}
                    </div>
                )}

                <input
                    ref={ref}
                    id={inputId}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={`${baseInputStyles} ${errorStyles} ${iconPadding}`}
                    {...props}
                />
            </div>

            {error && (
                <p className="mt-1.5 text-sm text-red-600">{error}</p>
            )}

            {helperText && !error && (
                <p className="mt-1.5 text-sm text-slate-500">{helperText}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    helperText: PropTypes.string,
    icon: PropTypes.node,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string,
};

export default Input;
