import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null, // 로그인 시 setUser({ id: 1, role: "PROFESSOR", email: "email" })처럼 저장
  accessToken: null,
  actions: {
    setAccessToken: (token, role) => {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("role", role);
      // set({ accessToken: token });
    },
    setUser: (user) => set({ user }),
    setLogout: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      set({ user: null });
    },
  },
}));

export default useAuthStore;
