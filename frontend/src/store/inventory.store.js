import { create } from 'zustand';

/**
 * Inventory Store - Manages vehicle inventory for branch
 */
const useInventoryStore = create((set, get) => ({
    // Vehicle inventory
    vehicles: [
        {
            id: 'v-001',
            make: 'Toyota',
            model: 'Camry',
            year: 2023,
            licensePlate: 'ABC-1234',
            status: 'available',
            location: 'Lot A',
            fuelType: 'Gasoline',
            dailyRate: 59.99,
            lastInspection: '2026-01-15'
        },
        {
            id: 'v-002',
            make: 'Honda',
            model: 'Civic',
            year: 2023,
            licensePlate: 'XYZ-5678',
            status: 'rented',
            location: 'On Road',
            fuelType: 'Gasoline',
            dailyRate: 49.99,
            lastInspection: '2026-01-20'
        },
        {
            id: 'v-003',
            make: 'Tesla',
            model: 'Model 3',
            year: 2024,
            licensePlate: 'EV-9999',
            status: 'maintenance',
            location: 'Service Bay 2',
            fuelType: 'Electric',
            dailyRate: 89.99,
            lastInspection: '2026-01-10'
        }
    ],

    // Filters
    filters: {
        status: 'all',
        vehicleType: 'all',
        fuelType: 'all',
        search: ''
    },

    // Actions
    setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
    })),

    getFilteredVehicles: () => {
        const { vehicles, filters } = get();
        return vehicles.filter(vehicle => {
            const statusMatch = filters.status === 'all' || vehicle.status === filters.status;
            const fuelMatch = filters.fuelType === 'all' || vehicle.fuelType === filters.fuelType;
            const searchMatch = !filters.search ||
                `${vehicle.make} ${vehicle.model} ${vehicle.licensePlate}`.toLowerCase().includes(filters.search.toLowerCase());

            return statusMatch && fuelMatch && searchMatch;
        });
    },

    addVehicle: (vehicle) => set((state) => ({
        vehicles: [...state.vehicles, { ...vehicle, id: `v-${Date.now()}` }]
    })),

    updateVehicle: (id, updates) => set((state) => ({
        vehicles: state.vehicles.map(v => v.id === id ? { ...v, ...updates } : v)
    })),

    deleteVehicle: (id) => set((state) => ({
        vehicles: state.vehicles.filter(v => v.id !== id)
    })),

    resetFilters: () => set({
        filters: {
            status: 'all',
            vehicleType: 'all',
            fuelType: 'all',
            search: ''
        }
    })
}));

export default useInventoryStore;
