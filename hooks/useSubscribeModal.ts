import { create } from "zustand";

interface subscribeStore {
    data: string;
    isOpen: boolean;
    onOpen: (data?: string) => void;
    onClose: () => void;
}

const useSubscribeModal = create<subscribeStore>((set) => ({
    data: "",
    isOpen: false,
    onOpen: (data) => set({ isOpen: true, data: data }),
    onClose: () => set({ isOpen: false }),
}));

export default useSubscribeModal;
