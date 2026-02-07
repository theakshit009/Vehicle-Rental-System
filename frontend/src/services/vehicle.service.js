import api from './api';
import { generateId } from '../utils/helpers';

// Mock vehicle data
const MOCK_VEHICLES = [
    {
        id: 1,
        name: 'Honda City',
        type: 'Sedan',
        image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
        pricePerDay: 2500,
        seats: 5,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        rating: 4.5,
        available: true,
        location: 'Mumbai',
        mileage: '18 km/l',
        year: 2023,
        bootSpace: '450 L',
        insurance: true,
        features: ['ABS', 'Airbags', 'AC', 'Power Steering', 'Bluetooth'],
        images: [
            'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
            'https://images.unsplash.com/photo-1583267746897-3019ae340a44?w=800',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
        ],
        bookings: 145,
    },
    {
        id: 2,
        name: 'Toyota Fortuner',
        type: 'SUV',
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
        pricePerDay: 5500,
        seats: 7,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        rating: 4.8,
        available: true,
        location: 'Delhi',
        mileage: '14 km/l',
        year: 2023,
        bootSpace: '200 L',
        insurance: true,
        features: ['4WD', 'Cruise Control', 'Sunroof', 'Leather Seats', 'Navigation'],
        images: [
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
        ],
        bookings: 98,
    },
    {
        id: 3,
        name: 'Maruti Swift',
        type: 'Hatchback',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
        pricePerDay: 1800,
        seats: 5,
        fuelType: 'Petrol',
        transmission: 'Manual',
        rating: 4.2,
        available: true,
        location: 'Bangalore',
        mileage: '22 km/l',
        year: 2022,
        bootSpace: '268 L',
        insurance: false,
        features: ['AC', 'Power Windows', 'Central Locking'],
        images: [
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
        ],
        bookings: 203,
    },
    {
        id: 4,
        name: 'BMW 5 Series',
        type: 'Luxury',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
        pricePerDay: 12000,
        seats: 5,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        rating: 4.9,
        available: true,
        location: 'Mumbai',
        mileage: '16 km/l',
        year: 2024,
        bootSpace: '530 L',
        insurance: true,
        features: ['Adaptive Cruise', 'Premium Sound', 'Panoramic Roof', 'Massage Seats'],
        images: [
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
        ],
        bookings: 67,
    },
    {
        id: 5,
        name: 'Hyundai Creta',
        type: 'SUV',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
        pricePerDay: 3500,
        seats: 5,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        rating: 4.6,
        available: true,
        location: 'Pune',
        mileage: '17 km/l',
        year: 2023,
        bootSpace: '433 L',
        insurance: true,
        features: ['Sunroof', 'Ventilated Seats', 'Touchscreen', 'Reverse Camera'],
        images: [
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
        ],
        bookings: 156,
    },
    {
        id: 6,
        name: 'Tata Nexon EV',
        type: 'Electric',
        image: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=800',
        pricePerDay: 3000,
        seats: 5,
        fuelType: 'Electric',
        transmission: 'Automatic',
        rating: 4.4,
        available: true,
        location: 'Bangalore',
        mileage: '312 km range',
        year: 2023,
        bootSpace: '350 L',
        insurance: true,
        features: ['Fast Charging', 'Regenerative Braking', 'Connected Car', 'AC'],
        images: [
            'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=800',
        ],
        bookings: 89,
    },
];

// Search vehicles with filters
export const searchVehicles = async (filters = {}) => {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            let results = [...MOCK_VEHICLES];

            // Apply filters
            if (filters.location) {
                results = results.filter(v => v.location === filters.location);
            }

            if (filters.vehicleType) {
                results = results.filter(v => v.type === filters.vehicleType);
            }

            if (filters.minPrice !== undefined) {
                results = results.filter(v => v.pricePerDay >= filters.minPrice);
            }

            if (filters.maxPrice !== undefined) {
                results = results.filter(v => v.pricePerDay <= filters.maxPrice);
            }

            if (filters.vehicleTypes?.length > 0) {
                results = results.filter(v => filters.vehicleTypes.includes(v.type));
            }

            if (filters.fuelTypes?.length > 0) {
                results = results.filter(v => filters.fuelTypes.includes(v.fuelType));
            }

            if (filters.transmission?.length > 0) {
                results = results.filter(v => filters.transmission.includes(v.transmission));
            }

            if (filters.seats?.length > 0) {
                results = results.filter(v => filters.seats.includes(v.seats));
            }

            resolve({ data: results });
        }, 500);
    });
};

// Get vehicle by ID
export const getVehicleById = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const vehicle = MOCK_VEHICLES.find(v => v.id === parseInt(id));
            if (vehicle) {
                resolve({ data: vehicle });
            } else {
                reject({ message: 'Vehicle not found' });
            }
        }, 300);
    });
};

// Get popular vehicles
export const getPopularVehicles = async (limit = 6) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const popular = [...MOCK_VEHICLES]
                .sort((a, b) => b.bookings - a.bookings)
                .slice(0, limit);
            resolve({ data: popular });
        }, 300);
    });
};

// Check vehicle availability
export const checkAvailability = async (vehicleId, pickupDate, returnDate) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock availability check - always return true for now
            resolve({
                data: {
                    available: true,
                    message: 'Vehicle is available for the selected dates'
                }
            });
        }, 300);
    });
};

const vehicleService = {
    searchVehicles,
    getVehicleById,
    getPopularVehicles,
    checkAvailability,
};

export default vehicleService;
