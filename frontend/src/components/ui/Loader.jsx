import React from 'react';
import PropTypes from 'prop-types';

// Spinner Loader
export const Spinner = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className={`inline-block ${sizes[size]} ${className}`}>
            <svg
                className="animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        </div>
    );
};

Spinner.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
};

// Skeleton Text Loader
export const SkeletonText = ({ lines = 1, className = '' }) => {
    return (
        <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, index) => (
                <div
                    key={index}
                    className="h-4 bg-slate-200 rounded animate-pulse"
                    style={{ width: index === lines - 1 ? '80%' : '100%' }}
                />
            ))}
        </div>
    );
};

SkeletonText.propTypes = {
    lines: PropTypes.number,
    className: PropTypes.string,
};

// Skeleton Card Loader
export const SkeletonCard = ({ className = '' }) => {
    return (
        <div className={`bg-white rounded-xl shadow-sm p-6 space-y-4 ${className}`}>
            <div className="h-48 bg-slate-200 rounded-lg animate-pulse" />
            <div className="space-y-3">
                <div className="h-6 bg-slate-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2" />
                <div className="flex gap-2 pt-2">
                    <div className="h-8 bg-slate-200 rounded animate-pulse w-16" />
                    <div className="h-8 bg-slate-200 rounded animate-pulse w-16" />
                </div>
            </div>
        </div>
    );
};

SkeletonCard.propTypes = {
    className: PropTypes.string,
};

// Full Page Loader
export const PageLoader = ({ message = 'Loading...' }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Spinner size="lg" className="text-indigo-600" />
            <p className="text-slate-600 text-lg">{message}</p>
        </div>
    );
};

PageLoader.propTypes = {
    message: PropTypes.string,
};

// Default export
const Loader = { Spinner, SkeletonText, SkeletonCard, PageLoader };

export default Loader;
