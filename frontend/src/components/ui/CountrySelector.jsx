import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext';

const CountrySelector = () => {
    const { selectedCountry, changeCountry, countries } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCountrySelect = (countryCode) => {
        changeCountry(countryCode);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                aria-label="Select country"
            >
                <Globe size={18} className="text-slate-600" />
                <span className="text-lg">{selectedCountry.flag}</span>
                <span className="hidden sm:inline text-sm font-medium text-slate-700">
                    {selectedCountry.code}
                </span>
                <span className="text-xs text-slate-500">
                    {selectedCountry.currencySymbol}
                </span>
                <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 max-h-96 overflow-y-auto">
                    {countries.map((country) => (
                        <button
                            key={country.code}
                            onClick={() => handleCountrySelect(country.code)}
                            className={`w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors flex items-center gap-3 ${selectedCountry.code === country.code ? 'bg-indigo-50' : ''
                                }`}
                        >
                            <span className="text-2xl">{country.flag}</span>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-900">
                                    {country.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {country.currency} ({country.currencySymbol})
                                </p>
                            </div>
                            {selectedCountry.code === country.code && (
                                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CountrySelector;
