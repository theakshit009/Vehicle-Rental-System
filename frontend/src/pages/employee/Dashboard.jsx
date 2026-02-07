import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Play, Square, Clock, CarFront, Navigation,
    AlertCircle, CheckCircle, FileText, Coffee
} from 'lucide-react';
import useEmployeeStore from '../../store/employee.store';
import useShiftStore from '../../store/shift.store';
import { employeeService } from '../../services/employee.service';
import { EMPLOYEE_ROLES, SHIFT_STATUS } from '../../utils/employeeConstants';
import Button from '../../components/ui/Button';
import ShiftStatus from '../../components/employee/ShiftStatus';
import EmployeeCard from '../../components/employee/EmployeeCard';
import StatusPill from '../../components/ui/StatusPill';
import GPSStatus from '../../components/employee/GPSStatus';
import { gpsService } from '../../services/gps.service';

const Dashboard = () => {
    const { employee, isDriver, isStaff, isSupport } = useEmployeeStore();
    const { currentShift, startShift, endShift, startBreak, endBreak, isOnBreak, getShiftStatus } = useShiftStore();
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [gpsStatus, setGpsStatus] = useState(gpsService.getStatus());

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setLoading(false);
        if (employee) {
            const tasksResult = await employeeService.getAssignedTasks(employee.id, employee.role);
            if (tasksResult.success) {
                setTasks(tasksResult.data);
            }
        }
    };

    const handleStartShift = () => {
        startShift();
        gpsService.startTracking().then(() => {
            setGpsStatus(gpsService.getStatus());
        });
    };

    const handleEndShift = () => {
        endShift();
        gpsService.stopTracking().then(() => {
            setGpsStatus(gpsService.getStatus());
        });
    };

    const shiftStatus = getShiftStatus();

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-600 mt-1">Welcome back, {employee?.name}</p>
                </div>
            </div>

            {/* Employee Info Card */}
            <EmployeeCard employee={employee} showDetails={false} />

            {/* Quick Actions */}
            {isDriver() && (
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <Clock className="text-orange-600" size={20} />
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {shiftStatus === SHIFT_STATUS.NOT_STARTED ? (
                            <Button
                                icon={<Play size={18} />}
                                onClick={handleStartShift}
                                className="bg-orange-600 hover:bg-orange-700 text-white"
                            >
                                Start Shift
                            </Button>
                        ) : shiftStatus === SHIFT_STATUS.ACTIVE && !isOnBreak() ? (
                            <>
                                <Button
                                    icon={<Coffee size={18} />}
                                    onClick={startBreak}
                                    variant="outline"
                                >
                                    Take Break
                                </Button>
                                <Button
                                    icon={<Square size={18} />}
                                    onClick={handleEndShift}
                                    variant="danger"
                                >
                                    End Shift
                                </Button>
                            </>
                        ) : isOnBreak() ? (
                            <Button
                                icon={<Play size={18} />}
                                onClick={endBreak}
                                className="bg-orange-600 hover:bg-orange-700 text-white"
                            >
                                End Break
                            </Button>
                        ) : null}

                        <Link to="/employee/check-in-out">
                            <Button icon={<CarFront size={18} />} variant="outline" fullWidth>
                                Check-In Vehicle
                            </Button>
                        </Link>
                        <Link to="/employee/tracking">
                            <Button icon={<Navigation size={18} />} variant="outline" fullWidth>
                                GPS Tracking
                            </Button>
                        </Link>
                    </div>
                </div>
            )}

            {/* Shift Status & GPS (Driver) */}
            {isDriver() && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ShiftStatus />
                    <div className="bg-white rounded-xl border border-slate-200 p-4">
                        <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Navigation className="text-orange-600" size={18} />
                            GPS Tracking
                        </h3>
                        <GPSStatus status={gpsStatus} lastUpdate="just now" />
                        <Link to="/employee/tracking" className="mt-3 block">
                            <Button variant="outline" fullWidth size="sm">
                                View Live Map
                            </Button>
                        </Link>
                    </div>
                </div>
            )}

            {/* Assigned Tasks */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                    {isDriver() && 'Assigned Trips'}
                    {isStaff() && 'Pending Tasks'}
                    {isSupport() && 'Open Issues'}
                </h2>

                {tasks.length > 0 ? (
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-orange-200 transition-colors"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-medium text-slate-900">
                                            {task.customerName || task.vehicleName || task.issue}
                                        </h4>
                                        <StatusPill
                                            status={task.status}
                                            variant={task.priority === 'urgent' ? 'danger' : 'warning'}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-600">
                                        {task.location || task.type} {task.time && `• ${task.time}`}
                                    </p>
                                </div>
                                <Button size="sm" variant="outline">
                                    View Details
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                        <p className="text-slate-600">No pending tasks!</p>
                        <p className="text-sm text-slate-500 mt-1">You're all caught up.</p>
                    </div>
                )}
            </div>

            {/* Documents CTA */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <FileText className="text-orange-600 flex-shrink-0" size={24} />
                    <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">Complete Your Onboarding</h3>
                        <p className="text-sm text-slate-600 mb-3">
                            Ensure all required documents are uploaded and verified.
                        </p>
                        <Link to="/employee/documents">
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                                View Documents
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
