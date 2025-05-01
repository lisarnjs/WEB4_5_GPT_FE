import { useState, useEffect } from "react";
import BaseButton from "../common/BaseButton";

const weekdays = ["월", "화", "수", "목", "금"];
const grades = [1, 2, 3, 4];
const semesters = [1, 2];

const formInitData = {
  title: "",
  professor: "",
  room: "",
  day: "월",
  time: "",
  plan: false,
  credits: 3,
  capacity: 30,
  grade: 1,
  semester: 1,
};

export default function LectureModal({
  isOpen,
  onClose,
  onSubmit,
  mode = "create",
  initialData = {},
}) {
  const [form, setForm] = useState(formInitData);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm(initialData);
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(formInitData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-xl shadow-lg space-y-6">
        <h3 className="text-xl font-bold text-textMain">
          {mode === "create" ? "강의 등록" : "강의 수정"}
        </h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-textSub block mb-1">강의명</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-textSub block mb-1">교수명</label>
              <input
                name="professor"
                value={form.professor}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="text-sm text-textSub block mb-1">강의실</label>
              <input
                name="room"
                value={form.room}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-textSub mb-1">요일</label>
              <select
                name="day"
                value={form.day}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                {weekdays.map((day) => (
                  <option key={day}>{day}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-textSub mb-1">시간</label>
              <input
                name="time"
                value={form.time}
                onChange={handleChange}
                placeholder="예: 1:30~3:30"
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-textSub mb-1">학점</label>
              <input
                type="number"
                name="credits"
                value={form.credits}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-textSub mb-1">인원</label>
              <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-textSub mb-1">
                강의계획서
              </label>
              <input
                type="checkbox"
                name="plan"
                checked={form.plan}
                onChange={handleChange}
                className="ml-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-textSub mb-1">학년</label>
              <select
                name="grade"
                value={form.grade}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                {grades.map((g) => (
                  <option key={g} value={g}>
                    {g}학년
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-textSub mb-1">학기</label>
              <select
                name="semester"
                value={form.semester}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                {semesters.map((s) => (
                  <option key={s} value={s}>
                    {s}학기
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <BaseButton
              type="button"
              onClick={() => {
                setForm(formInitData);
                onClose();
              }}
              className="bg-gray-300 text-black"
            >
              취소
            </BaseButton>
            <BaseButton type="submit">
              {mode === "create" ? "등록" : "수정 완료"}
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  );
}
