// Employee Service - Employee-related operations
// Mock service for employee data and operations

export const employeeService = {
    // Get employee profile
    getProfile: async (employeeId) => {
        await new Promise((resolve) => setTimeout(resolve, 300));

        return {
            success: true,
            data: {
                id: employeeId,
                // Profile data would come from store
            },
        };
    },

    // Get assigned tasks
    getAssignedTasks: async (employeeId, role) => {
        await new Promise((resolve) => setTimeout(resolve, 400));

        // Mock tasks based on role
        const mockTasks = {
            driver: [
                {
                    id: 'TASK-001',
                    type: 'pickup',
                    customerName: 'Ankit Verma',
                    vehicleId: 'VEH-123',
                    vehicleName: 'Toyota Innova',
                    location: 'Connaught Place, Delhi',
                    time: '10:00 AM',
                    status: 'pending',
                },
                {
                    id: 'TASK-002',
                    type: 'dropoff',
                    customerName: 'Sneha Kapoor',
                    vehicleId: 'VEH-456',
                    vehicleName: 'Honda City',
                    location: 'Airport Terminal 3',
                    time: '2:30 PM',
                    status: 'pending',
                },
            ],
            staff: [
                {
                    id: 'TASK-003',
                    type: 'inspection',
                    vehicleId: 'VEH-789',
                    vehicleName: 'Mahindra XUV700',
                    priority: 'high',
                    status: 'pending',
                },
                {
                    id: 'TASK-004',
                    type: 'handover',
                    customerName: 'Rahul Singh',
                    vehicleId: 'VEH-321',
                    vehicleName: 'Hyundai Creta',
                    status: 'pending',
                },
            ],
            support: [
                {
                    id: 'ISSUE-001',
                    type: 'complaint',
                    customerId: 'CUST-123',
                    customerName: 'Priya Mehta',
                    issue: 'Vehicle breakdown',
                    priority: 'urgent',
                    status: 'open',
                },
                {
                    id: 'ISSUE-002',
                    type: 'query',
                    customerId: 'CUST-456',
                    customerName: 'Arjun Nair',
                    issue: 'Extension request',
                    priority: 'medium',
                    status: 'in_progress',
                },
            ],
        };

        return {
            success: true,
            data: mockTasks[role] || [],
        };
    },

    // Update shift status (placeholder for automation)
    updateShiftStatus: async (employeeId, status) => {
        await new Promise((resolve) => setTimeout(resolve, 200));

        return {
            success: true,
            message: 'Shift status updated',
        };
    },

    // Auto-assign shift (automation hook - no logic)
    autoAssignShift: async (employeeId) => {
        // Placeholder for future automated shift assignment
        console.log('Auto-assign shift hook called for:', employeeId);

        return {
            success: true,
            message: 'Auto-assignment hook ready (not implemented)',
        };
    },

    // Predictive route optimization (automation hook - no logic)
    optimizeRoute: async (tasks) => {
        // Placeholder for future route optimization algorithm
        console.log('Route optimization hook called for tasks:', tasks);

        return {
            success: true,
            message: 'Route optimization hook ready (not implemented)',
            optimizedRoute: tasks, // Return unchanged for now
        };
    },
};

export default employeeService;
