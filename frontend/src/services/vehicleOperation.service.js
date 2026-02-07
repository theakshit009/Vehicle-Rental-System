// Vehicle Operation Service - Vehicle check-in/out and inspections
// Mock service for vehicle operations

import { INSPECTION_STATUS } from '../utils/employeeConstants';

// Mock vehicle data
const mockVehicles = [
    {
        id: 'VEH-123',
        name: 'Toyota Innova',
        registrationNumber: 'DL-3CAB-1234',
        type: 'SUV',
        status: 'available',
        currentOdometer: 45230,
        fuelLevel: 75,
        lastInspection: '2026-02-05',
    },
    {
        id: 'VEH-456',
        name: 'Honda City',
        registrationNumber: 'DL-5CAB-5678',
        type: 'Sedan',
        status: 'on_trip',
        currentOdometer: 38950,
        fuelLevel: 60,
        lastInspection: '2026-02-04',
    },
    {
        id: 'VEH-789',
        name: 'Mahindra XUV700',
        registrationNumber: 'DL-7CAB-9012',
        type: 'SUV',
        status: 'maintenance',
        currentOdometer: 52100,
        fuelLevel: 40,
        lastInspection: '2026-01-30',
    },
];

export const vehicleOperationService = {
    // Get assigned vehicles
    getAssignedVehicles: async (employeeId) => {
        await new Promise((resolve) => setTimeout(resolve, 400));

        return {
            success: true,
            data: mockVehicles.filter((v) => v.status !== 'maintenance'),
        };
    },

    // Check-in vehicle
    checkInVehicle: async (vehicleId, checkInData) => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Simulate check-in process
        return {
            success: true,
            message: 'Vehicle checked in successfully',
            data: {
                checkInId: `CHECKIN-${Date.now()}`,
                vehicleId,
                timestamp: new Date().toISOString(),
                ...checkInData,
            },
        };
    },

    // Check-out vehicle
    checkOutVehicle: async (vehicleId, checkOutData) => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        return {
            success: true,
            message: 'Vehicle checked out successfully',
            data: {
                checkOutId: `CHECKOUT-${Date.now()}`,
                vehicleId,
                timestamp: new Date().toISOString(),
                ...checkOutData,
            },
        };
    },

    // Submit inspection
    submitInspection: async (vehicleId, inspectionData) => {
        await new Promise((resolve) => setTimeout(resolve, 600));

        return {
            success: true,
            message: 'Inspection submitted successfully',
            data: {
                inspectionId: `INSP-${Date.now()}`,
                vehicleId,
                timestamp: new Date().toISOString(),
                ...inspectionData,
            },
        };
    },

    // Report vehicle condition
    reportCondition: async (vehicleId, conditionData) => {
        await new Promise((resolve) => setTimeout(resolve, 300));

        return {
            success: true,
            message: 'Condition report submitted',
            data: {
                reportId: `REPORT-${Date.now()}`,
                vehicleId,
                timestamp: new Date().toISOString(),
                ...conditionData,
            },
        };
    },

    // Scan QR code (placeholder)
    scanQRCode: async (qrData) => {
        await new Promise((resolve) => setTimeout(resolve, 400));

        // Mock QR scan result
        const vehicleId = qrData || 'VEH-123';
        const vehicle = mockVehicles.find((v) => v.id === vehicleId);

        if (vehicle) {
            return {
                success: true,
                data: vehicle,
            };
        }

        return {
            success: false,
            error: 'Invalid QR code',
        };
    },

    // Get inspection checklist template
    getInspectionChecklist: () => {
        return {
            exterior: [
                { id: 'ext-1', item: 'Body damage/scratches', status: null },
                { id: 'ext-2', item: 'Headlights/Taillights', status: null },
                { id: 'ext-3', item: 'Mirrors', status: null },
                { id: 'ext-4', item: 'Tires/Wheels', status: null },
                { id: 'ext-5', item: 'Windows/Windshield', status: null },
            ],
            interior: [
                { id: 'int-1', item: 'Seats/Upholstery', status: null },
                { id: 'int-2', item: 'Dashboard/Controls', status: null },
                { id: 'int-3', item: 'Air conditioning', status: null },
                { id: 'int-4', item: 'Cleanliness', status: null },
            ],
            safety: [
                { id: 'safe-1', item: 'Seat belts', status: null },
                { id: 'safe-2', item: 'Airbags indicator', status: null },
                { id: 'safe-3', item: 'Emergency kit', status: null },
                { id: 'safe-4', item: 'Fire extinguisher', status: null },
            ],
            equipment: [
                { id: 'equip-1', item: 'Spare tire/Jack', status: null },
                { id: 'equip-2', item: 'Documents', status: null },
                { id: 'equip-3', item: 'GPS/Navigation', status: null },
            ],
        };
    },

    // Auto maintenance alert (automation hook - no logic)
    checkMaintenanceAlert: async (vehicleId) => {
        // Placeholder for automated maintenance alerts
        console.log('Maintenance alert check hook called for:', vehicleId);

        return {
            success: true,
            message: 'Maintenance alert hook ready (not implemented)',
            hasAlert: false,
        };
    },
};

export default vehicleOperationService;
