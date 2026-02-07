import React, { useState } from 'react';
import { Calendar, User, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

/**
 * VehicleAssignment - Vehicle assignment form/modal
 * @param {Object} vehicle - Vehicle to assign
 * @param {Array} employees - Available employees
 * @param {Function} onAssign - Assignment submission handler
 * @param {Function} onClose - Modal close handler
 * @param {Boolean} isOpen - Modal open state
 */
export default function VehicleAssignment({ vehicle, employees = [], onAssign, onClose, isOpen }) {
    const [formData, setFormData] = useState({
        assignedTo: '',
        assignmentType: 'employee',
        startDate: '',
        endDate: '',
        notes: ''
    });

    const [hasConflict, setHasConflict] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAssign?.({ ...formData, vehicleId: vehicle.id });
        onClose?.();
    };

    // Simulate conflict check
    const checkConflict = () => {
        // Placeholder: Would check against existing allocations
        const randomCheck = Math.random() > 0.8;
        setHasConflict(randomCheck);
    };

    React.useEffect(() => {
        if (formData.startDate && formData.endDate) {
            checkConflict();
        }
    }, [formData.startDate, formData.endDate]);

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Assign ${vehicle?.make} ${vehicle?.model}`}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {hasConflict && (
                    <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
                        <AlertTriangle className="w-5 h-5" />
                        <span>Warning: Potential scheduling conflict detected</span>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Assignment Type
                    </label>
                    <select
                        value={formData.assignmentType}
                        onChange={(e) => setFormData({ ...formData, assignmentType: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                        <option value="employee">Employee</option>
                        <option value="booking">Client Booking</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Assign To
                    </label>
                    <select
                        value={formData.assignedTo}
                        onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                    >
                        <option value="">Select {formData.assignmentType === 'employee' ? 'employee' : 'booking'}</option>
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            End Date
                        </label>
                        <input
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Notes (Optional)
                    </label>
                    <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        rows="3"
                    />
                </div>

                <div className="flex gap-3 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" className="flex-1">
                        Assign Vehicle
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
