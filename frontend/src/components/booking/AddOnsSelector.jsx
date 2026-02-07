import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Check } from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext';
import { ADDON_TYPES } from '../../utils/constants';
import Card from '../ui/Card';

const AddOnsSelector = ({ selectedAddOns = [], onAddOnsChange, days = 1 }) => {
    const { formatPrice } = useCurrency();
    const handleToggleAddon = (addonId) => {
        const isSelected = selectedAddOns.some((addon) => addon.id === addonId);

        if (isSelected) {
            onAddOnsChange(selectedAddOns.filter((addon) => addon.id !== addonId));
        } else {
            const addon = Object.values(ADDON_TYPES).find((a) => a.id === addonId);
            onAddOnsChange([...selectedAddOns, addon]);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">
                Add-Ons & Extras
            </h3>
            <p className="text-sm text-slate-600">
                Enhance your rental experience with these optional add-ons
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {Object.values(ADDON_TYPES).map((addon) => {
                    const isSelected = selectedAddOns.some((a) => a.id === addon.id);

                    return (
                        <button
                            key={addon.id}
                            onClick={() => handleToggleAddon(addon.id)}
                            className={`relative text-left p-4 rounded-xl border-2 transition-all ${isSelected
                                ? 'border-indigo-600 bg-indigo-50'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                                }`}
                        >
                            {isSelected && (
                                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                                    <Check size={16} className="text-white" />
                                </div>
                            )}

                            <div className="pr-8">
                                <h4 className="font-semibold text-slate-900 mb-1">
                                    {addon.name}
                                </h4>
                                <p className="text-sm text-slate-600 mb-2">
                                    {addon.description}
                                </p>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-lg font-bold text-indigo-600">
                                        {formatPrice(addon.price)}
                                    </span>
                                    <span className="text-xs text-slate-500">/ day</span>
                                </div>
                                {days > 1 && (
                                    <p className="text-xs text-slate-500 mt-1">
                                        {formatPrice(addon.price * days)} for {days} days
                                    </p>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {selectedAddOns.length > 0 && (
                <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                    <h4 className="font-medium text-slate-900 mb-2">
                        Selected Add-Ons ({selectedAddOns.length})
                    </h4>
                    <div className="space-y-1">
                        {selectedAddOns.map((addon) => (
                            <div key={addon.id} className="flex justify-between text-sm">
                                <span className="text-slate-700">{addon.name}</span>
                                <span className="font-medium text-slate-900">
                                    {formatPrice(addon.price * days)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

AddOnsSelector.propTypes = {
    selectedAddOns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        })
    ),
    onAddOnsChange: PropTypes.func.isRequired,
    days: PropTypes.number,
};

export default AddOnsSelector;
