import { create } from 'zustand';

/**
 * Branch Store - Manages branch context and user role
 */
const useBranchStore = create((set) => ({
    // Current branch information
    currentBranch: {
        id: 'branch-001',
        name: 'Downtown Branch',
        location: 'Los Angeles, CA',
        status: 'operational',
        vehicleCount: 48,
        staffCount: 12,
        utilization: 78
    },

    // User role in branch module
    userRole: 'manager', // 'manager' or 'staff'

    // User info
    user: {
        id: 'user-001',
        name: 'John Doe',
        email: 'john.doe@branch.com',
        role: 'Branch Manager'
    },

    // Actions
    setCurrentBranch: (branch) => set({ currentBranch: branch }),

    setUserRole: (role) => set({ userRole: role }),

    updateBranchStats: (stats) => set((state) => ({
        currentBranch: { ...state.currentBranch, ...stats }
    })),

    // Mock: Switch between manager and staff role
    toggleRole: () => set((state) => ({
        userRole: state.userRole === 'manager' ? 'staff' : 'manager',
        user: {
            ...state.user,
            role: state.userRole === 'manager' ? 'Branch Staff' : 'Branch Manager'
        }
    }))
}));

export default useBranchStore;
