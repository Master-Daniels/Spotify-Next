import { create } from "zustand";

interface UploadModelStore {
    data: string;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useUploadModal = create<UploadModelStore>((set) => ({
    data: "",
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useUploadModal;
