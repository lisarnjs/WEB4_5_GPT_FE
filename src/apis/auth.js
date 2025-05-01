import axiosInstance from "./axios";

export const login = async (email, password) => {
  const res = await axiosInstance.post("/api/members/login", {
    email,
    password,
  });
  return res.data.data; // accessToken, refreshToken
};

// 학생 회원가입
export const signupStudent = (data) =>
  axiosInstance.post("/members/signup/student", {
    ...data,
    role: "Student",
  });

// 교직원 회원가입
export const signupProfessor = (data) =>
  axiosInstance.post("/members/signup/professor", {
    ...data,
    role: "Professor",
  });

// 이메일 인증 요청
export const requestEmailCode = (email) =>
  axiosInstance.post("/members/email/code", { email });

// 이메일 인증 코드 확인
export const verifyEmailCode = (email, code) =>
  axiosInstance.post("/members/email/verify", { email, code });

// 비밀번호 재설정
export const resetPassword = (email, password) =>
  axiosInstance.post("/members/password-reset/confirm", {
    email,
    passWord: password,
  });
