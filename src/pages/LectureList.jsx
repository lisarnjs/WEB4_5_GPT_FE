import { useState } from "react";
import useAuthStore from "../store/authStore";
import Pagination from "../components/common/Pagination";
import LectureModal from "../components/lecture/LectureModal";
import DeleteConfirmModal from "../components/common/DeleteCofirmModal";
import FilterSection from "../components/lecture/FilterSection";
import LectureTable from "../components/lecture/LectureTable";

const sampleLectures = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  major: "컴퓨터학과",
  title: `운영체제 ${i + 1}`,
  professor: `홍길동 ${i + 1}`,
  room: `00${i}`,
  day: "금",
  time: "1:30~3:30",
  plan: i % 2 === 0,
  credits: 3,
  capacity: 50 + i,
  grade: (i % 4) + 1,
  semester: (i % 2) + 1,
}));

export default function LectureList() {
  const [filters, setFilters] = useState({
    major: "",
    grade: "1학년",
    semester: "1학기",
    professor: "",
    title: "",
  });
  const [lectures, setLectures] = useState(sampleLectures);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editData, setEditData] = useState(null);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const user = useAuthStore((state) => state.user);
  const isStaff = user?.role === "PROFESSOR" || user?.role === "ADMIN";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    setLectures((prev) => prev.filter((l) => l.id !== deleteTarget.id));
    setDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  const paginatedLectures = lectures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-background px-6 py-10 font-noto">
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
        />

        <LectureTable
          lectures={paginatedLectures}
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
          totalItems={lectures.length}
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
