import axiosInstance from "./axios";

export const fetchLectures = async ({
  mode,
  title,
  professor,
  sort = [],
  page,
  size,
} = {}) => {
  if (!mode) {
    throw new Error("mode 파라미터는 필수입니다.");
  }

  const params = new URLSearchParams();
  params.append("mode", mode);
  if (title) params.append("title", title);
  if (professor) params.append("professor", professor);
  sort.forEach((s) => params.append("sort", s));
  if (typeof page === "number") params.append("page", page);
  if (typeof size === "number") params.append("size", size);

  const response = await axiosInstance.get(`/api/courses?${params.toString()}`);
  return response.data;
};
