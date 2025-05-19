import axiosInstance from "./axios";

/**
 * 내 시간표 조회 API
 * GET /api/timetables/me?year={year}&semester={semester}
 *
 * @param {Object} params
 * @param {number} params.year - 조회할 연도 (예: 2025)
 * @param {number} params.semester - 조회할 학기 (1 또는 2)
 * @returns {Promise<Object>} 시간표 응답 데이터
 */

export const getMyTimetable = async ({ year, semester }) => {
  if (!year || !semester) {
    throw new Error("year와 semester는 필수 파라미터입니다.");
  }

  try {
    const response = await axiosInstance.get("/api/timetables/me", {
      params: { year, semester },
    });
    return response.data.data; // 시간표 본문
  } catch (error) {
    console.error("시간표 조회 실패:", error);
    throw error;
  }
};

/**
 * 시간표 생성 API
 * POST /api/timetables
 * @param {Object} params - 생성할 시간표 정보
 * @param {number} params.year - 연도
 * @param {number} params.semester - 학기 (1 또는 2)
 * @returns {Promise<Object>} 생성 결과
 */
export const createMyTimetable = async ({ year, semester }) => {
  try {
    const response = await axiosInstance.post("/api/timetables", {
      year,
      semester,
    });
    return response.data;
  } catch (error) {
    console.error("시간표 생성 실패:", error);
    throw error;
  }
};
