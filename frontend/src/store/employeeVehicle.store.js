import { create } from 'zustand';
import { VEHICLE_CHECK_STATUS, INSPECTION_STATUS } from '../utils/employeeConstants';

const useEmployeeVehicleStore = create((set, get) => ({
    // State
    assignedVehicles: [],
    activeCheckout: null,
    inspectionRecords: [],
    vehicleConditions: {},

    // Actions
    setAssignedVehicles: (vehicles) => {
        set({ assignedVehicles: vehicles });
    },

    checkInVehicle: (vehicleId, checkInData) => {
        const record = {
            id: `CHECKIN-${Date.now()}`,
            vehicleId,
            type: 'check-in',
            timestamp: new Date().toISOString(),
            odometer: checkInData.odometer,
            fuelLevel: checkInData.fuelLevel,
            condition: checkInData.condition,
            notes: checkInData.notes,
            photos: checkInData.photos || [],
            status: VEHICLE_CHECK_STATUS.COMPLETED,
        };

        set((state) => ({
            inspectionRecords: [record, ...state.inspectionRecords],
            vehicleConditions: {
                ...state.vehicleConditions,
                [vehicleId]: checkInData.condition,
            },
        }));

        return record;
    },

    checkOutVehicle: (vehicleId, checkOutData) => {
        const record = {
            id: `CHECKOUT-${Date.now()}`,
            vehicleId,
            type: 'check-out',
            timestamp: new Date().toISOString(),
            odometer: checkOutData.odometer,
            fuelLevel: checkOutData.fuelLevel,
            condition: checkOutData.condition,
            notes: checkOutData.notes,
            photos: checkOutData.photos || [],
            customerId: checkOutData.customerId,
            status: VEHICLE_CHECK_STATUS.COMPLETED,
        };

        set((state) => ({
            activeCheckout: record,
            inspectionRecords: [record, ...state.inspectionRecords],
        }));

        return record;
    },

    submitInspection: (vehicleId, inspectionData) => {
        const inspection = {
            id: `INSP-${Date.now()}`,
            vehicleId,
            timestamp: new Date().toISOString(),
            checklist: inspectionData.checklist,
            overallStatus: inspectionData.overallStatus,
            notes: inspectionData.notes,
            photos: inspectionData.photos || [],
        };

        set((state) => ({
            inspectionRecords: [inspection, ...state.inspectionRecords],
        }));

        return inspection;
    },

    clearActiveCheckout: () => {
        set({ activeCheckout: null });
    },

    // Derived selectors
    hasActiveCheckout: () => {
        return get().activeCheckout !== null;
    },

    pendingInspections: () => {
        const { assignedVehicles, inspectionRecords } = get();

        // Vehicles that need inspection (simplified logic)
        return assignedVehicles.filter((vehicle) => {
            const recentInspection = inspectionRecords.find(
                (record) => record.vehicleId === vehicle.id
            );

            if (!recentInspection) return true;

            // Check if inspection is older than 24 hours
            const inspectionTime = new Date(recentInspection.timestamp);
            const now = new Date();
            const hoursDiff = (now - inspectionTime) / (1000 * 60 * 60);

            return hoursDiff > 24;
        });
    },

    getVehicleCondition: (vehicleId) => {
        return get().vehicleConditions[vehicleId] || 'unknown';
    },

    getRecentInspections: (limit = 10) => {
        return get().inspectionRecords.slice(0, limit);
    },
}));

export default useEmployeeVehicleStore;
