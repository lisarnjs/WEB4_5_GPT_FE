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

// 시간표 수업 직접 등록
export const addNormalSchedule = async (payload) => {
  const response = await axiosInstance.post("/api/timetables/normal", payload);
  return response.data;
};

/**
 * 시간표 공유 링크 생성 API
 * POST /api/timetable/share/link
 *
 * @param {Object} params
 * @param {number} params.timetableId - 공유할 시간표 ID
 * @param {string} params.visibility - 공개 범위 ("PUBLIC" 또는 "PRIVATE")
 * @returns {Promise<Object>} 공유 링크 응답 데이터 (shareUrl, expiresAt 포함)
 */
export const createTimetableShareLink = async ({ timetableId, visibility }) => {
  if (!timetableId || !visibility) {
    throw new Error("timetableId와 visibility는 필수입니다.");
  }

  try {
    const response = await axiosInstance.post(
      "/api/timetables/share/link",
      { timetableId, visibility },
      {
        headers: {
          // 현재 도메인을 자동으로 헤더에 포함
          "X-Client-Base-Url": import.meta.env.VITE_API_BASE_URL,
        },
      }
    );

    return response.data.data; // { shareUrl, expiresAt }
  } catch (error) {
    console.error("공유 링크 생성 실패:", error);
    throw error;
  }
};

/**
 * 시간표에 강의 등록 API
 * POST /api/timetables/course
 *
 * @param {Object} params
 * @param {number} params.timetableId - 내 시간표 ID
 * @param {number} params.courseId - 추가할 강의 ID
 * @param {string} params.color - 표시 색상 (ex: "#ff0000")
 * @param {string} [params.memo] - 선택 메모
 * @returns {Promise<Object>} 응답 메시지
 */
export const registerCourseToTimetable = async ({
  timetableId,
  courseId,
  color,
  memo = "",
}) => {
  if (!timetableId || !courseId || !color) {
    throw new Error("timetableId, courseId, color는 필수입니다.");
  }

  try {
    const response = await axiosInstance.post("/api/timetables/course", {
      timetableId,
      courseId,
      color,
      memo,
    });

    return response.data; // { code, message }
  } catch (error) {
    console.error("강의 시간표 등록 실패:", error);
    throw error;
  }
};

/**
 * 공유된 시간표 조회 API
 * GET /api/timetables/share/{shareKey}
 *
 * @param {string} shareKey - 공유 URL에 포함된 키
 * @returns {Promise<Object>} 공유된 시간표 데이터
 */
export const getSharedTimetable = async (shareKey) => {
  if (!shareKey) {
    throw new Error("shareKey는 필수입니다.");
  }

  try {
    const response = await axiosInstance.get(
      `/api/timetables/share/${shareKey}`
    );
    return response.data.data; // { timetableId, year, semester, ownerName, timetables: [...] }
  } catch (error) {
    console.error("공유된 시간표 조회 실패:", error);
    throw error;
  }
};

// src/apis/timeTable.js

/**
 * 시간표에 여러 강의를 한꺼번에 등록하는 API
 * POST /api/timetables/bulk
 *
 * @param {Object} payload
 * @param {number} payload.timetableId - 시간표 ID
 * @param {number[]} payload.courseIds - 등록할 수강 강의 ID 배열
 * @param {string} payload.color - 전체 적용 색상 ("RED" | "BLUE" | "YELLOW")
 * @param {string} [payload.memo] - (선택) 공통 메모
 * @returns {Promise<Object>} 등록 결과 메시지
 */
export const registerCoursesToTimetableBulk = async ({
  timetableId,
  courseIds,
  color,
  memo,
}) => {
  if (!timetableId || !courseIds || !color) {
    throw new Error("timetableId, courseIds, color는 필수입니다.");
  }

  try {
    const response = await axiosInstance.post("/api/timetables/bulk", {
      timetableId,
      courseIds,
      color,
      memo,
    });

    return response.data;
  } catch (error) {
    console.error("시간표 일괄 등록 실패:", error);
    throw error;
  }
};
