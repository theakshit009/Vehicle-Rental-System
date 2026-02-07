import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import VehicleGallery from '../components/vehicle/VehicleGallery';
import VehicleSpecs from '../components/vehicle/VehicleSpecs';
import AddOnsSelector from '../components/booking/AddOnsSelector';
import PriceBreakdown from '../components/booking/PriceBreakdown';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { PageLoader } from '../components/ui/Loader';
import { getVehicleById } from '../services/vehicle.service';
import { useBookingStore } from '../store/booking.store';
import { calculateDays } from '../utils/helpers';

const VehicleDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        searchParams,
        selectedAddOns,
        setSelectedAddOns,
        setSelectedVehicle,
        getTotalDays,
    } = useBookingStore();

    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState(1);

    useEffect(() => {
        loadVehicle();
    }, [id]);

    useEffect(() => {
        if (searchParams.pickupDate && searchParams.returnDate) {
            const totalDays = calculateDays(searchParams.pickupDate, searchParams.returnDate);
            setDays(totalDays);
        }
    }, [searchParams]);

    const loadVehicle = async () => {
        setLoading(true);
        try {
            const response = await getVehicleById(id);
            setVehicle(response.data);
            setSelectedVehicle(response.data);
        } catch (error) {
            console.error('Error loading vehicle:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookNow = () => {
        if (!searchParams.pickupDate || !searchParams.returnDate) {
            alert('Please select pickup and return dates from the home page');
            navigate('/');
            return;
        }
        navigate('/booking');
    };

    if (loading) {
        return <PageLoader message="Loading vehicle details..." />;
    }

    if (!vehicle) {
        return (
            <div className="container-custom py-16 text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Vehicle not found</h2>
                <Button onClick={() => navigate('/')}>Back to Home</Button>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className="container-custom">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span className="font-medium">Back to results</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Gallery */}
                        <VehicleGallery images={vehicle.images} vehicleName={vehicle.name} />

                        {/* Vehicle Info */}
                        <div className="bg-white rounded-xl p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                                        {vehicle.name}
                                    </h1>
                                    <div className="flex items-center gap-3">
                                        <Badge variant="primary">{vehicle.type}</Badge>
                                        {vehicle.rating && (
                                            <div className="flex items-center gap-1 text-sm text-slate-600">
                                                <Star size={16} className="text-amber-500 fill-amber-500" />
                                                <span className="font-medium">{vehicle.rating.toFixed(1)}</span>
                                            </div>
                                        )}
                                        <Badge
                                            variant={vehicle.available ? 'success' : 'danger'}
                                            dot
                                        >
                                            {vehicle.available ? 'Available' : 'Unavailable'}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {searchParams.location && (
                                <div className="mb-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                                    <p className="text-sm text-slate-700">
                                        <span className="font-medium">Pickup:</span> {searchParams.location} • {searchParams.pickupDate}
                                    </p>
                                    <p className="text-sm text-slate-700">
                                        <span className="font-medium">Return:</span> {searchParams.location} • {searchParams.returnDate}
                                    </p>
                                    <p className="text-sm text-indigo-700 font-medium mt-1">
                                        Duration: {days} {days === 1 ? 'day' : 'days'}
                                    </p>
                                </div>
                            )}

                            {vehicle.features && vehicle.features.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="text-sm font-semibold text-slate-700 mb-2">Key Features</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {vehicle.features.slice(0, 5).map((feature, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-lg"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Specifications */}
                        <VehicleSpecs vehicle={vehicle} />

                        {/* Add-Ons */}
                        <div className="bg-white rounded-xl p-6">
                            <AddOnsSelector
                                selectedAddOns={selectedAddOns}
                                onAddOnsChange={setSelectedAddOns}
                                days={days}
                            />
                        </div>
                    </div>

                    {/* Sidebar - Price Breakdown */}
                    <div className="lg:col-span-1">
                        <PriceBreakdown
                            vehiclePrice={vehicle.pricePerDay}
                            days={days}
                            addOns={selectedAddOns}
                            className="mb-4"
                        />

                        <Button
                            variant="primary"
                            size="lg"
                            fullWidth
                            onClick={handleBookNow}
                            disabled={!vehicle.available}
                        >
                            {vehicle.available ? 'Book Now' : 'Unavailable'}
                        </Button>

                        {!searchParams.pickupDate && (
                            <p className="text-sm text-amber-600 mt-3 text-center">
                                Please select dates from home page to proceed
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;
