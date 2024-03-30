import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}));

export default useSidebarStore;
