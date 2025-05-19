import { useState, useEffect } from "react";
import BaseButton from "../common/BaseButton";

// 요일 한글→영문 변환
const weekdayMap = {
  월: "MON",
  화: "TUE",
  수: "WED",
  목: "THU",
  금: "FRI",
};
const weekdays = ["월", "화", "수", "목", "금"];
const grades = [1, 2, 3, 4];
const semesters = [1, 2];

const formInitData = {
  title: "",
  major: "컴퓨터공학과", // 기본값(실제 환경에 맞게 수정)
  university: "OO대학교", // 기본값(실제 환경에 맞게 수정)
  location: "",
  capacity: 30,
  credit: 3,
  employeeId: "", // 실제로는 교수 검색 등으로 입력
  grade: 1,
  semester: 1,
  coursePlanAttachment: "",
  plan: false, // 강의계획서 첨부 여부(체크박스)
  day: "월",
  time: "", // "12:00~13:00" 형식
};

export default function LectureModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  mode = "create",
  initialData = {},
}) {
  const [form, setForm] = useState(formInitData);
  const [file, setFile] = useState(null);

  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const { university, employeeId, major } = profile;

  useEffect(() => {
    if (mode === "edit" && initialData) {
      const firstSchedule = initialData.schedule?.[0] || {};
      setForm({
        title: initialData.title || "",
        major: major || "",
        university: university || "",
        location: initialData.location || "",
        capacity: initialData.capacity || 30,
        credit: initialData.credit || 3,
        employeeId: employeeId || "",
        grade: initialData.grade || 1,
        semester: initialData.semester || 1,
        coursePlanAttachment: initialData.coursePlanAttachment || "",
        plan: !!initialData.coursePlanAttachment,
        day:
          Object.keys(weekdayMap).find(
            (k) => weekdayMap[k] === firstSchedule.day
          ) || "월",
        time:
          firstSchedule.startTime && firstSchedule.endTime
            ? `${firstSchedule.startTime}~${firstSchedule.endTime}`
            : "",
      });
      setFile(null); // 편집 모드에서는 초기화
    } else {
      setForm({
        ...formInitData,
        university,
        major,
      });
      setFile(null);
    }
  }, [mode, initialData, university, major]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let scheduleArr = [];
    if (form.time) {
      const [startTime, endTime] = form.time.split("~").map((s) => s.trim());
      scheduleArr = [
        {
          day: weekdayMap[form.day],
          startTime,
          endTime,
        },
      ];
    }

    const data = {
      title: form.title,
      major: form.major,
      university: form.university,
      location: form.location,
      capacity: Number(form.capacity),
      credit: Number(form.credit),
      employeeId: form.employeeId,
      grade: Number(form.grade),
      semester: Number(form.semester),
      schedule: scheduleArr,
    };
    console.log(initialData);
    console.log(data);
    const payload =
      mode === "create"
        ? {
            data,
            file: form.plan ? file : null,
          }
        : {
            id: initialData.id,
            data,
            file: form.plan ? file : initialData.coursePlanAttachment ?? null,
          };

    onSubmit(payload);
    setForm(formInitData);
    setFile(null);
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
              <label className="text-sm text-textSub block mb-1">
                교수 고유번호
              </label>
              <input
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="text-sm text-textSub block mb-1">강의실</label>
              <input
                name="location"
                value={form.location}
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
                placeholder="예: 13:00~15:00"
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-textSub mb-1">학점</label>
              <input
                type="number"
                name="credit"
                value={form.credit}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-textSub mb-1">정원</label>
              <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            {/* 첨부 체크 */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="plan"
                checked={form.plan}
                onChange={handleChange}
              />
              <label className="block text-sm text-textSub mb-1">
                강의계획서 첨부
              </label>
            </div>
          </div>

          {/* {form.plan && (
            <div>
              <label className="block text-sm text-textSub mb-1">
                첨부파일
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="w-full border px-3 py-2 rounded"
              />
              {file && (
                <p className="text-sm text-green-600 mt-1">
                  선택됨: {file.name}
                </p>
              )}
            </div>
          )} */}
          {form.plan && (
            <div>
              <label className="block text-sm text-textSub mb-1">
                첨부파일
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="w-full border px-3 py-2 rounded"
              />

              {/* ✅ 새 파일이 없고 기존 첨부파일 URL이 있는 경우 */}
              {!file && form.coursePlanAttachment && (
                <p className="text-sm text-blue-600 mt-1">
                  기존 파일:{" "}
                  <a
                    href={form.coursePlanAttachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    첨부파일 보기
                  </a>
                </p>
              )}

              {/* ✅ 새 파일이 선택된 경우 */}
              {file && (
                <p className="text-sm text-green-600 mt-1">
                  선택됨: {file.name}
                </p>
              )}
            </div>
          )}

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
              disabled={isSubmitting}
            >
              취소
            </BaseButton>
            <BaseButton type="submit" disabled={isSubmitting}>
              {mode === "create" ? "등록" : "수정 완료"}
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  );
}
