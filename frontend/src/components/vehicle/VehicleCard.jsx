import React from 'react';
import PropTypes from 'prop-types';
import { Users, Fuel, Cog, MapPin } from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { VEHICLE_TYPES } from '../../utils/constants';

const VehicleCard = ({
    vehicle,
    onSelect,
    showLocation = false,
    className = '',
}) => {
    const { formatPrice } = useCurrency();

    const {
        id,
        name,
        type,
        image,
        pricePerDay,
        seats,
        fuelType,
        transmission,
        rating,
        available = true,
        location,
    } = vehicle;

    return (
        <Card hoverable className={className}>
            {/* Vehicle Image */}
            <div className="relative h-48 -mt-4 -mx-6 mb-4 overflow-hidden rounded-t-xl">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant="neutral" size="sm">
                        {type}
                    </Badge>
                    {!available && (
                        <Badge variant="danger" size="sm">
                            Unavailable
                        </Badge>
                    )}
                </div>

                {rating && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-medium">
                        <span className="text-amber-500">★</span>
                        <span className="text-slate-900">{rating.toFixed(1)}</span>
                    </div>
                )}
            </div>

            {/* Vehicle Info */}
            <div className="space-y-3">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                        {name}
                    </h3>
                    {showLocation && location && (
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                            <MapPin size={14} />
                            <span>{location}</span>
                        </div>
                    )}
                </div>

                {/* Specs */}
                <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1.5">
                        <Users size={16} className="text-slate-400" />
                        <span>{seats} Seats</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Fuel size={16} className="text-slate-400" />
                        <span>{fuelType}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Cog size={16} className="text-slate-400" />
                        <span>{transmission}</span>
                    </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                        <p className="text-2xl font-bold text-slate-900">
                            {formatPrice(pricePerDay)}
                        </p>
                        <p className="text-xs text-slate-500">per day</p>
                    </div>

                    <Button
                        variant="primary"
                        size="sm"
                        disabled={!available}
                        onClick={() => onSelect(vehicle)}
                    >
                        {available ? 'Select' : 'Unavailable'}
                    </Button>
                </div>
            </div>
        </Card>
    );
};

VehicleCard.propTypes = {
    vehicle: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        pricePerDay: PropTypes.number.isRequired,
        seats: PropTypes.number.isRequired,
        fuelType: PropTypes.string.isRequired,
        transmission: PropTypes.string.isRequired,
        rating: PropTypes.number,
        available: PropTypes.bool,
        location: PropTypes.string,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
    showLocation: PropTypes.bool,
    className: PropTypes.string,
};

export default VehicleCard;
