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

// 5. 전공 등록
export const createMajor = (data) => {
  return axiosInstance.post("/api/admin/majors", {
    universityId: data.universityId,
    name: data.name,
  });
};

// 6. 전공 정보 수정
export const updateMajor = (data) => {
  return axiosInstance.put(`/api/admin/majors/${data.id}`, {
    universityId: Number(data.universityId),
    name: data.name,
  });
};

// 7. 전공 삭제
export const deleteMajor = (majorId) => {
  return axiosInstance.delete(`/api/admin/majors/${majorId}`);
};

// 대학 등록
export const createUniversity = (data) => {
  return axiosInstance.post("/api/admin/universities", {
    name: data.name,
    emailDomain: data.emailDomain,
  });
};

// 대학 정보 수정
export const updateUniversity = (data) => {
  return axiosInstance.put("/api/admin/universities", {
    name: data.name,
  });
};

// 대학 삭제
export const deleteUniversity = (universityId) => {
  return axiosInstance.delete(`/api/admin/universities/${universityId}`);
};
