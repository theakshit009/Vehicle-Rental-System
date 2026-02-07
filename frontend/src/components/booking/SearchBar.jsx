import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MapPin, Calendar, Car, Search } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { LOCATIONS, VEHICLE_TYPES } from '../../utils/constants';

const SearchBar = ({ onSearch, className = '' }) => {
    const [searchParams, setSearchParams] = useState({
        location: '',
        pickupDate: '',
        returnDate: '',
        vehicleType: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setSearchParams((prev) => ({ ...prev, [field]: value }));
        // Clear error for this field
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!searchParams.location) {
            newErrors.location = 'Please select a location';
        }

        if (!searchParams.pickupDate) {
            newErrors.pickupDate = 'Please select pickup date';
        }

        if (!searchParams.returnDate) {
            newErrors.returnDate = 'Please select return date';
        }

        if (searchParams.pickupDate && searchParams.returnDate) {
            const pickup = new Date(searchParams.pickupDate);
            const returnDate = new Date(searchParams.returnDate);

            if (returnDate <= pickup) {
                newErrors.returnDate = 'Return date must be after pickup date';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            onSearch(searchParams);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`bg-white rounded-xl shadow-lg p-4 md:p-6 ${className}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Location */}
                <div className="lg:col-span-1">
                    <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Location
                    </label>
                    <div className="relative">
                        <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <select
                            id="location"
                            value={searchParams.location}
                            onChange={(e) => handleChange('location', e.target.value)}
                            className="block w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 transition-all"
                        >
                            <option value="">Select location</option>
                            {LOCATIONS.map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.location && (
                        <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                    )}
                </div>

                {/* Pickup Date */}
                <div className="lg:col-span-1">
                    <Input
                        label="Pickup Date"
                        type="date"
                        value={searchParams.pickupDate}
                        onChange={(e) => handleChange('pickupDate', e.target.value)}
                        error={errors.pickupDate}
                        icon={<Calendar size={18} />}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>

                {/* Return Date */}
                <div className="lg:col-span-1">
                    <Input
                        label="Return Date"
                        type="date"
                        value={searchParams.returnDate}
                        onChange={(e) => handleChange('returnDate', e.target.value)}
                        error={errors.returnDate}
                        icon={<Calendar size={18} />}
                        min={searchParams.pickupDate || new Date().toISOString().split('T')[0]}
                    />
                </div>

                {/* Vehicle Type */}
                <div className="lg:col-span-1">
                    <label htmlFor="vehicleType" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Vehicle Type
                    </label>
                    <div className="relative">
                        <Car size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <select
                            id="vehicleType"
                            value={searchParams.vehicleType}
                            onChange={(e) => handleChange('vehicleType', e.target.value)}
                            className="block w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 transition-all"
                        >
                            <option value="">All Types</option>
                            {Object.values(VEHICLE_TYPES).map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Search Button */}
                <div className="sm:col-span-2 lg:col-span-1 flex items-end">
                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        icon={<Search size={18} />}
                        className="min-h-[44px]"
                    >
                        Search
                    </Button>
                </div>
            </div>
        </form>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default SearchBar;
