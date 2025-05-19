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
 * 강의 단건 조회
 * @param {number|string} courseId - 조회할 강의 ID
 * @returns {Promise<Object>} - 단일 강의 상세 정보
 */
export const getLectureById = async (courseId) => {
  try {
    const response = await axiosInstance.get(`/api/courses/${courseId}`);
    return response.data.data;
  } catch (error) {
    console.error(`강의(${courseId}) 단건 조회 실패:`, error);
    throw error;
  }
};

/**
 * 강의 생성 API (multipart/form-data)
 * POST /api/courses
 * @param {Object} courseData - 강의 정보 + 파일
 *   - data: 강의 JSON
 *   - file: 파일 객체 (선택)
 * @returns {Promise<Object>} 생성된 강의 데이터
 */
export const createLecture = async ({ data, file }) => {
  const formData = new FormData();

  // JSON 데이터를 Blob으로 감싸 formData에 추가
  const jsonBlob = new Blob([JSON.stringify(data)], {
    type: "application/json",
  });
  formData.append("data", jsonBlob);

  // 파일이 존재할 경우에만 추가
  if (file) {
    formData.append("file", file);
  }

  const response = await axiosInstance.post("/api/courses", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// 강의 수정 API (multipart/form-data)
export const updateLecture = async ({ id, data, file }) => {
  const formData = new FormData();

  // "data" 파트 추가
  formData.append(
    "data",
    new Blob([JSON.stringify(data)], { type: "application/json" })
  );

  // "file" 파트 (선택)
  if (file) {
    formData.append("file", file);
  }

  const response = await axiosInstance.put(`/api/courses/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

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

/**
 * 내 수강 신청 기간 조회 API
 * GET /api/enrollments/periods/me
 * @returns {Promise<Object>} 수강 신청 기간 정보 (isEnrollmentOpen 포함)
 */
export const fetchMyEnrollmentPeriod = async () => {
  const response = await axiosInstance.get("/api/enrollments/periods/me");
  return response.data;
};
