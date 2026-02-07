// Employee roles enum
export const EMPLOYEE_ROLES = {
    DRIVER: 'driver',
    STAFF: 'staff',
    SUPPORT: 'support',
};

// Shift status enum
export const SHIFT_STATUS = {
    NOT_STARTED: 'not_started',
    ACTIVE: 'active',
    ON_BREAK: 'on_break',
    PAUSED: 'paused',
    ENDED: 'ended',
};

// GPS status enum
export const GPS_STATUS = {
    ACTIVE: 'active',
    PAUSED: 'paused',
    OFFLINE: 'offline',
};

// Vehicle check status enum
export const VEHICLE_CHECK_STATUS = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    FAILED: 'failed',
};

// Document status enum
export const DOCUMENT_STATUS = {
    PENDING: 'pending',
    UPLOADED: 'uploaded',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
};

// Issue status enum
export const ISSUE_STATUS = {
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
};

// Inspection status enum
export const INSPECTION_STATUS = {
    PASS: 'pass',
    FAIL: 'fail',
    NEEDS_ATTENTION: 'needs_attention',
};

// Mock employee accounts for testing
export const MOCK_EMPLOYEES = {
    driver: {
        id: 'EMP001',
        email: 'demo-driver@company.com',
        password: 'driver123',
        name: 'Rajesh Kumar',
        role: EMPLOYEE_ROLES.DRIVER,
        phone: '+91 98765 43210',
        branch: 'Delhi Central',
        joinDate: '2024-01-15',
        employeeId: 'DRV-2024-001',
        licenseNumber: 'DL-1420110012345',
        avatar: null,
    },
    staff: {
        id: 'EMP002',
        email: 'demo-staff@company.com',
        password: 'staff123',
        name: 'Priya Sharma',
        role: EMPLOYEE_ROLES.STAFF,
        phone: '+91 98765 43211',
        branch: 'Mumbai West',
        joinDate: '2023-06-10',
        employeeId: 'STF-2023-045',
        avatar: null,
    },
    support: {
        id: 'EMP003',
        email: 'demo-support@company.com',
        password: 'support123',
        name: 'Amit Patel',
        role: EMPLOYEE_ROLES.SUPPORT,
        phone: '+91 98765 43212',
        branch: 'Bangalore Tech',
        joinDate: '2023-03-20',
        employeeId: 'SUP-2023-012',
        avatar: null,
    },
};
