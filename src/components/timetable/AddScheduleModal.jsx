import { useState } from "react";
import BaseButton from "../common/BaseButton";
import { addNormalSchedule } from "../../apis/timeTable";

const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const weekdayLabels = ["월", "화", "수", "목", "금", "토", "일"];
const colors = ["RED", "BLUE", "YELLOW"];

export default function AddScheduleModal({
  isOpen,
  onClose,
  timetableId,
  onSuccess,
}) {
  const [form, setForm] = useState({
    title: "",
    professorName: "",
    location: "",
    memo: "",
    color: "BLUE",
    schedule: [],
  });

  const toggleDay = (day) => {
    setForm((prev) => {
      const exists = prev.schedule.find((s) => s.day === day);
      if (exists) {
        return {
          ...prev,
          schedule: prev.schedule.filter((s) => s.day !== day),
        };
      } else {
        return {
          ...prev,
          schedule: [
            ...prev.schedule,
            { day, startTime: "13:00", endTime: "15:00" },
          ],
        };
      }
    });
  };

  const updateTime = (day, field, value) => {
    setForm((prev) => ({
      ...prev,
      schedule: prev.schedule.map((s) =>
        s.day === day ? { ...s, [field]: value } : s
      ),
    }));
  };

  const handleSubmit = async () => {
    if (!form.title || form.schedule.length === 0) {
      alert("제목과 일정을 입력해주세요.");
      return;
    }

    if (form.schedule.some((s) => s.startTime >= s.endTime)) {
      alert("시작 시간은 종료 시간보다 이전이어야 합니다.");
      return;
    }

    try {
      await addNormalSchedule({ ...form, timetableId });
      onSuccess?.();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "일정 등록 실패");
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-xl space-y-4">
        <h3 className="text-lg font-bold">📌 시간표 등록 - 직접 일정 추가</h3>

        <div className="grid grid-cols-2 gap-2">
          <div>제목</div>
          <input
            className="border px-2 py-1 rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <div>교수명</div>
          <input
            className="border px-2 py-1 rounded"
            value={form.professorName}
            onChange={(e) =>
              setForm({ ...form, professorName: e.target.value })
            }
          />

          <div>위치</div>
          <input
            className="border px-2 py-1 rounded"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <div>메모</div>
          <input
            className="border px-2 py-1 rounded col-span-1"
            value={form.memo}
            onChange={(e) => setForm({ ...form, memo: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <div className="font-semibold">🕓 요일별 시간 설정</div>
          {weekdays.map((day, idx) => {
            const schedule = form.schedule.find((s) => s.day === day);
            const isActive = !!schedule;
            return (
              <div key={day} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => toggleDay(day)}
                />
                <span className="w-10">{weekdayLabels[idx]}</span>
                {isActive && (
                  <>
                    시작:
                    <input
                      type="time"
                      value={schedule.startTime}
                      onChange={(e) =>
                        updateTime(day, "startTime", e.target.value)
                      }
                    />
                    종료:
                    <input
                      type="time"
                      value={schedule.endTime}
                      onChange={(e) =>
                        updateTime(day, "endTime", e.target.value)
                      }
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <div className="font-semibold">색상 선택</div>
          <div className="flex gap-4">
            {colors.map((color) => (
              <label key={color} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="color"
                  value={color}
                  checked={form.color === color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                />
                <span
                  className={`w-4 h-4 rounded-full ${color.toLowerCase()}-500`}
                />
                {color}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <BaseButton className="bg-gray-300 text-black" onClick={onClose}>
            취소
          </BaseButton>
          <BaseButton onClick={handleSubmit}>저장</BaseButton>
        </div>
      </div>
    </div>
  );
}
