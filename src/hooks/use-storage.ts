import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
    fileUrl: string;
    setFileUrl: (fileUrl: string) => void;
    removeFileUrl: () => void;
    shouldRender: boolean;
    setShouldRender: (shouldRender: boolean) => void;
}

export const useStorage = create<AuthState>()(
    persist(
        (set) => ({
            fileUrl: "",
            setFileUrl: (fileUrl) => set(() => ({ fileUrl: fileUrl })),
            removeFileUrl: () => set(() => ({ fileUrl: "" })),
            shouldRender: false,
            setShouldRender: (shouldRender) => set(() => ({ shouldRender: shouldRender })),
        }),
        {
            name: "user-auth",
            storage: createJSONStorage(() => localStorage),
        }
    )
);