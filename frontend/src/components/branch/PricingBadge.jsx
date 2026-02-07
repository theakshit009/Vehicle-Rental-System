import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * PricingBadge - Display pricing with override comparison
 * @param {Number} basePrice - Original base price
 * @param {Number} overridePrice - Branch-specific override price (optional)
 * @param {String} currency - Currency symbol
 */
export default function PricingBadge({ basePrice, overridePrice, currency = '$' }) {
    const hasOverride = overridePrice !== undefined && overridePrice !== basePrice;
    const difference = hasOverride ? overridePrice - basePrice : 0;
    const percentChange = hasOverride ? ((difference / basePrice) * 100).toFixed(1) : 0;

    return (
        <div className="inline-flex items-center gap-2">
            {hasOverride ? (
                <>
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-slate-500 line-through">
                            {currency}{basePrice.toFixed(2)}
                        </span>
                        <span className="text-lg font-bold text-emerald-600">
                            {currency}{overridePrice.toFixed(2)}
                        </span>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${difference > 0
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                        {difference > 0 ? (
                            <TrendingUp className="w-3 h-3" />
                        ) : (
                            <TrendingDown className="w-3 h-3" />
                        )}
                        {percentChange}%
                    </div>
                </>
            ) : (
                <span className="text-lg font-bold text-slate-900">
                    {currency}{basePrice.toFixed(2)}
                </span>
            )}
        </div>
    );
}
