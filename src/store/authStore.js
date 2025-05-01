import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null, // 로그인 시 setUser({ id: 1, role: "PROFESSOR", name: "홍길동" })처럼 저장
  accessToken: null,
  actions: {
    setAccessToken: (token) => {
      localStorage.setItem("accessToken", token);
      set({ accessToken: token });
    },
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
  },
}));

export default useAuthStore;
