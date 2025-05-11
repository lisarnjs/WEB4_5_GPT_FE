// components/lecture/FilterSection.jsx
import BaseButton from "../common/BaseButton";

// const grades = ["1학년", "2학년", "3학년", "4학년"];
// const semesters = ["1학기", "2학기"];

const grades = [1, 2, 3, 4];
const semesters = [1, 2];

export default function FilterSection({
  filters,
  onChange,
  isStaff,
  onRegister,
  onReset,
  onSearch,
  majors,
}) {
  const baseClass =
    "border border-gray-300 text-sm px-3 py-2 rounded h-10 bg-white focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* 전공 */}
      <select
        name="major"
        className={baseClass}
        value={filters.major}
        onChange={onChange}
      >
        <option value="">전체 전공</option>
        {majors.map((m) => (
          <option key={m.name} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>

      {/* 학년 */}
      <select
        name="grade"
        className={baseClass}
        value={filters.grade}
        onChange={onChange}
      >
        <option value="">전체 학년</option>
        {grades.map((g) => (
          <option key={g} value={g}>
            {g}학년
          </option>
        ))}
      </select>

      {/* 학기 */}
      <select
        name="semester"
        className={baseClass}
        value={filters.semester}
        onChange={onChange}
      >
        <option value="">전체 학기</option>
        {semesters.map((s) => (
          <option key={s} value={s}>
            {s}학기
          </option>
        ))}
      </select>

      {/* 교수명 */}
      <input
        type="text"
        name="professor"
        placeholder="교수명"
        className={baseClass}
        value={filters.professor}
        onChange={onChange}
      />

      {/* 강의명 */}
      <input
        type="text"
        name="title"
        placeholder="강의명"
        className={baseClass}
        value={filters.title}
        onChange={onChange}
      />

      {/* 버튼 그룹 */}
      <div className="flex gap-2 flex-1">
        <BaseButton className="w-full" onClick={onSearch}>
          조회
        </BaseButton>
        <BaseButton className="w-full" onClick={onReset}>
          초기화
        </BaseButton>
        {isStaff && (
          <BaseButton
            className="w-full px-4 bg-yellow-400 hover:bg-yellow-500"
            onClick={onRegister}
          >
            등록
          </BaseButton>
        )}
      </div>
    </div>
  );
}
