import React, { useState } from 'react';
import { UserCircle, Clock, Car, AlertCircle } from 'lucide-react';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

/**
 * Employees Page - View and manage branch employees (branch-scoped)
 * Note: Onboarding is handled by Employee module, not here
 */
export default function Employees() {
    const [employees, setEmployees] = useState([
        {
            id: 'emp-001',
            name: 'Alice Johnson',
            role: 'Staff',
            shift: 'Morning (6 AM - 2 PM)',
            shiftStatus: 'active',
            assignedVehicles: ['Toyota Camry', 'Honda Civic'],
            assignedCount: 2,
            issues: 0
        },
        {
            id: 'emp-002',
            name: 'Bob Smith',
            role: 'Staff',
            shift: 'Afternoon (2 PM - 10 PM)',
            shiftStatus: 'active',
            assignedVehicles: ['Ford Explorer'],
            assignedCount: 1,
            issues: 0
        },
        {
            id: 'emp-003',
            name: 'Carol Davis',
            role: 'Staff',
            shift: 'Morning (6 AM - 2 PM)',
            shiftStatus: 'off-duty',
            assignedVehicles: [],
            assignedCount: 0,
            issues: 1
        },
        {
            id: 'emp-004',
            name: 'David Wilson',
            role: 'Senior Staff',
            shift: 'Full Day (6 AM - 6 PM)',
            shiftStatus: 'active',
            assignedVehicles: ['Tesla Model 3', 'BMW X5', 'Audi A4'],
            assignedCount: 3,
            issues: 0
        }
    ]);

    const columns = [
        {
            key: 'name',
            label: 'Employee',
            sortable: true,
            render: (_, row) => (
                <div className="flex items-center gap-3">
                    <UserCircle className="w-8 h-8 text-slate-400" />
                    <div>
                        <div className="font-medium text-slate-900">{row.name}</div>
                        <div className="text-xs text-slate-600">{row.role}</div>
                    </div>
                </div>
            )
        },
        {
            key: 'shift',
            label: 'Shift',
            render: (_, row) => (
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <div>
                        <div className="text-sm text-slate-700">{row.shift}</div>
                        <Badge variant={row.shiftStatus === 'active' ? 'success' : 'neutral'} className="mt-1">
                            {row.shiftStatus === 'active' ? 'On Duty' : 'Off Duty'}
                        </Badge>
                    </div>
                </div>
            )
        },
        {
            key: 'assignedVehicles',
            label: 'Assigned Vehicles',
            render: (_, row) => (
                <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-slate-400" />
                    <div>
                        <div className="font-semibold text-slate-900">{row.assignedCount}</div>
                        {row.assignedCount > 0 && (
                            <div className="text-xs text-slate-600 mt-0.5">
                                {row.assignedVehicles.slice(0, 2).join(', ')}
                                {row.assignedCount > 2 && ` +${row.assignedCount - 2} more`}
                            </div>
                        )}
                    </div>
                </div>
            )
        },
        {
            key: 'issues',
            label: 'Issues',
            render: (value) => (
                value > 0 ? (
                    <div className="flex items-center gap-1 text-amber-700">
                        <AlertCircle className="w-4 h-4" />
                        <span className="font-medium">{value}</span>
                    </div>
                ) : (
                    <span className="text-emerald-600 font-medium">✓ None</span>
                )
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
                        onClick={() => handleReassign(row)}
                    >
                        Reassign
                    </Button>
                    <Button
                        size="sm"
                        variant={row.issues > 0 ? 'warning' : 'secondary'}
                        onClick={() => handleFlagIssue(row)}
                    >
                        {row.issues > 0 ? 'View Issue' : 'Flag Issue'}
                    </Button>
                </div>
            )
        }
    ];

    const handleReassign = (employee) => {
        console.log('Reassign vehicles for:', employee.name);
        // TODO: Open reassignment modal
    };

    const handleFlagIssue = (employee) => {
        console.log('Flag/view issue for:', employee.name);
        // TODO: Open issue modal
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Branch Employees</h1>
                    <p className="text-slate-600 mt-1">View and manage employees in your branch</p>
                </div>
            </div>

            {/* Info Alert */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                    <div className="shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">i</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-blue-900 mb-1">Employee Management Scope</h3>
                        <p className="text-sm text-blue-800">
                            This view shows employees assigned to your branch. For onboarding, shift scheduling,
                            and detailed employee management, use the Employee Module.
                        </p>
                    </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                    <div className="text-sm text-slate-600 mb-1">Total Employees</div>
                    <div className="text-2xl font-bold text-slate-900">{employees.length}</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                    <div className="text-sm text-slate-600 mb-1">On Duty</div>
                    <div className="text-2xl font-bold text-emerald-600">
                        {employees.filter(e => e.shiftStatus === 'active').length}
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                    <div className="text-sm text-slate-600 mb-1">Total Vehicles Assigned</div>
                    <div className="text-2xl font-bold text-slate-900">
                        {employees.reduce((sum, e) => sum + e.assignedCount, 0)}
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                    <div className="text-sm text-slate-600 mb-1">Active Issues</div>
                    <div className="text-2xl font-bold text-amber-600">
                        {employees.reduce((sum, e) => sum + e.issues, 0)}
                    </div>
                </div>
            </div>

            {/* Employees Table */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Employee List</h2>
                <Table columns={columns} data={employees} />
            </div>
        </div>
    );
}
