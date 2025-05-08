import axiosInstance from "./axios";

// 학생 로그인
export const login = async (email, password) => {
  console.log(email, password);
  const res = await axiosInstance.post("/api/members/login", {
    email,
    password,
  });
  console.log(res.data);
  return res.data.data; // accessToken, refreshToken
};

// 관리자 로그인
export const adminLogin = async (email, password) => {
  const res = await axiosInstance.post("/api/members/login/admin", {
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

// 로그아웃, 토큰 만료
export const logout = async () =>
  await axiosInstance.post("/api/members/logout");

// 학생 내 정보 조회
export const getStudentMyData = async () => {
  try {
    const res = await axiosInstance.get("/api/members/me/student");
    return res.data;
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
