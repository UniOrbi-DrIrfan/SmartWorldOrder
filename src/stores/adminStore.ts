import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminStore {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const ADMIN_PASSWORD = "1122";

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (password: string) => {
        if (password === ADMIN_PASSWORD) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    { name: "swo-admin" }
  )
);
