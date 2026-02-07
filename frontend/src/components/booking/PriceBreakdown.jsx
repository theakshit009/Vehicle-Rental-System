import React from 'react';
import PropTypes from 'prop-types';
import { useCurrency } from '../../contexts/CurrencyContext';

const PriceBreakdown = ({
    vehiclePrice,
    days = 1,
    addOns = [],
    showDetails = true,
    className = ''
}) => {
    const { formatPrice } = useCurrency();

    const vehicleTotal = vehiclePrice * days;
    const addOnsTotal = addOns.reduce((sum, addon) => sum + (addon.price * days), 0);
    const total = vehicleTotal + addOnsTotal;

    return (
        <div className={`bg-white rounded-xl border border-slate-200 sticky top-6 ${className}`}>
            <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">
                    Price Breakdown
                </h3>

                {showDetails && (
                    <div className="space-y-4 mb-6">
                        {/* Vehicle Rental */}
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-slate-900">Vehicle Rental</p>
                                <p className="text-xs text-slate-500">
                                    {formatPrice(vehiclePrice)} × {days} {days === 1 ? 'day' : 'days'}
                                </p>
                            </div>
                            <p className="text-base font-semibold text-slate-900">
                                {formatPrice(vehicleTotal)}
                            </p>
                        </div>

                        {/* Add-Ons */}
                        {addOns.length > 0 && (
                            <>
                                <div className="border-t border-slate-100 pt-4">
                                    <p className="text-sm font-medium text-slate-900 mb-3">Add-Ons</p>
                                    <div className="space-y-2">
                                        {addOns.map((addon) => (
                                            <div key={addon.id} className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-sm text-slate-700">{addon.name}</p>
                                                    <p className="text-xs text-slate-500">
                                                        {formatPrice(addon.price)} × {days} {days === 1 ? 'day' : 'days'}
                                                    </p>
                                                </div>
                                                <p className="text-sm font-medium text-slate-900">
                                                    {formatPrice(addon.price * days)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                                    <p className="text-sm font-medium text-slate-900">Add-Ons Total</p>
                                    <p className="text-base font-semibold text-slate-900">
                                        {formatPrice(addOnsTotal)}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Total */}
                <div className="border-t-2 border-slate-200 pt-4">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-lg font-semibold text-slate-900">Total Amount</p>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-indigo-600">
                                {formatPrice(total)}
                            </p>
                            {days > 1 && (
                                <p className="text-xs text-slate-500">
                                    {formatPrice(total / days)} per day
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

PriceBreakdown.propTypes = {
    vehiclePrice: PropTypes.number.isRequired,
    days: PropTypes.number,
    addOns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        })
    ),
    showDetails: PropTypes.bool,
    className: PropTypes.string,
};

export default PriceBreakdown;
