import createStore, { create } from "zustand";

export type LoaderStore = {
  isLoadingState: boolean;
  setLoading: (e: boolean) => void;
};

export const useLoaderStore = create<LoaderStore>((set) => ({
  isLoadingState: false,
  setLoading(value) {
    set({ isLoadingState: value });
  },
}));
