import { useEffect, useState } from "react";
import { fetchMyEnrollments } from "../../apis/lecture";
import { registerCourseToTimetable } from "../../apis/timeTable";
import BaseButton from "../common/BaseButton";

// const colorMap = {
//   RED: "#EF4444",
//   BLUE: "#3B82F6",
//   YELLOW: "#FACC15",
// };

export default function ImportCourseModal({
  isOpen,
  onClose,
  timetableId,
  onSuccess,
}) {
  const [courses, setCourses] = useState([]);
  const [color, setColor] = useState("#EF4444");
  const [memo, setMemo] = useState("");
  // const [loading, setLoading] = useState(false);
  const [doneIds, setDoneIds] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchMyEnrollments()
        .then((data) => {
          console.log(data);
          setCourses(data.data);
        })
        .catch((err) => {
          console.error("수강목록 불러오기 실패", err);
          alert("수강 중인 강의 목록을 불러오는 데 실패했습니다.");
        });
    }
  }, [isOpen]);

  const handleRegister = async (courseId) => {
    try {
      await registerCourseToTimetable({
        timetableId,
        courseId,
        color,
        memo,
      });
      setDoneIds((prev) => [...prev, courseId]);
      onSuccess?.();
    } catch (err) {
      alert(err.response?.data?.message || "시간표 등록 실패");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-2xl p-6 rounded shadow space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold">
          📌 내 시간표 불러오기 (시간표 반영)
        </h2>
        <p className="text-sm text-gray-600">
          현재 수강 중인 강의를 시간표에 추가합니다.
        </p>

        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">강의명</th>
              <th className="p-2 border">시간</th>
              <th className="p-2 border">장소</th>
              <th className="p-2 border">교수명</th>
              <th className="p-2 border">추가</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((c) => (
              <tr key={c.courseId}>
                <td className="p-2 border text-center">{c.courseTitle}</td>
                <td className="p-2 border text-center">
                  {c.schedule
                    .map((s) => `${s.day} ${s.startTime}~${s.endTime}`)
                    .join(", ")}
                </td>
                <td className="p-2 border text-center">{c.location}</td>
                <td className="p-2 border text-center">{c.professorName}</td>
                <td className="p-2 border text-center">
                  <BaseButton
                    className="text-xs"
                    disabled={doneIds.includes(c.courseId)}
                    onClick={() => handleRegister(c.courseId)}
                  >
                    {doneIds.includes(c.courseId) ? "✔ 완료" : "추가하기"}
                  </BaseButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="space-y-2 text-sm">
          <div>
            색상 선택:{" "}
            <label className="mr-2">
              <input
                type="radio"
                value="#EF4444"
                checked={color === "#EF4444"}
                onChange={(e) => setColor(e.target.value)}
              />{" "}
              빨강
            </label>
            <label className="mr-2">
              <input
                type="radio"
                value="#3B82F6"
                checked={color === "#3B82F6"}
                onChange={(e) => setColor(e.target.value)}
              />{" "}
              파랑
            </label>
            <label>
              <input
                type="radio"
                value="#FACC15"
                checked={color === "#FACC15"}
                onChange={(e) => setColor(e.target.value)}
              />{" "}
              노랑
            </label>
          </div>

          <div>
            메모:{" "}
            <input
              className="border px-2 py-1 rounded w-full"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <BaseButton onClick={onClose} className="bg-gray-300 text-black">
            닫기
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
