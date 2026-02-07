import React from 'react';
import PropTypes from 'prop-types';
import {
    Users,
    Fuel,
    Cog,
    Gauge,
    Calendar,
    Package,
    Shield,
    MapPin
} from 'lucide-react';

const VehicleSpecs = ({ vehicle }) => {
    const specs = [
        { icon: Users, label: 'Seating Capacity', value: `${vehicle.seats} Persons` },
        { icon: Fuel, label: 'Fuel Type', value: vehicle.fuelType },
        { icon: Cog, label: 'Transmission', value: vehicle.transmission },
        { icon: Gauge, label: 'Mileage', value: vehicle.mileage || 'N/A' },
        { icon: Calendar, label: 'Model Year', value: vehicle.year || 'N/A' },
        { icon: Package, label: 'Boot Space', value: vehicle.bootSpace || 'N/A' },
        { icon: Shield, label: 'Insurance', value: vehicle.insurance ? 'Included' : 'Optional' },
        { icon: MapPin, label: 'Location', value: vehicle.location || 'N/A' },
    ];

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Vehicle Specifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specs.map((spec, index) => {
                    const Icon = spec.icon;
                    return (
                        <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                                <Icon size={20} className="text-indigo-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-500 mb-0.5">{spec.label}</p>
                                <p className="text-base font-medium text-slate-900">{spec.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Features */}
            {vehicle.features && vehicle.features.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                    <h4 className="text-base font-semibold text-slate-900 mb-3">
                        Additional Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {vehicle.features.map((feature, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-lg"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

VehicleSpecs.propTypes = {
    vehicle: PropTypes.shape({
        seats: PropTypes.number.isRequired,
        fuelType: PropTypes.string.isRequired,
        transmission: PropTypes.string.isRequired,
        mileage: PropTypes.string,
        year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        bootSpace: PropTypes.string,
        insurance: PropTypes.bool,
        location: PropTypes.string,
        features: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};

export default VehicleSpecs;
