import {create } from "zustand";
interface Navstate {
    isShowing: boolean;
    setIsShowing: (isShowing: boolean) => void;
}
const useNavStore = create<Navstate>((set) => ({
    isShowing: true,
    setIsShowing: (isShowing: boolean) => set({ isShowing }),
}));
export default useNavStore;