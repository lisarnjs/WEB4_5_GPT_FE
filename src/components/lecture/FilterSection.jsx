import BaseButton from "../common/BaseButton";

const majors = [
  { value: "", label: "전체" },
  { value: "cs", label: "컴퓨터공학과" },
  { value: "ba", label: "경영학과" },
];

const grades = ["1학년", "2학년", "3학년", "4학년"];
const semesters = ["1학기", "2학기"];

export default function FilterSection({
  filters,
  onChange,
  isStaff,
  onRegister,
}) {
  return (
    <div className="grid grid-cols-6 gap-4">
      <select
        name="major"
        className="border px-3 py-2 rounded"
        value={filters.major}
        onChange={onChange}
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
        onChange={onChange}
      >
        {grades.map((g) => (
          <option key={g}>{g}</option>
        ))}
      </select>

      <select
        name="semester"
        className="border px-3 py-2 rounded"
        value={filters.semester}
        onChange={onChange}
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
        onChange={onChange}
      />

      <input
        type="text"
        name="title"
        placeholder="강의명"
        className="border px-3 py-2 rounded"
        value={filters.title}
        onChange={onChange}
      />

      <div className="flex gap-2">
        <BaseButton className="w-full">조회</BaseButton>
        {isStaff && (
          <BaseButton
            className="bg-yellow-400 hover:bg-yellow-500"
            onClick={onRegister}
          >
            등록
          </BaseButton>
        )}
      </div>
    </div>
  );
}
