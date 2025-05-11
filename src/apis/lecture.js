// apis/lecture.js
import axiosInstance from "./axios";

// 강의 목록 조회
export const fetchLectures = async ({
  mode,
  title,
  profName,
  majorId,
  grade,
  semester,
  sort = [],
  page,
  size,
} = {}) => {
  if (!mode) throw new Error("mode 파라미터는 필수입니다.");

  const params = new URLSearchParams();
  params.append("mode", mode);
  if (title) params.append("title", title);
  if (profName) params.append("profName", profName);
  if (majorId) params.append("majorId", majorId);
  sort.forEach((s) => params.append("sort", s));
  if (grade) params.append("grade", grade);
  if (semester) params.append("semester", semester);
  if (typeof page === "number") params.append("page", page);
  if (typeof size === "number") params.append("size", size);

  const response = await axiosInstance.get(`/api/courses?${params.toString()}`);
  return response.data;
};

/**
 * 강의 생성 API
 * POST /api/courses
 * @param {Object} courseData - 강의 생성 데이터
 * @returns {Promise<Object>} 생성된 강의 데이터
 */
export const createLecture = async (courseData) => {
  const response = await axiosInstance.post("/api/courses", courseData);
  return response.data;
};

/**
 * 강의 수정 API
 * PUT /api/courses/{courseId}
 * @param {Object} courseData - 수정할 강의 데이터 (courseId 포함)
 * @returns {Promise<Object>} 수정된 강의 데이터
 */
export const updateLecture = async (courseData) => {
  const response = await axiosInstance.put(
    `/api/courses/${courseData.id}`,
    courseData
  );
  return response.data;
};

/**
 * 강의 삭제 API
 * DELETE /api/courses/{courseId}
 * @param {number} courseId - 삭제할 강의 ID
 * @returns {Promise<Object>} 삭제 결과
 */
export const deleteLecture = async (courseId) => {
  const response = await axiosInstance.delete(`/api/courses/${courseId}`);
  return response.data;
};

/**
 * 내 수강목록 조회 API
 * GET /api/enrollments/me
 * @returns {Promise<Object>} 내 수강목록 데이터
 */
export const fetchMyEnrollments = async () => {
  const response = await axiosInstance.get("/api/enrollments/me");
  return response.data;
};

/**
 * 수강 신청 취소 API
 * DELETE /api/enrollments/{enrollmentId}
 * @param {number} enrollmentId - 취소할 수강신청 ID
 * @returns {Promise<Object>} 응답 데이터
 */
export const cancelEnrollment = async (enrollmentId) => {
  const response = await axiosInstance.delete(
    `/api/enrollments/${enrollmentId}`
  );
  return response.data;
};

/**
 * 수강 신청 API
 * POST /api/enrollments
 * @param {number} courseId - 신청할 강의의 ID
 * @returns {Promise<Object>} 응답 데이터
 */
export const enrollCourse = async (courseId) => {
  const response = await axiosInstance.post("/api/enrollments", { courseId });
  return response.data;
};
