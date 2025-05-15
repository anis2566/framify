import { create } from "zustand";

interface DeleteFrameState {
    isOpen: boolean;
    frameId: string;
    onOpen: (id: string) => void;
    onClose: () => void;
}

export const useFrameDelete = create<DeleteFrameState>((set) => ({
    isOpen: false,
    frameId: "",
    onOpen: (id: string) => set({ isOpen: true, frameId: id }),
    onClose: () => set({ isOpen: false, frameId: "" }),
}));
