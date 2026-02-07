import { create } from 'zustand';

/**
 * Pricing Store - Manages branch-specific pricing overrides
 */
const usePricingStore = create((set, get) => ({
    // Pricing rules and overrides
    pricingRules: [
        {
            id: 'pr-001',
            vehicleType: 'Sedan',
            basePrice: 49.99,
            overridePrice: 54.99,
            startDate: '2026-02-01',
            endDate: '2026-02-28',
            demandFlag: 'high',
            active: true
        },
        {
            id: 'pr-002',
            vehicleType: 'SUV',
            basePrice: 79.99,
            overridePrice: 89.99,
            startDate: '2026-02-10',
            endDate: '2026-02-20',
            demandFlag: 'peak',
            active: true
        },
        {
            id: 'pr-003',
            vehicleType: 'Electric',
            basePrice: 89.99,
            overridePrice: 84.99,
            startDate: '2026-02-01',
            endDate: '2026-03-31',
            demandFlag: 'normal',
            active: true
        }
    ],

    // Actions
    addPricingRule: (rule) => set((state) => ({
        pricingRules: [...state.pricingRules, { ...rule, id: `pr-${Date.now()}` }]
    })),

    updatePricingRule: (id, updates) => set((state) => ({
        pricingRules: state.pricingRules.map(rule =>
            rule.id === id ? { ...rule, ...updates } : rule
        )
    })),

    deletePricingRule: (id) => set((state) => ({
        pricingRules: state.pricingRules.filter(rule => rule.id !== id)
    })),

    toggleRuleActive: (id) => set((state) => ({
        pricingRules: state.pricingRules.map(rule =>
            rule.id === id ? { ...rule, active: !rule.active } : rule
        )
    })),

    getActivePricingRules: () => {
        const { pricingRules } = get();
        return pricingRules.filter(rule => rule.active);
    },

    getPriceForVehicle: (vehicleType, date = new Date()) => {
        const { pricingRules } = get();
        const applicableRule = pricingRules.find(rule => {
            const isActive = rule.active;
            const matchesType = rule.vehicleType === vehicleType;
            const withinDateRange = (!rule.startDate || new Date(rule.startDate) <= date) &&
                (!rule.endDate || new Date(rule.endDate) >= date);
            return isActive && matchesType && withinDateRange;
        });

        return applicableRule || null;
    }
}));

export default usePricingStore;
