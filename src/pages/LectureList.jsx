import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Pagination from "../components/common/Pagination";
import LectureModal from "../components/lecture/LectureModal";
import DeleteConfirmModal from "../components/common/DeleteCofirmModal";
import FilterSection from "../components/lecture/FilterSection";
import LectureTable from "../components/lecture/LectureTable";
import {
  fetchLectures,
  deleteLecture,
  createLecture,
  updateLecture,
} from "../apis/lecture";
import { majorListByUniversity } from "../apis/university";

const itemsPerPage = 5;

export default function LectureList() {
  const queryClient = useQueryClient();
  const profile = JSON.parse(sessionStorage.getItem("profile"));

  // 🔸 상태 관리
  const defaultFilters = {
    major: "",
    grade: "",
    semester: "",
    professor: "",
    title: "",
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [searchParams, setSearchParams] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editData, setEditData] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    console.log(searchParams);
  }, [searchParams]);

  // 🔸 권한 확인
  const isStaff = ["PROFESSOR", "ADMIN"].includes(localStorage.getItem("role"));

  // 🔸 전공 목록 조회
  const { data: majors = [] } = useQuery({
    queryKey: ["majors", profile?.universityId],
    queryFn: () =>
      majorListByUniversity(profile.universityId).then((res) => res.data.data),
    enabled: !!profile?.universityId,
  });

  // 🔸 강의 목록 조회
  const {
    data: lecturesData,
    isError,
    error,
  } = useQuery({
    queryKey: ["lectures", searchParams, currentPage],
    queryFn: () =>
      fetchLectures({
        mode: "FULL",
        title: searchParams.title,
        profName: searchParams.professor,
        majorId: searchParams.major,
        grade: searchParams.grade,
        semester: searchParams.semester,
        page: currentPage - 1,
        size: itemsPerPage,
      }),
    keepPreviousData: true,
  });

  const lectures = lecturesData?.data?.content || [];
  const totalItems = lecturesData?.data?.totalElements || 0;

  // 🔸 강의 삭제
  const deleteMutation = useMutation({
    mutationFn: deleteLecture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      setDeleteTarget(null);
    },
  });

  // 🔸 강의 생성/수정
  const lectureMutation = useMutation({
    mutationFn: (data) =>
      modalMode === "create" ? createLecture(data) : updateLecture(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      setModalOpen(false);
    },
  });

  // 🔸 핸들러 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setSearchParams(filters);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setSearchParams(defaultFilters);
    setCurrentPage(1);
  };

  return (
    <div className="h-[calc(100vh-theme(spacing.headerHeight))] px-6 py-10 font-noto">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow space-y-8">
        <h2 className="text-3xl font-bold text-textMain">강의 목록</h2>

        <FilterSection
          filters={filters}
          onChange={handleChange}
          isStaff={isStaff}
          onRegister={() => {
            setModalMode("create");
            setEditData(null);
            setModalOpen(true);
          }}
          onReset={handleReset}
          majors={majors}
          onSearch={handleSearch}
        />

        {isError && (
          <div className="bg-red-50 text-red-500 p-4 rounded mb-4 text-center">
            {error?.message || "강의 목록을 불러오는 데 실패했습니다."}
          </div>
        )}

        <LectureTable
          lectures={lectures}
          isStaff={isStaff}
          onEdit={(lecture) => {
            console.log(lecture);
            setModalMode("edit");
            setEditData(lecture);
            setModalOpen(true);
          }}
          onDelete={setDeleteTarget}
        />

        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* 강의 생성/수정 모달 */}
      {/* <LectureModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={lectureMutation.mutate}
        mode={modalMode}
        initialData={editData}
        isSubmitting={lectureMutation.isLoading}
      /> */}
      <LectureModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={lectureMutation.mutate}
        isSubmitting={lectureMutation.isLoading}
        mode={modalMode}
        initialData={editData}
      />

      {/* 삭제 확인 모달 */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        message={`"${deleteTarget?.title}" 강의를 삭제하시겠습니까?`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
        confirmDisabled={deleteMutation.isLoading}
      />
    </div>
  );
}
