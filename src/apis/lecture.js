// apis/lecture.js
import axiosInstance from "./axios";

export const fetchLectures = async ({
  mode,
  title,
  profName,
  sort = [],
  page,
  size,
} = {}) => {
  if (!mode) throw new Error("mode 파라미터는 필수입니다.");

  const params = new URLSearchParams();
  params.append("mode", mode);
  if (title) params.append("title", title);
  if (profName) params.append("profName", profName); // ✅ 이게 정확한 키
  sort.forEach((s) => params.append("sort", s));
  if (typeof page === "number") params.append("page", page);
  if (typeof size === "number") params.append("size", size);

  const response = await axiosInstance.get(`/api/courses?${params.toString()}`);
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
