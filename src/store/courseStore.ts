import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TheoryPoint {
  id: string;
  text: string;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
}

export interface Day {
  id: number;
  title: string;
  level: 'Cơ bản' | 'Chuyên sâu' | 'Senior';
  theory: TheoryPoint[];
  labs: Lab[];
}

interface CourseState {
  days: Day[];
  setDays: (days: Day[]) => void;
  updateDay: (id: number, day: Partial<Day>) => void;
  addTheoryPoint: (dayId: number, text: string) => void;
  updateTheoryPoint: (dayId: number, pointId: string, text: string) => void;
  removeTheoryPoint: (dayId: number, pointId: string) => void;
  addLab: (dayId: number, title: string, description: string) => void;
  updateLab: (dayId: number, labId: string, title: string, description: string) => void;
  removeLab: (dayId: number, labId: string) => void;
}

// Initial empty course data
const initialDays: Day[] = [];

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      days: initialDays,
      setDays: (days) => set({ days }),
      updateDay: (id, updatedDay) => {
        const days = get().days;
        const dayIndex = days.findIndex(day => day.id === id);
        if (dayIndex !== -1) {
          const newDays = [...days];
          newDays[dayIndex] = { ...newDays[dayIndex], ...updatedDay };
          set({ days: newDays });
        }
      },
      addTheoryPoint: (dayId, text) => {
        const days = get().days;
        const dayIndex = days.findIndex(day => day.id === dayId);
        if (dayIndex !== -1) {
          const newDays = [...days];
          const newPoint = { id: `t${dayId}-${Date.now()}`, text };
          newDays[dayIndex] = {
            ...newDays[dayIndex],
            theory: [...newDays[dayIndex].theory, newPoint]
          };
          set({ days: newDays });
        }
      },
      updateTheoryPoint: (dayId, pointId, text) => {
        const days = get().days;
        const dayIndex = days.findIndex(day => day.id === dayId);
        if (dayIndex !== -1) {
          const theoryPoints = days[dayIndex].theory;
          const pointIndex = theoryPoints.findIndex(point => point.id === pointId);
          if (pointIndex !== -1) {
            const newDays = [...days];
            const newTheory = [...theoryPoints];
            newTheory[pointIndex] = { ...newTheory[pointIndex], text };
            newDays[dayIndex] = { ...newDays[dayIndex], theory: newTheory };
            set({ days: newDays });
          }
        }
      },
      removeTheoryPoint: (dayId, pointId) => {
        const days = get().days;
        const dayIndex = days.findIndex(day => day.id === dayId);
        if (dayIndex !== -1) {
          const newDays = [...days];
          newDays[dayIndex] = {
            ...newDays[dayIndex],
            theory: newDays[dayIndex].theory.filter(point => point.id !== pointId)
          };
          set({ days: newDays });
        }
      },
      addLab: (dayId, title, description) => {
        const days = get().days;
        const dayIndex = days.findIndex(day => day.id === dayId);
        if (dayIndex !== -1) {
          const newDays = [...days];
          const newLab = { id: `l${dayId}-${Date.now()}`, title, description };
          newDays[dayIndex] = {
            ...newDays[dayIndex],
            labs: [...newDays[dayIndex].labs, newLab]
          };
          set({ days: newDays });
        }
      },
      updateLab: (dayId, labId, title, description) => {
        const days = get().days;
        const dayIndex = days.findIndex(day => day.id === dayId);
        if (dayIndex !== -1) {
          const labs = days[dayIndex].labs;
          const labIndex = labs.findIndex(lab => lab.id === labId);
          if (labIndex !== -1) {
            const newDays = [...days];
            const newLabs = [...labs];
            newLabs[labIndex] = { ...newLabs[labIndex], title, description };
            newDays[dayIndex] = { ...newDays[dayIndex], labs: newLabs };
            set({ days: newDays });
          }
        }
      },
      removeLab: (dayId, labId) => {
        const days = get().days;
        const dayIndex = days.findIndex(day => day.id === dayId);
        if (dayIndex !== -1) {
          const newDays = [...days];
          newDays[dayIndex] = {
            ...newDays[dayIndex],
            labs: newDays[dayIndex].labs.filter(lab => lab.id !== labId)
          };
          set({ days: newDays });
        }
      },
    }),
    {
      name: 'course-storage',
    }
  )
);
