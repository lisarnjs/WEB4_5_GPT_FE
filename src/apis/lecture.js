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
