import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChildProfile {
  nickname: string;
  avatarId: string;
  grade: 2 | 3;
}

export interface ProgressState {
  profile: ChildProfile | null;
  stars: number;
  feathers: number;
  streakDays: number;
  lastActiveDate: string;
  completedUnits: string[];
  currentUnitId: string;
  savedWordIds: string[];
  setProfile: (profile: ChildProfile) => void;
  completeUnit: (unitId: string, earnedStars?: number) => void;
  setCurrentUnitId: (unitId: string) => void;
  toggleSavedWord: (wordId: string) => void;
  recordDailyVisit: () => void;
  resetProgress: () => void;
}

function getTodayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      profile: null,
      stars: 0,
      feathers: 0,
      streakDays: 1,
      lastActiveDate: getTodayIso(),
      completedUnits: [],
      currentUnitId: 'g2-u1',
      savedWordIds: [],
      setProfile: (profile) =>
        set((state) => ({
          profile,
          currentUnitId:
            state.completedUnits.length === 0
              ? profile.grade === 3
                ? 'g3-u1'
                : 'g2-u1'
              : state.currentUnitId,
        })),
      completeUnit: (unitId, earnedStars = 3) =>
        set((state) => {
          const alreadyDone = state.completedUnits.includes(unitId);
          const nextCompleted = alreadyDone
            ? state.completedUnits
            : [...state.completedUnits, unitId];
          return {
            completedUnits: nextCompleted,
            stars: state.stars + earnedStars,
            feathers: Math.min(20, nextCompleted.length),
          };
        }),
      setCurrentUnitId: (currentUnitId) => set({ currentUnitId }),
      toggleSavedWord: (wordId) =>
        set((state) => {
          const exists = state.savedWordIds.includes(wordId);
          return {
            savedWordIds: exists
              ? state.savedWordIds.filter((id) => id !== wordId)
              : [...state.savedWordIds, wordId],
          };
        }),
      recordDailyVisit: () => {
        const today = getTodayIso();
        const prev = get().lastActiveDate;
        if (prev === today) return;
        const prevDate = new Date(prev);
        const todayDate = new Date(today);
        const diffDays = Math.round((todayDate.getTime() - prevDate.getTime()) / 86400000);
        set((state) => ({
          lastActiveDate: today,
          streakDays: diffDays === 1 ? state.streakDays + 1 : 1,
        }));
      },
      resetProgress: () =>
        set({
          profile: null,
          stars: 0,
          feathers: 0,
          streakDays: 1,
          lastActiveDate: getTodayIso(),
          completedUnits: [],
          currentUnitId: 'g2-u1',
          savedWordIds: [],
        }),
    }),
    {
      name: 'sehrli-til-progress',
    }
  )
);
