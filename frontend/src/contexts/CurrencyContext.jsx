import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    SUPPORTED_COUNTRIES,
    DEFAULT_COUNTRY_CODE,
    EXCHANGE_RATES,
    getCountryByCode
} from '../config/i18n.config';

const CurrencyContext = createContext();

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};

export const CurrencyProvider = ({ children }) => {
    // Initialize from localStorage or use default
    const [selectedCountry, setSelectedCountry] = useState(() => {
        const saved = localStorage.getItem('selectedCountry');
        return saved ? getCountryByCode(saved) : getCountryByCode(DEFAULT_COUNTRY_CODE);
    });

    // Save to localStorage when country changes
    useEffect(() => {
        localStorage.setItem('selectedCountry', selectedCountry.code);
    }, [selectedCountry]);

    // Convert amount from base currency (USD) to selected currency
    const convertCurrency = (amountInUSD) => {
        const rate = EXCHANGE_RATES[selectedCountry.currency] || 1;
        return amountInUSD * rate;
    };

    // Convert from INR (original currency) to selected currency
    const convertFromINR = (amountInINR) => {
        // First convert INR to USD
        const amountInUSD = amountInINR / EXCHANGE_RATES.INR;
        // Then convert USD to selected currency
        return convertCurrency(amountInUSD);
    };

    // Format currency with appropriate symbol and locale
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat(selectedCountry.locale, {
            style: 'currency',
            currency: selectedCountry.currency,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Format amount that's originally in INR
    const formatPrice = (amountInINR) => {
        const convertedAmount = convertFromINR(amountInINR);
        return formatCurrency(convertedAmount);
    };

    // Change selected country
    const changeCountry = (countryCode) => {
        const country = getCountryByCode(countryCode);
        setSelectedCountry(country);
    };

    const value = {
        selectedCountry,
        currency: selectedCountry.currency,
        currencySymbol: selectedCountry.currencySymbol,
        locale: selectedCountry.locale,
        convertCurrency,
        convertFromINR,
        formatCurrency,
        formatPrice, // Use this for prices stored in INR
        changeCountry,
        countries: SUPPORTED_COUNTRIES
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};

CurrencyProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
