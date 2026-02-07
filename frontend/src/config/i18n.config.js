// Internationalization configuration for the Vehicle Rental System

export const SUPPORTED_COUNTRIES = [
    {
        code: 'IN',
        name: 'India',
        currency: 'INR',
        currencySymbol: '₹',
        locale: 'en-IN',
        flag: '🇮🇳'
    },
    {
        code: 'US',
        name: 'United States',
        currency: 'USD',
        currencySymbol: '$',
        locale: 'en-US',
        flag: '🇺🇸'
    },
    {
        code: 'GB',
        name: 'United Kingdom',
        currency: 'GBP',
        currencySymbol: '£',
        locale: 'en-GB',
        flag: '🇬🇧'
    },
    {
        code: 'EU',
        name: 'European Union',
        currency: 'EUR',
        currencySymbol: '€',
        locale: 'en-EU',
        flag: '🇪🇺'
    },
    {
        code: 'AU',
        name: 'Australia',
        currency: 'AUD',
        currencySymbol: 'A$',
        locale: 'en-AU',
        flag: '🇦🇺'
    },
    {
        code: 'CA',
        name: 'Canada',
        currency: 'CAD',
        currencySymbol: 'C$',
        locale: 'en-CA',
        flag: '🇨🇦'
    },
    {
        code: 'SG',
        name: 'Singapore',
        currency: 'SGD',
        currencySymbol: 'S$',
        locale: 'en-SG',
        flag: '🇸🇬'
    },
    {
        code: 'AE',
        name: 'United Arab Emirates',
        currency: 'AED',
        currencySymbol: 'د.إ',
        locale: 'en-AE',
        flag: '🇦🇪'
    },
    {
        code: 'JP',
        name: 'Japan',
        currency: 'JPY',
        currencySymbol: '¥',
        locale: 'ja-JP',
        flag: '🇯🇵'
    },
    {
        code: 'DE',
        name: 'Germany',
        currency: 'EUR',
        currencySymbol: '€',
        locale: 'de-DE',
        flag: '🇩🇪'
    },
    {
        code: 'FR',
        name: 'France',
        currency: 'EUR',
        currencySymbol: '€',
        locale: 'fr-FR',
        flag: '🇫🇷'
    },
    {
        code: 'MX',
        name: 'Mexico',
        currency: 'MXN',
        currencySymbol: '$',
        locale: 'es-MX',
        flag: '🇲🇽'
    }
];

// Exchange rates (base currency: USD)
// In a production app, these would be fetched from an API
export const EXCHANGE_RATES = {
    USD: 1.0,
    INR: 83.12,
    GBP: 0.79,
    EUR: 0.92,
    AUD: 1.53,
    CAD: 1.36,
    SGD: 1.34,
    AED: 3.67,
    JPY: 149.50,
    MXN: 17.05
};

// Default country
export const DEFAULT_COUNTRY_CODE = 'IN';

// Get country by code
export const getCountryByCode = (code) => {
    return SUPPORTED_COUNTRIES.find(country => country.code === code) || SUPPORTED_COUNTRIES.find(c => c.code === DEFAULT_COUNTRY_CODE);
};

// Get country by currency
export const getCountryByCurrency = (currency) => {
    return SUPPORTED_COUNTRIES.find(country => country.currency === currency) || SUPPORTED_COUNTRIES.find(c => c.code === DEFAULT_COUNTRY_CODE);
};

// Get all unique currencies
export const getUniqueCurrencies = () => {
    const currencies = SUPPORTED_COUNTRIES.map(c => c.currency);
    return [...new Set(currencies)];
};
