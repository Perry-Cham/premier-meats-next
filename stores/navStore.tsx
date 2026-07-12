import { create } from "zustand";
interface NavState {
  isShowing: boolean;
  setIsShowing: (isShowing: boolean) => void;
}
const useNavStore = create<NavState>((set) => ({
  isShowing: true,
  setIsShowing: (isShowing: boolean) => set({ isShowing }),
}));

export { useNavStore }
export default useNavStore;
