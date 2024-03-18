import createStore, { create } from "zustand";
export type Types = "success" | "warning" | "error";
export type ModalProps = {
  isShow?: boolean;
  type?: Types;
  message?: string;
};
export type ModalStore = {
  current: ModalProps | null;
  setModalMessage: (item: ModalProps) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  current: {
    isShow: false,
    type: "success",
    message: "Success",
  },
  setModalMessage(value: ModalProps) {
    set({
      current: value,
    });

    setTimeout(() => {
      set({ current: { isShow: false } });
    }, 10000);
  },
}));
