// src/components/timetable/TimetableItemModal.jsx
import { useEffect, useState } from "react";
import BaseButton from "../common/BaseButton";
import {
  getTimetableItemById,
  updateTimetableItem,
  deleteTimetableItem,
} from "../../apis/timeTable";

export default function TimetableItemModal({
  isOpen,
  onClose,
  timetableItemId,
  onUpdated,
}) {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const data = await getTimetableItemById(timetableItemId);
        setForm(data);
      } catch (err) {
        alert("시간표 항목 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };

    if (timetableItemId) fetchItem();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleScheduleChange = (index, field, value) => {
    const updated = [...form.schedule];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, schedule: updated }));
  };

  const handleSave = async () => {
    try {
      await updateTimetableItem(timetableItemId, {
        ...form,
        type: "COURSE", // 필요시 동적 처리 가능
        courseId: null, // 필요 시 null
      });
      alert("시간표가 수정되었습니다.");
      onUpdated();
      onClose();
    } catch (err) {
      alert("수정 실패", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteTimetableItem(timetableItemId);
      alert("삭제되었습니다.");
      onClose();
      onUpdated();
    } catch (err) {
      alert("삭제 실패", err);
    }
  };

  if (!isOpen || !form) return null;

  if (loading) return <div>loading...</div>;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg space-y-4">
        <h2 className="text-lg font-bold">시간표 항목 상세</h2>

        <input
          type="text"
          value={form.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full border px-3 py-1 rounded"
          placeholder="제목"
        />

        <input
          type="text"
          value={form.professorName || ""}
          onChange={(e) => handleChange("professorName", e.target.value)}
          className="w-full border px-3 py-1 rounded"
          placeholder="교수명"
        />

        <input
          type="text"
          value={form.location || ""}
          onChange={(e) => handleChange("location", e.target.value)}
          className="w-full border px-3 py-1 rounded"
          placeholder="장소"
        />

        <select
          value={form.color || ""}
          onChange={(e) => handleChange("color", e.target.value)}
          className="w-full border px-3 py-1 rounded"
        >
          <option value="RED">빨강</option>
          <option value="BLUE">파랑</option>
          <option value="YELLOW">노랑</option>
        </select>

        <textarea
          value={form.memo || ""}
          onChange={(e) => handleChange("memo", e.target.value)}
          className="w-full border px-3 py-1 rounded"
          placeholder="메모"
        />

        <div className="space-y-2">
          <div className="font-semibold text-sm">시간 목록:</div>
          {form.schedule?.map((s, i) => (
            <div key={i} className="flex gap-2 items-center">
              <select
                value={s.day}
                onChange={(e) => handleScheduleChange(i, "day", e.target.value)}
                className="border rounded px-2 py-1"
              >
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                  (day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  )
                )}
              </select>
              <input
                type="time"
                value={s.startTime}
                onChange={(e) =>
                  handleScheduleChange(i, "startTime", e.target.value)
                }
                className="border rounded px-2 py-1"
              />
              <input
                type="time"
                value={s.endTime}
                onChange={(e) =>
                  handleScheduleChange(i, "endTime", e.target.value)
                }
                className="border rounded px-2 py-1"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4 gap-2">
          <BaseButton
            onClick={handleDelete}
            className="bg-red-500 text-white min-w-[80px]"
          >
            삭제
          </BaseButton>
          <BaseButton onClick={onClose} className="bg-gray-300 min-w-[80px]">
            닫기
          </BaseButton>
          <BaseButton
            onClick={handleSave}
            className="bg-blue-500 text-white min-w-[80px]"
          >
            저장
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
