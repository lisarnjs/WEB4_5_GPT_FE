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
