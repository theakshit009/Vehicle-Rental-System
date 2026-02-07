import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import useInventoryStore from '../../store/inventory.store';
import VehicleInventoryCard from '../../components/vehicle/VehicleInventoryCard';
import VehicleAssignment from '../../components/vehicle/VehicleAssignment';
import Button from '../../components/ui/Button';

/**
 * Inventory Page - Manage vehicle inventory with filters
 */
export default function Inventory() {
    const { filters, setFilters, getFilteredVehicles } = useInventoryStore();
    const [assignmentModal, setAssignmentModal] = useState({ open: false, vehicle: null });
    const filteredVehicles = getFilteredVehicles();

    const handleAssign = (vehicle) => {
        setAssignmentModal({ open: true, vehicle });
    };

    const handleMaintenance = (vehicle) => {
        // TODO: Open maintenance modal
        console.log('Schedule maintenance for:', vehicle);
    };

    const mockEmployees = [
        { id: 'emp-001', name: 'Alice Johnson' },
        { id: 'emp-002', name: 'Bob Smith' },
        { id: 'emp-003', name: 'Carol Davis' }
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Vehicle Inventory</h1>
                    <p className="text-slate-600 mt-1">Manage and track your branch vehicles</p>
                </div>
                <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
                    Add Vehicle
                </Button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search vehicles..."
                            value={filters.search}
                            onChange={(e) => setFilters({ search: e.target.value })}
                            className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({ status: e.target.value })}
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                        <option value="all">All Status</option>
                        <option value="available">Available</option>
                        <option value="rented">Rented</option>
                        <option value="maintenance">Maintenance</option>
                    </select>

                    {/* Fuel Type Filter */}
                    <select
                        value={filters.fuelType}
                        onChange={(e) => setFilters({ fuelType: e.target.value })}
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                        <option value="all">All Fuel Types</option>
                        <option value="Gasoline">Gasoline</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>

                    {/* Reset Filters */}
                    <Button
                        variant="secondary"
                        onClick={() => setFilters({ status: 'all', fuelType: 'all', search: '' })}
                    >
                        Reset Filters
                    </Button>
                </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                    Showing <span className="font-semibold text-slate-900">{filteredVehicles.length}</span> vehicles
                </p>
            </div>

            {/* Vehicle Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVehicles.map((vehicle) => (
                    <VehicleInventoryCard
                        key={vehicle.id}
                        vehicle={vehicle}
                        onAssign={handleAssign}
                        onMaintenance={handleMaintenance}
                    />
                ))}
            </div>

            {filteredVehicles.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-slate-200">
                    <p className="text-slate-500">No vehicles found matching your filters</p>
                </div>
            )}

            {/* Assignment Modal */}
            <VehicleAssignment
                isOpen={assignmentModal.open}
                vehicle={assignmentModal.vehicle}
                employees={mockEmployees}
                onAssign={(data) => {
                    console.log('Assignment:', data);
                    setAssignmentModal({ open: false, vehicle: null });
                }}
                onClose={() => setAssignmentModal({ open: false, vehicle: null })}
            />
        </div>
    );
}
