import { create } from 'zustand';
import { SHIFT_STATUS } from '../utils/employeeConstants';

const useShiftStore = create((set, get) => ({
    // State
    currentShift: null,
    shiftHistory: [],
    breakStartTime: null,

    // Actions
    startShift: () => {
        const now = new Date();
        const shift = {
            id: `SHIFT-${Date.now()}`,
            startTime: now.toISOString(),
            endTime: null,
            status: SHIFT_STATUS.ACTIVE,
            breaks: [],
            totalBreakDuration: 0,
        };

        set({
            currentShift: shift,
        });

        return shift;
    },

    endShift: () => {
        const { currentShift, shiftHistory } = get();

        if (!currentShift) return null;

        const now = new Date();
        const endedShift = {
            ...currentShift,
            endTime: now.toISOString(),
            status: SHIFT_STATUS.ENDED,
        };

        set({
            currentShift: null,
            shiftHistory: [endedShift, ...shiftHistory],
            breakStartTime: null,
        });

        return endedShift;
    },

    startBreak: () => {
        const { currentShift } = get();

        if (!currentShift) return;

        set({
            currentShift: {
                ...currentShift,
                status: SHIFT_STATUS.ON_BREAK,
            },
            breakStartTime: new Date().toISOString(),
        });
    },

    endBreak: () => {
        const { currentShift, breakStartTime } = get();

        if (!currentShift || !breakStartTime) return;

        const now = new Date();
        const breakDuration = now - new Date(breakStartTime);
        const breakRecord = {
            startTime: breakStartTime,
            endTime: now.toISOString(),
            duration: breakDuration,
        };

        set({
            currentShift: {
                ...currentShift,
                status: SHIFT_STATUS.ACTIVE,
                breaks: [...(currentShift.breaks || []), breakRecord],
                totalBreakDuration: (currentShift.totalBreakDuration || 0) + breakDuration,
            },
            breakStartTime: null,
        });
    },

    pauseShift: () => {
        const { currentShift } = get();

        if (!currentShift) return;

        set({
            currentShift: {
                ...currentShift,
                status: SHIFT_STATUS.PAUSED,
            },
        });
    },

    resumeShift: () => {
        const { currentShift } = get();

        if (!currentShift) return;

        set({
            currentShift: {
                ...currentShift,
                status: SHIFT_STATUS.ACTIVE,
            },
        });
    },

    // Derived selectors
    isOnBreak: () => {
        const { currentShift } = get();
        return currentShift?.status === SHIFT_STATUS.ON_BREAK;
    },

    activeShiftDuration: () => {
        const { currentShift } = get();

        if (!currentShift || !currentShift.startTime) return 0;

        const start = new Date(currentShift.startTime);
        const now = new Date();
        return now - start - (currentShift.totalBreakDuration || 0);
    },

    getShiftStatus: () => {
        const { currentShift } = get();
        return currentShift?.status || SHIFT_STATUS.NOT_STARTED;
    },
}));

export default useShiftStore;
