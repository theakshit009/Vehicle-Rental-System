import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, MapPin, Users, Shield } from 'lucide-react';
import SearchBar from '../components/booking/SearchBar';
import VehicleCard from '../components/vehicle/VehicleCard';
import { PageLoader } from '../components/ui/Loader';
import Button from '../components/ui/Button';
import { getPopularVehicles } from '../services/vehicle.service';
import { useBookingStore } from '../store/booking.store';

const Home = () => {
    const navigate = useNavigate();
    const { setSearchParams, setSelectedVehicle } = useBookingStore();
    const [popularVehicles, setPopularVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPopularVehicles();
    }, []);

    const loadPopularVehicles = async () => {
        try {
            const response = await getPopularVehicles(6);
            setPopularVehicles(response.data);
        } catch (error) {
            console.error('Error loading popular vehicles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (params) => {
        setSearchParams(params);
        navigate(`/search?location=${params.location}&pickupDate=${params.pickupDate}&returnDate=${params.returnDate}&vehicleType=${params.vehicleType}`);
    };

    const handleSelectVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
        navigate(`/vehicle/${vehicle.id}`);
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 text-white py-12 md:py-20 lg:py-28 overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("/images/hero-background.jpg")',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-900/30 to-slate-900/40" />
                </div>

                {/* Background Pattern Overlay */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
                            Find Your Perfect Ride
                        </h1>
                        <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg">
                            Premium vehicles for every journey. Transparent pricing. Exceptional service.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-5xl mx-auto">
                        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-1.5 shadow-2xl">
                            <SearchBar onSearch={handleSearch} />
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                        <div className="text-center backdrop-blur-sm bg-white/10 rounded-xl py-4 shadow-lg">
                            <div className="text-4xl font-bold mb-2">500+</div>
                            <div className="text-indigo-100">Vehicles</div>
                        </div>
                        <div className="text-center backdrop-blur-sm bg-white/10 rounded-xl py-4 shadow-lg">
                            <div className="text-4xl font-bold mb-2">50+</div>
                            <div className="text-indigo-100">Locations</div>
                        </div>
                        <div className="text-center backdrop-blur-sm bg-white/10 rounded-xl py-4 shadow-lg">
                            <div className="text-4xl font-bold mb-2">15 Years</div>
                            <div className="text-indigo-100">Experience</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Vehicles */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">
                                Popular Vehicles
                            </h2>
                            <p className="text-slate-600">
                                Most booked vehicles by our customers
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            icon={<ArrowRight size={18} />}
                            onClick={() => navigate('/search')}
                        >
                            View All
                        </Button>
                    </div>

                    {loading ? (
                        <PageLoader message="Loading popular vehicles..." />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {popularVehicles.map((vehicle) => (
                                <VehicleCard
                                    key={vehicle.id}
                                    vehicle={vehicle}
                                    onSelect={handleSelectVehicle}
                                    showLocation
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-slate-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-3">
                            How It Works
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Rent a vehicle in three simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin size={32} className="text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                1. Choose Location & Dates
                            </h3>
                            <p className="text-slate-600">
                                Select your pickup location and rental period
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users size={32} className="text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                2. Select Your Vehicle
                            </h3>
                            <p className="text-slate-600">
                                Browse and choose from our wide range of vehicles
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle size={32} className="text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                3. Book & Drive
                            </h3>
                            <p className="text-slate-600">
                                Complete booking and pick up your vehicle
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-3">
                            Why Choose Us
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Your trusted vehicle rental partner
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-slate-50 p-6 rounded-xl">
                            <Shield size={40} className="text-indigo-600 mb-4" />
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                Verified Vehicles
                            </h3>
                            <p className="text-slate-600 text-sm">
                                All vehicles undergo regular maintenance and safety checks
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl">
                            <CheckCircle size={40} className="text-indigo-600 mb-4" />
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                Best Prices
                            </h3>
                            <p className="text-slate-600 text-sm">
                                Transparent pricing with no hidden charges
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl">
                            <Users size={40} className="text-indigo-600 mb-4" />
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                24/7 Support
                            </h3>
                            <p className="text-slate-600 text-sm">
                                Customer support available round the clock
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
