import { create } from 'zustand';

export const useBookingStore = create((set) => ({
    // Current booking flow state
    searchParams: {
        location: '',
        pickupDate: '',
        returnDate: '',
        vehicleType: '',
    },

    selectedVehicle: null,
    selectedAddOns: [],
    customerInfo: {
        name: '',
        email: '',
        phone: '',
        licenseNumber: '',
    },

    // Actions
    setSearchParams: (params) => {
        set({ searchParams: params });
    },

    setSelectedVehicle: (vehicle) => {
        set({ selectedVehicle: vehicle });
    },

    setSelectedAddOns: (addOns) => {
        set({ selectedAddOns: addOns });
    },

    setCustomerInfo: (info) => {
        set({ customerInfo: info });
    },

    updateCustomerInfo: (field, value) => {
        set((state) => ({
            customerInfo: {
                ...state.customerInfo,
                [field]: value,
            },
        }));
    },

    // Reset booking flow
    resetBooking: () => {
        set({
            searchParams: {
                location: '',
                pickupDate: '',
                returnDate: '',
                vehicleType: '',
            },
            selectedVehicle: null,
            selectedAddOns: [],
            customerInfo: {
                name: '',
                email: '',
                phone: '',
                licenseNumber: '',
            },
        });
    },

    // Get total days
    getTotalDays: () => {
        const state = useBookingStore.getState();
        const { pickupDate, returnDate } = state.searchParams;

        if (!pickupDate || !returnDate) return 1;

        const start = new Date(pickupDate);
        const end = new Date(returnDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        return Math.max(1, days);
    },
}));
