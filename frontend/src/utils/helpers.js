import { format, differenceInDays, isAfter, isBefore, parseISO } from 'date-fns';
import { EXCHANGE_RATES } from '../config/i18n.config';

/**
 * Format currency with specified currency code and locale
 * For use with currency context, prefer using formatPrice from useCurrency hook
 */
export const formatCurrency = (amount, currency = 'INR', locale = 'en-IN') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0,
    }).format(amount);
};

/**
 * Format date to readable string
 */
export const formatDate = (date, pattern = 'dd MMM yyyy') => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, pattern);
};

/**
 * Format date and time
 */
export const formatDateTime = (date) => {
    return formatDate(date, 'dd MMM yyyy, hh:mm a');
};

/**
 * Calculate number of days between two dates
 */
export const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
    const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
    return Math.max(1, differenceInDays(end, start));
};

/**
 * Validate date range
 */
export const isValidDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return false;
    const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
    const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
    return isAfter(end, start) || format(start, 'yyyy-MM-dd') === format(end, 'yyyy-MM-dd');
};

/**
 * Check if date is in the past
 */
export const isDateInPast = (date) => {
    if (!date) return false;
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isBefore(dateObj, new Date());
};

/**
 * Build search query string from filters
 */
export const buildSearchQuery = (filters) => {
    const params = new URLSearchParams();

    Object.keys(filters).forEach((key) => {
        const value = filters[key];
        if (value !== null && value !== undefined && value !== '') {
            if (Array.isArray(value)) {
                value.forEach((v) => params.append(key, v));
            } else {
                params.append(key, value);
            }
        }
    });

    return params.toString();
};

/**
 * Parse query string to object
 */
export const parseQueryString = (queryString) => {
    const params = new URLSearchParams(queryString);
    const result = {};

    for (const [key, value] of params.entries()) {
        if (result[key]) {
            if (Array.isArray(result[key])) {
                result[key].push(value);
            } else {
                result[key] = [result[key], value];
            }
        } else {
            result[key] = value;
        }
    }

    return result;
};

/**
 * Filter vehicles based on criteria
 */
export const filterVehicles = (vehicles, filters) => {
    return vehicles.filter((vehicle) => {
        // Price range filter
        if (filters.minPrice !== undefined && vehicle.pricePerDay < filters.minPrice) {
            return false;
        }
        if (filters.maxPrice !== undefined && vehicle.pricePerDay > filters.maxPrice) {
            return false;
        }

        // Vehicle type filter
        if (filters.vehicleTypes?.length > 0 && !filters.vehicleTypes.includes(vehicle.type)) {
            return false;
        }

        // Fuel type filter
        if (filters.fuelTypes?.length > 0 && !filters.fuelTypes.includes(vehicle.fuelType)) {
            return false;
        }

        // Transmission filter
        if (filters.transmission?.length > 0 && !filters.transmission.includes(vehicle.transmission)) {
            return false;
        }

        // Seating capacity filter
        if (filters.seats?.length > 0 && !filters.seats.includes(vehicle.seats)) {
            return false;
        }

        return true;
    });
};

/**
 * Sort vehicles by criteria
 */
export const sortVehicles = (vehicles, sortBy = 'popularity') => {
    const sorted = [...vehicles];

    switch (sortBy) {
        case 'price_low':
            return sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
        case 'price_high':
            return sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
        case 'rating':
            return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        case 'popularity':
        default:
            return sorted.sort((a, b) => (b.bookings || 0) - (a.bookings || 0));
    }
};

/**
 * Calculate total booking price (without tax breakdown)
 */
export const calculateBookingTotal = (vehicle, days, addOns = []) => {
    const vehicleTotal = vehicle.pricePerDay * days;
    const addOnsTotal = addOns.reduce((sum, addon) => sum + (addon.price * days), 0);
    const total = vehicleTotal + addOnsTotal;

    return {
        vehicleTotal,
        addOnsTotal,
        total,
    };
};

/**
 * Convert currency from one to another using exchange rates
 */
export const convertCurrency = (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return amount;

    const fromRate = EXCHANGE_RATES[fromCurrency] || 1;
    const toRate = EXCHANGE_RATES[toCurrency] || 1;

    // Convert to USD first, then to target currency
    const amountInUSD = amount / fromRate;
    return amountInUSD * toRate;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
};

/**
 * Generate initials from name
 */
export const getInitials = (name) => {
    if (!name) return '';
    return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

/**
 * Debounce function
 */
export const debounce = (func, delay = 300) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

/**
 * Generate random ID
 */
export const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
