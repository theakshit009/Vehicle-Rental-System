// Application-wide constants

export const VEHICLE_TYPES = {
    SEDAN: 'Sedan',
    SUV: 'SUV',
    HATCHBACK: 'Hatchback',
    LUXURY: 'Luxury',
    SPORTS: 'Sports',
    VAN: 'Van',
    ELECTRIC: 'Electric',
};

export const FUEL_TYPES = {
    PETROL: 'Petrol',
    DIESEL: 'Diesel',
    ELECTRIC: 'Electric',
    HYBRID: 'Hybrid',
    CNG: 'CNG',
};

export const TRANSMISSION_TYPES = {
    MANUAL: 'Manual',
    AUTOMATIC: 'Automatic',
};

export const ADDON_TYPES = {
    GPS: {
        id: 'gps',
        name: 'GPS Navigation',
        price: 500,
        description: 'Real-time navigation system',
    },
    INSURANCE_BASIC: {
        id: 'insurance_basic',
        name: 'Basic Insurance',
        price: 1500,
        description: 'Covers basic damages and theft',
    },
    INSURANCE_PREMIUM: {
        id: 'insurance_premium',
        name: 'Premium Insurance',
        price: 3000,
        description: 'Comprehensive coverage including zero depreciation',
    },
    DRIVER: {
        id: 'driver',
        name: 'Professional Driver',
        price: 2000,
        description: 'Experienced driver for 8 hours/day',
    },
    CHILD_SEAT: {
        id: 'child_seat',
        name: 'Child Safety Seat',
        price: 300,
        description: 'Certified child safety seat',
    },
    WIFI: {
        id: 'wifi',
        name: 'Mobile WiFi',
        price: 400,
        description: '4G mobile hotspot device',
    },
};

export const BOOKING_STATUS = {
    PENDING: 'Pending',
    CONFIRMED: 'Confirmed',
    ONGOING: 'Ongoing',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
};

export const PAYMENT_STATUS = {
    PENDING: 'Pending',
    SUCCESS: 'Success',
    FAILED: 'Failed',
};

export const SEATING_CAPACITY = [2, 4, 5, 7, 8];

export const PRICE_RANGES = [
    { min: 0, max: 2000, label: 'Under 2,000' },
    { min: 2000, max: 4000, label: '2,000 - 4,000' },
    { min: 4000, max: 6000, label: '4,000 - 6,000' },
    { min: 6000, max: 10000, label: '6,000 - 10,000' },
    { min: 10000, max: Infinity, label: 'Above 10,000' },
];


// Mock locations
export const LOCATIONS = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Pune',
    'Kolkata',
    'Ahmedabad',
    'Jaipur',
    'Goa',
];

// API endpoints (mock for now)
export const API_ENDPOINTS = {
    BASE_URL: '/api',
    VEHICLES: {
        SEARCH: '/vehicles/search',
        DETAILS: '/vehicles/:id',
        POPULAR: '/vehicles/popular',
    },
    BOOKINGS: {
        CREATE: '/bookings',
        LIST: '/bookings',
        DETAILS: '/bookings/:id',
        CANCEL: '/bookings/:id/cancel',
    },
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        PROFILE: '/auth/profile',
    },
};
