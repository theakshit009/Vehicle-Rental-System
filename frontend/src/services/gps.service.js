// GPS Service - Abstraction layer for GPS tracking
// Placeholder for future integration with Google Maps, Mapbox, etc.

import { GPS_STATUS } from '../utils/employeeConstants';

// Mock GPS data
const mockGPSData = {
    currentLocation: {
        lat: 28.6139,
        lng: 77.2090,
        address: 'Delhi, India',
        accuracy: 10,
        timestamp: new Date().toISOString(),
    },
    routeHistory: [
        {
            id: 'ROUTE-001',
            date: '2026-02-06',
            startLocation: { lat: 28.6139, lng: 77.2090, address: 'Delhi Central' },
            endLocation: { lat: 28.7041, lng: 77.1025, address: 'Noida Sector 62' },
            distance: 25.4,
            duration: 45,
            path: [],
        },
        {
            id: 'ROUTE-002',
            date: '2026-02-05',
            startLocation: { lat: 28.6139, lng: 77.2090, address: 'Delhi Central' },
            endLocation: { lat: 28.4595, lng: 77.0266, address: 'Gurgaon Cyber City' },
            distance: 32.1,
            duration: 62,
            path: [],
        },
    ],
};

let currentGPSStatus = GPS_STATUS.OFFLINE;

export const gpsService = {
    // Get current location
    getCurrentLocation: async () => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        return {
            success: true,
            data: mockGPSData.currentLocation,
        };
    },

    // Get route history
    getRouteHistory: async (limit = 10) => {
        await new Promise((resolve) => setTimeout(resolve, 300));

        return {
            success: true,
            data: mockGPSData.routeHistory.slice(0, limit),
        };
    },

    // Start tracking
    startTracking: async () => {
        await new Promise((resolve) => setTimeout(resolve, 200));

        currentGPSStatus = GPS_STATUS.ACTIVE;

        return {
            success: true,
            status: GPS_STATUS.ACTIVE,
        };
    },

    // Pause tracking
    pauseTracking: async () => {
        await new Promise((resolve) => setTimeout(resolve, 200));

        currentGPSStatus = GPS_STATUS.PAUSED;

        return {
            success: true,
            status: GPS_STATUS.PAUSED,
        };
    },

    // Stop tracking
    stopTracking: async () => {
        await new Promise((resolve) => setTimeout(resolve, 200));

        currentGPSStatus = GPS_STATUS.OFFLINE;

        return {
            success: true,
            status: GPS_STATUS.OFFLINE,
        };
    },

    // Get GPS status
    getStatus: () => {
        return currentGPSStatus;
    },

    // Get live location updates (placeholder for WebSocket)
    subscribeLiveLocation: (callback) => {
        // Simulate live updates every 5 seconds
        const interval = setInterval(() => {
            if (currentGPSStatus === GPS_STATUS.ACTIVE) {
                callback({
                    ...mockGPSData.currentLocation,
                    timestamp: new Date().toISOString(),
                });
            }
        }, 5000);

        // Return cleanup function
        return () => clearInterval(interval);
    },
};

export default gpsService;
