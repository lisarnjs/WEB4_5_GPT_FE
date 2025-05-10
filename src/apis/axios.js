import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터: 항상 최신 accessToken 사용
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 401-1 에러 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401-1 에러 && 첫 시도일 때
    if (error.response?.data?.code === "401-1" && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 1. 리프레시 토큰 요청
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/members/refresh`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // 쿠키 전송 필수
          }
        );

        // 2. 새 accessToken 저장
        if (data.code === 200) {
          localStorage.setItem("accessToken", data.data.accessToken);

          // 3. 원본 요청 재시도 설정
          originalRequest.withCredentials = true; // 쿠키 전송 보장
          return axiosInstance(originalRequest); // 인터셉터가 새 토큰 적용
        }
        throw new Error("토큰 갱신 실패");
      } catch (refreshError) {
        // 리프레시 실패시 처리 (로그아웃 등)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        window.location.href = "/"; // 로그인 페이지로 이동
        console.log(refreshError);
        return Promise.reject(refreshError);
      }
    }

    // 다른 에러는 그대로 전파
    return Promise.reject(error);
  }
);

export default axiosInstance;
