import axiosInstance from "./axios";

export const login = async (email, password) => {
  const res = await axiosInstance.post("/api/members/login", {
    email,
    password,
  });
  return res.data.data; // accessToken, refreshToken
};
