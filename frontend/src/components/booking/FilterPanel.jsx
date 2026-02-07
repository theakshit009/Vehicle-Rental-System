import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SlidersHorizontal, X } from 'lucide-react';
import Button from '../ui/Button';
import {
    VEHICLE_TYPES,
    FUEL_TYPES,
    TRANSMISSION_TYPES,
    SEATING_CAPACITY
} from '../../utils/constants';

const FilterPanel = ({ onFilterChange, initialFilters = {}, className = '' }) => {
    const [filters, setFilters] = useState({
        minPrice: initialFilters.minPrice || 0,
        maxPrice: initialFilters.maxPrice || 15000,
        vehicleTypes: initialFilters.vehicleTypes || [],
        fuelTypes: initialFilters.fuelTypes || [],
        transmission: initialFilters.transmission || [],
        seats: initialFilters.seats || [],
    });

    const [appliedFilters, setAppliedFilters] = useState(filters);

    useEffect(() => {
        onFilterChange(appliedFilters);
    }, [appliedFilters, onFilterChange]);

    const handleCheckboxChange = (filterType, value) => {
        setFilters((prev) => {
            const currentValues = prev[filterType];
            const newValues = currentValues.includes(value)
                ? currentValues.filter((v) => v !== value)
                : [...currentValues, value];

            return { ...prev, [filterType]: newValues };
        });
    };

    const handlePriceChange = (type, value) => {
        setFilters((prev) => ({
            ...prev,
            [type]: parseInt(value, 10) || 0,
        }));
    };

    const applyFilters = () => {
        setAppliedFilters(filters);
    };

    const clearFilters = () => {
        const clearedFilters = {
            minPrice: 0,
            maxPrice: 15000,
            vehicleTypes: [],
            fuelTypes: [],
            transmission: [],
            seats: [],
        };
        setFilters(clearedFilters);
        setAppliedFilters(clearedFilters);
    };

    const hasActiveFilters =
        filters.vehicleTypes.length > 0 ||
        filters.fuelTypes.length > 0 ||
        filters.transmission.length > 0 ||
        filters.seats.length > 0 ||
        filters.minPrice > 0 ||
        filters.maxPrice < 15000;

    return (
        <div className={`bg-white rounded-xl border border-slate-200 p-6 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={20} className="text-slate-700" />
                    <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                    >
                        <X size={16} />
                        Clear all
                    </button>
                )}
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Price Range (per day)</h4>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.minPrice}
                            onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                        />
                        <span className="text-slate-500">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.maxPrice}
                            onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
            </div>

            {/* Vehicle Type */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Vehicle Type</h4>
                <div className="space-y-2">
                    {Object.values(VEHICLE_TYPES).map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filters.vehicleTypes.includes(type)}
                                onChange={() => handleCheckboxChange('vehicleTypes', type)}
                                className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Fuel Type */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Fuel Type</h4>
                <div className="space-y-2">
                    {Object.values(FUEL_TYPES).map((fuel) => (
                        <label key={fuel} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filters.fuelTypes.includes(fuel)}
                                onChange={() => handleCheckboxChange('fuelTypes', fuel)}
                                className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900">{fuel}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Transmission */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Transmission</h4>
                <div className="space-y-2">
                    {Object.values(TRANSMISSION_TYPES).map((trans) => (
                        <label key={trans} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filters.transmission.includes(trans)}
                                onChange={() => handleCheckboxChange('transmission', trans)}
                                className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900">{trans}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Seating Capacity */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Seating Capacity</h4>
                <div className="space-y-2">
                    {SEATING_CAPACITY.map((seats) => (
                        <label key={seats} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filters.seats.includes(seats)}
                                onChange={() => handleCheckboxChange('seats', seats)}
                                className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900">{seats} Seats</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Apply Button */}
            <Button
                variant="primary"
                fullWidth
                onClick={applyFilters}
            >
                Apply Filters
            </Button>
        </div>
    );
};

FilterPanel.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    initialFilters: PropTypes.object,
    className: PropTypes.string,
};

export default FilterPanel;
