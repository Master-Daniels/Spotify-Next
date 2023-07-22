import { create } from "zustand";

interface AuthModelStore {
    data: string;
    isOpen: boolean;
    onOpen: (data?: string) => void;
    onClose: () => void;
}

const useAuthModal = create<AuthModelStore>((set) => ({
    data: "",
    isOpen: false,
    onOpen: (data) => set({ isOpen: true, data: data }),
    onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
