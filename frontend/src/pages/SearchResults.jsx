import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import FilterPanel from '../components/booking/FilterPanel';
import VehicleCard from '../components/vehicle/VehicleCard';
import EmptyState from '../components/ui/EmptyState';
import { SkeletonCard, PageLoader } from '../components/ui/Loader';
import Button from '../components/ui/Button';
import { searchVehicles } from '../services/vehicle.service';
import { filterVehicles, sortVehicles } from '../utils/helpers';
import { useBookingStore } from '../store/booking.store';
import { Car } from 'lucide-react';

const SearchResults = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { setSelectedVehicle, searchParams: bookingSearchParams } = useBookingStore();

    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({});
    const [sortBy, setSortBy] = useState('popularity');
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        loadVehicles();
    }, [searchParams]);

    useEffect(() => {
        applyFiltersAndSort();
    }, [vehicles, filters, sortBy]);

    const loadVehicles = async () => {
        setLoading(true);
        try {
            const params = {
                location: searchParams.get('location'),
                vehicleType: searchParams.get('vehicleType'),
                pickupDate: searchParams.get('pickupDate'),
                returnDate: searchParams.get('returnDate'),
            };

            const response = await searchVehicles(params);
            setVehicles(response.data);
        } catch (error) {
            console.error('Error loading vehicles:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFiltersAndSort = () => {
        let results = filterVehicles(vehicles, filters);
        results = sortVehicles(results, sortBy);
        setFilteredVehicles(results);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleSelectVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
        navigate(`/vehicle/${vehicle.id}`);
    };

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Available Vehicles
                    </h1>
                    {bookingSearchParams.location && (
                        <p className="text-slate-600">
                            {filteredVehicles.length} vehicles in {bookingSearchParams.location}
                            {bookingSearchParams.pickupDate && ` from ${bookingSearchParams.pickupDate}`}
                        </p>
                    )}
                </div>

                {/* Sort and Filter Controls */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <label htmlFor="sort" className="text-sm font-medium text-slate-700">
                            Sort by:
                        </label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-sm"
                        >
                            <option value="popularity">Most Popular</option>
                            <option value="price_low">Price: Low to High</option>
                            <option value="price_high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>

                    <Button
                        variant="outline"
                        icon={<SlidersHorizontal size={18} />}
                        onClick={() => setShowMobileFilters(true)}
                        className="lg:hidden"
                    >
                        Filters
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters - Desktop */}
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24">
                            <FilterPanel onFilterChange={handleFilterChange} />
                        </div>
                    </aside>

                    {/* Vehicles Grid */}
                    <main className="lg:col-span-3">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[...Array(6)].map((_, index) => (
                                    <SkeletonCard key={index} />
                                ))}
                            </div>
                        ) : filteredVehicles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredVehicles.map((vehicle) => (
                                    <VehicleCard
                                        key={vehicle.id}
                                        vehicle={vehicle}
                                        onSelect={handleSelectVehicle}
                                        showLocation
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                icon={Car}
                                title="No vehicles found"
                                message="Try adjusting your filters or search criteria to find more options."
                                action={
                                    <Button
                                        variant="primary"
                                        onClick={() => navigate('/')}
                                    >
                                        Start New Search
                                    </Button>
                                }
                            />
                        )}
                    </main>
                </div>

                {/* Mobile Filters Modal */}
                {showMobileFilters && (
                    <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm">
                        <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl overflow-y-auto">
                            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
                                <button
                                    onClick={() => setShowMobileFilters(false)}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-6">
                                <FilterPanel onFilterChange={handleFilterChange} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
