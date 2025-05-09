// pages/LectureList.jsx
import { useEffect, useState } from "react";
// import useAuthStore from "../store/authStore";
import Pagination from "../components/common/Pagination";
import LectureModal from "../components/lecture/LectureModal";
import DeleteConfirmModal from "../components/common/DeleteCofirmModal";
import FilterSection from "../components/lecture/FilterSection";
import LectureTable from "../components/lecture/LectureTable";
import { fetchLectures } from "../apis/lecture";
import { majorListByUniversity } from "../apis/university";

const itemsPerPage = 5;

export default function LectureList() {
  const defaultFilters = {
    major: "",
    grade: "1학년",
    semester: "1학기",
    professor: "",
    title: "",
  };

  const [filters, setFilters] = useState(defaultFilters); // UI용
  const [searchParams, setSearchParams] = useState(defaultFilters); // API용

  const [lectures, setLectures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editData, setEditData] = useState(null);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // const user = useAuthStore((state) => state.user);
  const isStaff =
    localStorage.getItem("role") === "PROFESSOR" ||
    localStorage.getItem("role") === "ADMIN";

  const profileData = JSON.parse(sessionStorage.getItem("profile"));
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    majorListByUniversity(profileData.universityId)
      .then((res) => setMajors(res.data.data))
      .catch((err) => console.error("전공 목록 불러오기 실패:", err));
  }, [profileData.universityId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setSearchParams(defaultFilters); // 검색 조건도 초기화
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setSearchParams(filters);
    setCurrentPage(1); // 조회 시 1페이지부터 시작
  };

  const handleDelete = () => {
    setLectures((prev) => prev.filter((l) => l.id !== deleteTarget.id));
    setDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  useEffect(() => {
    const loadLectures = async () => {
      try {
        const data = await fetchLectures({
          mode: "FULL",
          title: searchParams.title || null,
          profName: searchParams.professor || null,
          page: currentPage - 1,
          size: itemsPerPage,
        });
        setLectures(data.data.content);
        setTotalItems(data.data.totalElements);
      } catch (err) {
        console.error("강의 목록 불러오기 실패:", err);
      }
    };

    loadLectures();
  }, [searchParams, currentPage]);

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

        <LectureTable
          lectures={lectures}
          isStaff={isStaff}
          onEdit={(lecture) => {
            setModalMode("edit");
            setEditData(lecture);
            setModalOpen(true);
          }}
          onDelete={(lecture) => {
            setDeleteTarget(lecture);
            setDeleteModalOpen(true);
          }}
        />

        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <LectureModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
        onSubmit={(data) => {
          if (modalMode === "edit") {
            setLectures((prev) =>
              prev.map((l) => (l.id === data.id ? data : l))
            );
          } else {
            setLectures((prev) => [...prev, { ...data, id: Date.now() }]);
          }
          setModalOpen(false);
        }}
        mode={modalMode}
        initialData={editData}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        message={`"${deleteTarget?.title}" 강의를 삭제하시겠습니까?`}
        onCancel={() => {
          setDeleteModalOpen(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
