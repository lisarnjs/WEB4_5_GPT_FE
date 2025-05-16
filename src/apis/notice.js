// src/apis/notice.js

import axiosInstance from "./axios";

/**
 * 공지사항 목록 조회
 * @param {Object} params - { title, page, size }
 * @returns {Promise}
 */
export const getNotices = async (params = {}) => {
  try {
    const res = await axiosInstance.get("/api/notices", { params });
    return res.data;
  } catch (error) {
    console.error("공지사항 목록 조회 실패:", error);
    throw error;
  }
};

/**
 * 공지사항 상세 조회
 * @param {number} id - 공지사항 ID
 * @returns {Promise}
 */
export const getNoticeDetail = async (id) => {
  try {
    const res = await axiosInstance.get(`/api/notices/${id}`);
    return res.data;
  } catch (error) {
    console.error("공지사항 상세 조회 실패:", error);
    throw error;
  }
};

/**
 * 공지사항 작성
 * @param {Object} data - { title, content }
 * @param {File} [file] - 첨부 이미지 파일 (선택)
 * @returns {Promise}
 */
export const createNotice = async (data, file) => {
  try {
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    if (file) {
      formData.append("file", file);
    }

    const res = await axiosInstance.post("/api/notices", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("공지사항 작성 실패:", error);
    throw error;
  }
};

/**
 * 공지사항 수정
 * @param {number} id - 공지사항 ID
 * @param {Object} data - { title, content }
 * @param {File} [file] - 첨부 이미지 파일 (선택)
 * @returns {Promise}
 */
export const updateNotice = async (id, data, file) => {
  try {
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    if (file) {
      formData.append("file", file);
    }

    const res = await axiosInstance.patch(`/api/notices/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("공지사항 수정 실패:", error);
    throw error;
  }
};

/**
 * 공지사항 삭제
 * @param {number} id - 공지사항 ID
 * @returns {Promise}
 */
export const deleteNotice = async (id) => {
  try {
    const res = await axiosInstance.delete(`/api/notices/${id}`);
    return res.data;
  } catch (error) {
    console.error("공지사항 삭제 실패:", error);
    throw error;
  }
};
