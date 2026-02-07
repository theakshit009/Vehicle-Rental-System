import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            // State
            user: null,
            token: null,
            isAuthenticated: false,

            // Actions
            login: (userData, authToken) => {
                localStorage.setItem('authToken', authToken);
                set({
                    user: userData,
                    token: authToken,
                    isAuthenticated: true,
                });
            },

            logout: () => {
                localStorage.removeItem('authToken');
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                });
            },

            updateProfile: (updates) => {
                set((state) => ({
                    user: {
                        ...state.user,
                        ...updates,
                    },
                }));
            },

            // Mock login for testing
            mockLogin: () => {
                const mockUser = {
                    id: 'user_123',
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    phone: '+91 98765 43210',
                    loyaltyPoints: 1250,
                    documents: {
                        license: 'DL1234567890',
                        verification: 'Verified',
                    },
                };
                const mockToken = 'mock_token_' + Date.now();

                localStorage.setItem('authToken', mockToken);
                set({
                    user: mockUser,
                    token: mockToken,
                    isAuthenticated: true,
                });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
