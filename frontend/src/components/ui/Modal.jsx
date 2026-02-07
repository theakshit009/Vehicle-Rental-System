import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const Modal = ({
    isOpen = false,
    onClose,
    title = '',
    children,
    footer = null,
    size = 'md',
    closeOnBackdrop = true,
    showClose = true,
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full mx-4',
    };

    const handleBackdropClick = (e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 fade-in"
            onClick={handleBackdropClick}
        >
            <div
                className={`bg-white rounded-xl shadow-xl ${sizes[size]} w-full max-h-[90vh] md:max-h-[85vh] overflow-hidden slide-up`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {/* Header */}
                {(title || showClose) && (
                    <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-slate-200">
                        {title && (
                            <h3 id="modal-title" className="text-lg md:text-xl font-semibold text-slate-900">
                                {title}
                            </h3>
                        )}
                        {showClose && (
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="px-4 md:px-6 py-4 overflow-y-auto max-h-[calc(90vh-140px)]">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-4 md:px-6 py-3 md:py-4 border-t border-slate-200 bg-slate-50">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
    closeOnBackdrop: PropTypes.bool,
    showClose: PropTypes.bool,
};

export default Modal;
