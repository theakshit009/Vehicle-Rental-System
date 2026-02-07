import api from './api';
import { generateId } from '../utils/helpers';
import { BOOKING_STATUS, PAYMENT_STATUS } from '../utils/constants';

// Mock bookings data
const MOCK_BOOKINGS = [];

// Create new booking
export const createBooking = async (bookingData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newBooking = {
                id: generateId(),
                ...bookingData,
                status: BOOKING_STATUS.PENDING,
                paymentStatus: PAYMENT_STATUS.PENDING,
                createdAt: new Date().toISOString(),
            };

            MOCK_BOOKINGS.push(newBooking);
            resolve({ data: newBooking });
        }, 500);
    });
};

// Get user bookings
export const getMyBookings = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: MOCK_BOOKINGS });
        }, 300);
    });
};

// Get booking by ID
export const getBookingById = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const booking = MOCK_BOOKINGS.find(b => b.id === id);
            if (booking) {
                resolve({ data: booking });
            } else {
                reject({ message: 'Booking not found' });
            }
        }, 300);
    });
};

// Cancel booking
export const cancelBooking = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const booking = MOCK_BOOKINGS.find(b => b.id === id);
            if (booking) {
                booking.status = BOOKING_STATUS.CANCELLED;
                resolve({ data: booking });
            } else {
                reject({ message: 'Booking not found' });
            }
        }, 300);
    });
};

// Process payment (mock)
export const processPayment = async (bookingId, paymentDetails) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate payment processing - always success for now
            const booking = MOCK_BOOKINGS.find(b => b.id === bookingId);
            if (booking) {
                booking.paymentStatus = PAYMENT_STATUS.SUCCESS;
                booking.status = BOOKING_STATUS.CONFIRMED;
            }

            resolve({
                data: {
                    success: true,
                    bookingId,
                    paymentId: generateId(),
                    message: 'Payment processed successfully'
                }
            });
        }, 1000);
    });
};

const bookingService = {
    createBooking,
    getMyBookings,
    getBookingById,
    cancelBooking,
    processPayment,
};

export default bookingService;
