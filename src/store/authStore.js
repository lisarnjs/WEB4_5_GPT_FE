import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: null,
  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
    set({ accessToken: token });
  },
}));

export default useAuthStore;
