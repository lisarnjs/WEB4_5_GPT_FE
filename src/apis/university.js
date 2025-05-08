import axiosInstance from "./axios";

// 1. 대학 목록 조회
export const universityList = () => {
  return axiosInstance.get("/api/universities");
};

// 2. 대학 단건 조회
export const getUniversityById = (universityId) => {
  return axiosInstance.get(`/api/universities/${universityId}`);
};

// 3. 전공 목록 전체 조회
export const majorList = () => {
  return axiosInstance.get("/api/majors");
};

// 4. 특정 대학의 전공 목록 조회
export const majorListByUniversity = (universityId) => {
  return axiosInstance.get(`/api/majors/university/${universityId}`);
};
