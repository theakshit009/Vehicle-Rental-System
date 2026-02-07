import React, { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import usePricingStore from '../../store/pricing.store';
import PricingBadge from '../../components/branch/PricingBadge';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

/**
 * Pricing Page - Manage branch-specific pricing overrides
 */
export default function Pricing() {
    const { pricingRules, toggleRuleActive, deletePricingRule } = usePricingStore();
    const [showAddModal, setShowAddModal] = useState(false);

    const columns = [
        {
            key: 'vehicleType',
            label: 'Vehicle Type',
            sortable: true,
        },
        {
            key: 'pricing',
            label: 'Pricing',
            render: (_, row) => (
                <PricingBadge
                    basePrice={row.basePrice}
                    overridePrice={row.overridePrice}
                />
            )
        },
        {
            key: 'dateRange',
            label: 'Date Range',
            render: (_, row) => (
                <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>
                        {new Date(row.startDate).toLocaleDateString()} - {new Date(row.endDate).toLocaleDateString()}
                    </span>
                </div>
            )
        },
        {
            key: 'demandFlag',
            label: 'Demand',
            render: (value) => {
                const variants = {
                    'high': 'warning',
                    'peak': 'danger',
                    'normal': 'neutral',
                    'low': 'info'
                };
                return <Badge variant={variants[value] || 'neutral'}>{value.toUpperCase()}</Badge>;
            }
        },
        {
            key: 'active',
            label: 'Status',
            render: (value) => (
                <Badge variant={value ? 'success' : 'neutral'}>
                    {value ? 'Active' : 'Inactive'}
                </Badge>
            )
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (_, row) => (
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toggleRuleActive(row.id)}
                    >
                        {row.active ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(row.id)}
                    >
                        Delete
                    </Button>
                </div>
            )
        }
    ];

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this pricing rule?')) {
            deletePricingRule(id);
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Pricing Management</h1>
                    <p className="text-slate-600 mt-1">Manage branch-specific pricing overrides and rules</p>
                </div>
                <Button
                    variant="primary"
                    leftIcon={<Plus className="w-4 h-4" />}
                    onClick={() => setShowAddModal(true)}
                >
                    Add Pricing Rule
                </Button>
            </div>

            {/* Info Card */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex gap-3">
                    <div className="shrink-0">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-emerald-600 font-semibold">i</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-emerald-900 mb-1">Pricing Override System</h3>
                        <p className="text-sm text-emerald-800">
                            Set custom pricing for specific vehicle types and date ranges. Overrides will be highlighted in green when active.
                            Dynamic pricing engine integration is pending implementation.
                        </p>
                    </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                    <div className="text-sm text-slate-600 mb-1">Total Rules</div>
                    <div className="text-2xl font-bold text-slate-900">{pricingRules.length}</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                    <div className="text-sm text-slate-600 mb-1">Active Rules</div>
                    <div className="text-2xl font-bold text-emerald-600">
                        {pricingRules.filter(r => r.active).length}
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                    <div className="text-sm text-slate-600 mb-1">Average Override</div>
                    <div className="text-2xl font-bold text-slate-900">+8.5%</div>
                </div>
            </div>

            {/* Pricing Rules Table */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Pricing Rules</h2>
                <Table columns={columns} data={pricingRules} />
            </div>

            {/* Placeholder for add modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Add Pricing Rule</h3>
                        <p className="text-sm text-slate-600 mb-4">Pricing rule form would go here</p>
                        <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
