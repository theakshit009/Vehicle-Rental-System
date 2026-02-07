import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_EMPLOYEES, EMPLOYEE_ROLES } from '../utils/employeeConstants';

const useEmployeeStore = create(
    persist(
        (set, get) => ({
            // State
            employee: null,
            isAuthenticated: false,
            role: null,

            // Actions
            login: (email, password) => {
                // Find employee in mock data
                const employee = Object.values(MOCK_EMPLOYEES).find(
                    (emp) => emp.email === email && emp.password === password
                );

                if (employee) {
                    set({
                        employee,
                        isAuthenticated: true,
                        role: employee.role,
                    });
                    return { success: true, employee };
                }

                return { success: false, error: 'Invalid credentials' };
            },

            logout: () => {
                set({
                    employee: null,
                    isAuthenticated: false,
                    role: null,
                });
            },

            updateProfile: (updates) => {
                const { employee } = get();
                if (employee) {
                    set({
                        employee: { ...employee, ...updates },
                    });
                }
            },

            // Derived selectors (memoized)
            isDriver: () => get().role === EMPLOYEE_ROLES.DRIVER,
            isStaff: () => get().role === EMPLOYEE_ROLES.STAFF,
            isSupport: () => get().role === EMPLOYEE_ROLES.SUPPORT,

            // Check if employee is currently on shift
            isOnShift: () => {
                // This will be connected to shift store
                return false; // Placeholder
            },

            // Check if employee has assigned vehicle
            hasAssignedVehicle: () => {
                // This will be connected to vehicle store
                return false; // Placeholder
            },
        }),
        {
            name: 'employee-storage',
            partialize: (state) => ({
                employee: state.employee,
                isAuthenticated: state.isAuthenticated,
                role: state.role,
            }),
        }
    )
);

export default useEmployeeStore;
