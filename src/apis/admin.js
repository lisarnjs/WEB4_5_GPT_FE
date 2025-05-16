import axiosInstance from "./axios";

export const fetchMembers = (params = {}) => {
  const searchParams = new URLSearchParams();

  // 필터 파라미터 추가 (값이 있는 경우만)
  if (params.universityId)
    searchParams.append("universityId", params.universityId);
  if (params.majorId) searchParams.append("majorId", params.majorId);
  if (params.grade) searchParams.append("grade", params.grade);
  if (params.semester) searchParams.append("semester", params.semester);

  // 페이지네이션 파라미터 (명시적으로 전달된 경우만)
  if (typeof params.page !== "undefined")
    searchParams.append("page", params.page);
  if (typeof params.size !== "undefined")
    searchParams.append("size", params.size);

  return axiosInstance.get(`/api/admin/students?${searchParams.toString()}`);
};
// 교직원 목록 조회
export const fetchProfessors = (params = {}) => {
  const searchParams = new URLSearchParams();

  // 필터 파라미터 (값이 있는 경우만 추가)
  if (params.universityId)
    searchParams.append("universityId", params.universityId);
  if (params.professorName)
    searchParams.append("professorName", params.professorName);
  if (params.majorId) searchParams.append("majorId", params.majorId);
  if (params.status) searchParams.append("status", params.status);

  // 페이지네이션 파라미터 (명시적으로 전달된 경우만)
  if (typeof params.page !== "undefined")
    searchParams.append("page", params.page);
  if (typeof params.size !== "undefined")
    searchParams.append("size", params.size);

  return axiosInstance.get(`/api/admin/professors?${searchParams.toString()}`);
};

// 교직원 상태 변경
export const updateProfessorStatus = ({ memberId, status }) => {
  return axiosInstance.patch(`/api/admin/professors/${memberId}`, {
    approvalStatus: status,
  });
};

// 수강신청기간 조회
export const fetchEnrollmentPeriods = (params = {}) => {
  const searchParams = new URLSearchParams();

  // 필터 파라미터 (값이 있는 경우만 추가)
  if (params.universityName)
    searchParams.append("universityName", params.universityName);
  if (params.startDateFrom)
    searchParams.append("startDateFrom", params.startDateFrom);
  if (params.startDateTo)
    searchParams.append("startDateTo", params.startDateTo);
  if (params.endDateFrom)
    searchParams.append("endDateFrom", params.endDateFrom);
  if (params.endDateTo) searchParams.append("endDateTo", params.endDateTo);

  // 페이지네이션 파라미터 (명시적으로 전달된 경우만)
  if (typeof params.page !== "undefined")
    searchParams.append("page", params.page);
  if (typeof params.size !== "undefined")
    searchParams.append("size", params.size);

  return axiosInstance.get(
    `/api/admin/enrollment-periods?${searchParams.toString()}`
  );
};

// 수강신청기간 등록
export const createEnrollmentPeriod = (data) => {
  return axiosInstance.post("/api/admin/enrollment-periods", {
    universityId: data.universityId,
    year: data.year,
    grade: data.grade,
    semester: data.semester,
    startDate: data.startDate,
    endDate: data.endDate,
  });
};

// 수강신청기간 수정
export const updateEnrollmentPeriod = (courseId, data) => {
  return axiosInstance.put(`/api/admin/enrollment-periods/${courseId}`, {
    universityId: data.universityId,
    year: data.year,
    grade: data.grade,
    semester: data.semester,
    startDate: data.startDate,
    endDate: data.endDate,
  });
};

// 수강신청기간 삭제
export const deleteEnrollmentPeriod = (courseId) => {
  return axiosInstance.delete(`/api/admin/enrollment-periods/${courseId}`);
};

// 관리자 초대
export const inviteAdmin = (data) => {
  return axiosInstance.post("/api/admin/invite", {
    adminName: data.adminName,
    email: data.email,
  });
};
