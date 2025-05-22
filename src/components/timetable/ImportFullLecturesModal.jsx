// src/components/timetable/ImportFullLecturesModal.jsx
import { useEffect, useState } from "react";
import BaseButton from "../common/BaseButton";
import { fetchLectures } from "../../apis/lecture";
import { registerCoursesToTimetableBulk } from "../../apis/timeTable";
import { colorMap } from "../../constants/common.constants";

export default function ImportFullLecturesModal({
  isOpen,
  onClose,
  timetableId,
  onSuccess,
}) {
  const [lectures, setLectures] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [color, setColor] = useState("BLUE");

  const fetchAllLectures = async () => {
    try {
      const res = await fetchLectures({ mode: "FULL" });
      console.log(res);
      setLectures(res.data.content || []);
    } catch (err) {
      alert("강의 목록 조회 실패");
      console.error(err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAllLectures();
      setSelectedIds([]);
    }
  }, [isOpen]);

  const handleCheckboxChange = (courseId) => {
    setSelectedIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSubmit = async () => {
    if (!selectedIds.length) {
      alert("강의를 한 개 이상 선택해주세요.");
      return;
    }
    try {
      await registerCoursesToTimetableBulk({
        timetableId,
        courseIds: selectedIds,
        color: colorMap[color],
        memo: "전체 강의에서 선택 등록",
      });
      alert("선택한 강의가 시간표에 등록되었습니다.");
      onClose();
      onSuccess();
    } catch (err) {
      alert("시간표 등록 실패");
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white max-w-3xl w-full p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-bold">전체 강의 목록</h2>

        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="color"
              value="RED"
              checked={color === "RED"}
              onChange={(e) => setColor(e.target.value)}
            />
            <span className="text-red-500">빨강</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="color"
              value="BLUE"
              checked={color === "BLUE"}
              onChange={(e) => setColor(e.target.value)}
            />
            <span className="text-blue-500">파랑</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="color"
              value="YELLOW"
              checked={color === "YELLOW"}
              onChange={(e) => setColor(e.target.value)}
            />
            <span className="text-yellow-500">노랑</span>
          </label>
        </div>

        <div className="h-64 overflow-y-auto border p-2 rounded">
          {lectures.map((lecture) => (
            <label
              key={lecture.id}
              className="flex items-center gap-2 border-b py-1 cursor-pointer mb-2"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(lecture.id)}
                onChange={() => handleCheckboxChange(lecture.id)}
              />
              <div className="flex items-center gap-4">
                <div className="font-medium">{lecture.title}</div>
                <div className="text-sm text-gray-500">
                  {lecture.professor} | {lecture.major} | {lecture.location}
                </div>
              </div>
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <BaseButton onClick={onClose} className="bg-gray-300">
            닫기
          </BaseButton>
          <BaseButton onClick={handleSubmit} className="bg-blue-500 text-white">
            추가
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
