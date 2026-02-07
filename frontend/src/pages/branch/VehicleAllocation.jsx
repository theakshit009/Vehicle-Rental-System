import React, { useState } from 'react';
import { Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import Table from '../../components/ui/Table';
import AllocationStatus from '../../components/branch/AllocationStatus';
import VehicleAssignment from '../../components/vehicle/VehicleAssignment';
import Button from '../../components/ui/Button';

/**
 * VehicleAllocation Page - Assign vehicles to employees and bookings
 */
export default function VehicleAllocation() {
    const [assignmentModal, setAssignmentModal] = useState({ open: false, vehicle: null });

    // Mock allocation data
    const [allocations, setAllocations] = useState([
        {
            id: 'alloc-001',
            vehicleId: 'v-001',
            vehicle: 'Toyota Camry (ABC-1234)',
            allocation: {
                type: 'employee',
                assignedTo: 'Alice Johnson',
                startDate: '2026-02-07',
                endDate: '2026-02-14',
                status: 'active',
                hasConflict: false
            }
        },
        {
            id: 'alloc-002',
            vehicleId: 'v-002',
            vehicle: 'Honda Civic (XYZ-5678)',
            allocation: {
                type: 'booking',
                assignedTo: 'John Customer',
                startDate: '2026-02-05',
                endDate: '2026-02-12',
                status: 'active',
                hasConflict: false
            }
        },
        {
            id: 'alloc-003',
            vehicleId: 'v-004',
            vehicle: 'Ford Explorer (DEF-9012)',
            allocation: {
                type: 'employee',
                assignedTo: 'Bob Smith',
                startDate: '2026-02-10',
                endDate: '2026-02-15',
                status: 'upcoming',
                hasConflict: true
            }
        }
    ]);

    const columns = [
        {
            key: 'vehicle',
            label: 'Vehicle',
            sortable: true,
        },
        {
            key: 'allocation',
            label: 'Allocation Details',
            render: (_, row) => <AllocationStatus allocation={row.allocation} />
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (_, row) => (
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEdit(row)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleUnassign(row)}
                    >
                        Unassign
                    </Button>
                </div>
            )
        }
    ];

    const handleEdit = (allocation) => {
        console.log('Edit allocation:', allocation);
    };

    const handleUnassign = (allocation) => {
        console.log('Unassign:', allocation);
        setAllocations(allocations.filter(a => a.id !== allocation.id));
    };

    const mockEmployees = [
        { id: 'emp-001', name: 'Alice Johnson' },
        { id: 'emp-002', name: 'Bob Smith' },
        { id: 'emp-003', name: 'Carol Davis' }
    ];

    const mockVehicle = {
        id: 'v-001',
        make: 'Toyota',
        model: 'Camry'
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Vehicle Allocation</h1>
                    <p className="text-slate-600 mt-1">Manage vehicle assignments to employees and bookings</p>
                </div>
                <Button
                    variant="primary"
                    onClick={() => setAssignmentModal({ open: true, vehicle: mockVehicle })}
                >
                    New Allocation
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900">
                                {allocations.filter(a => a.allocation.status === 'active').length}
                            </div>
                            <div className="text-sm text-slate-600">Active Allocations</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900">
                                {allocations.filter(a => a.allocation.status === 'upcoming').length}
                            </div>
                            <div className="text-sm text-slate-600">Upcoming</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900">
                                {allocations.filter(a => a.allocation.hasConflict).length}
                            </div>
                            <div className="text-sm text-slate-600">Conflicts</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Allocations Table */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Current Allocations</h2>
                <Table columns={columns} data={allocations} />
            </div>

            {/* Assignment Modal */}
            <VehicleAssignment
                isOpen={assignmentModal.open}
                vehicle={assignmentModal.vehicle}
                employees={mockEmployees}
                onAssign={(data) => {
                    console.log('New allocation:', data);
                    setAssignmentModal({ open: false, vehicle: null });
                }}
                onClose={() => setAssignmentModal({ open: false, vehicle: null })}
            />
        </div>
    );
}
