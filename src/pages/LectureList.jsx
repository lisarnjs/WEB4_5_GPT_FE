import { useState } from "react";
import BaseButton from "../components/common/BaseButton";
import useAuthStore from "../store/authStore";
import Pagination from "../components/common/Pagination";
import LectureModal from "../components/lecture/LectureModal";
import DeleteConfirmModal from "../components/common/DeleteCofirmModal";

const majors = [
  { value: "", label: "전체" },
  { value: "cs", label: "컴퓨터공학과" },
  { value: "ba", label: "경영학과" },
];

const grades = ["1학년", "2학년", "3학년", "4학년"];
const semesters = ["1학기", "2학기"];

// ✅ 더미 강의 20개 생성
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
  // 등록/수정 모달을 위한 상태관리
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // create or edit
  const [editData, setEditData] = useState(null);

  // 삭제를 위한 상태관리
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // 기존 sampleLectures
  const [lectures, setLectures] = useState(sampleLectures);

  const handleDelete = () => {
    console.log(deleteTarget);
    setLectures((prev) => prev.filter((l) => l.id !== deleteTarget.id));
    setDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  const user = useAuthStore((state) => state.user);
  const isStaff = user?.role === "PROFESSOR" || user?.role === "ADMIN";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedLectures = lectures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-background px-6 py-10 font-noto">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow space-y-8">
        <h2 className="text-3xl font-bold text-textMain">강의 목록</h2>

        {/* 필터 영역 */}
        <div className="grid grid-cols-6 gap-4">
          <select
            name="major"
            className="border px-3 py-2 rounded"
            value={filters.major}
            onChange={handleChange}
          >
            {majors.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>

          <select
            name="grade"
            className="border px-3 py-2 rounded"
            value={filters.grade}
            onChange={handleChange}
          >
            {grades.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>

          <select
            name="semester"
            className="border px-3 py-2 rounded"
            value={filters.semester}
            onChange={handleChange}
          >
            {semesters.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <input
            type="text"
            name="professor"
            placeholder="교수명"
            className="border px-3 py-2 rounded"
            value={filters.professor}
            onChange={handleChange}
          />

          <input
            type="text"
            name="title"
            placeholder="강의명"
            className="border px-3 py-2 rounded"
            value={filters.title}
            onChange={handleChange}
          />

          <div className="flex gap-2">
            <BaseButton className="w-full">조회</BaseButton>
            {isStaff && (
              <BaseButton
                className="bg-yellow-400 hover:bg-yellow-500"
                onClick={() => {
                  setModalMode("create");
                  setEditData(null);
                  setModalOpen(true);
                }}
              >
                등록
              </BaseButton>
            )}
          </div>
        </div>

        {/* 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-t">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="py-2">전공</th>
                <th>강의명</th>
                <th>교수명</th>
                <th>강의실</th>
                <th>수업 날짜</th>
                <th>강의계획서</th>
                {isStaff && <th>수정</th>}
                {isStaff && <th>삭제</th>}
                <th>학점</th>
                <th>인원수</th>
                <th>학년</th>
                <th>학기</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLectures.map((lecture) => (
                <tr key={lecture.id} className="text-center border-b">
                  <td className="py-2">{lecture.major}</td>
                  <td>{lecture.title}</td>
                  <td>{lecture.professor}</td>
                  <td>{lecture.room}</td>
                  <td>{`${lecture.day} (${lecture.time})`}</td>
                  <td>{lecture.plan ? "📄" : "-"}</td>
                  {isStaff && (
                    <td>
                      <button
                        onClick={() => {
                          setModalMode("edit");
                          setEditData(lecture);
                          setModalOpen(true);
                        }}
                        className="hover:text-primary"
                      >
                        ✏️
                      </button>
                    </td>
                  )}
                  {isStaff && (
                    <td>
                      <button
                        onClick={() => {
                          setDeleteTarget(lecture); // 삭제 대상 저장
                          setDeleteModalOpen(true);
                        }}
                        className="hover:text-red-500"
                      >
                        ❌
                      </button>
                    </td>
                  )}
                  <td>{lecture.credits}</td>
                  <td>{lecture.capacity}</td>
                  <td>{lecture.grade}</td>
                  <td>{lecture.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ 테이블 밖에 Pagination 렌더링 */}
          <Pagination
            totalItems={sampleLectures.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <LectureModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(data) => {
          if (modalMode === "edit") {
            console.log("✏️ 수정된 데이터:", data);
          } else {
            console.log("✅ 새로 등록된 데이터:", data);
          }
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
