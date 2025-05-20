// src/pages/SharedTimetablePage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dayToEngList } from "../constants/date.constants";
import { getSharedTimetable } from "../apis/timeTable";

const days = ["월", "화", "수", "목", "금", "토", "일"];
const hours = Array.from({ length: 12 }, (_, i) => 9 + i); // 9~20시

export default function SharedTimetablePage() {
  const { shareKey } = useParams();
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShared = async () => {
      try {
        const data = await getSharedTimetable(shareKey);
        setTimetable(data);
      } catch (err) {
        setError(`시간표를 불러오지 못했습니다.`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShared();
  }, [shareKey]);

  const renderCells = (dayKor, hour) => {
    const dayEng = dayToEngList[dayKor];

    const items =
      timetable?.timetables?.flatMap((item) =>
        item.schedule
          .filter((s) => s.day === dayEng)
          .map((s) => ({
            ...item,
            startTime: s.startTime,
            endTime: s.endTime,
          }))
      ) || [];

    const cells = items.filter((item) => {
      const start = Number(item.startTime.split(":")[0]);
      const end = Number(item.endTime.split(":")[0]);
      return start <= hour && hour < end;
    });

    return (
      <div className="relative h-20 border">
        {cells.map((item) => {
          const startHour = Number(item.startTime.split(":")[0]);
          const endHour = Number(item.endTime.split(":")[0]);
          const duration = endHour - startHour;

          return (
            <div
              key={item.timetableItemId + item.startTime}
              className="absolute left-0 right-0 px-1 py-0.5 rounded text-white text-sm overflow-hidden"
              style={{
                top: `${(startHour - hour) * 100}%`,
                height: `${duration * 100}%`,
                backgroundColor:
                  item.color === "RED"
                    ? "#EF4444"
                    : item.color === "YELLOW"
                    ? "#FACC15"
                    : item.color === "BLUE"
                    ? "#3B82F6"
                    : item.type === "COURSE"
                    ? "#3B82F6"
                    : "#10B981",
              }}
            >
              <div className="font-bold truncate">{item.title}</div>
              <div className="text-xs truncate">{item.location}</div>
              {item.memo && (
                <div className="text-[10px] truncate">
                  {item.memo.length > 50
                    ? item.memo.slice(0, 50) + "..."
                    : item.memo}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) return <div className="p-4">불러오는 중...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">
        {timetable.ownerName}님의 시간표 ({timetable.year}년{" "}
        {timetable.semester}학기)
      </h1>
      <div className="grid grid-cols-8 text-center border-b font-semibold">
        <div className="bg-gray-100">시간</div>
        {days.map((d) => (
          <div key={d} className="bg-gray-100">
            {d}
          </div>
        ))}
      </div>
      {hours.map((hour) => (
        <div key={hour} className="grid grid-cols-8 h-20">
          <div className="border text-sm flex items-center justify-center">
            오후 {hour > 12 ? hour - 12 : hour}시
          </div>
          {days.map((d) => (
            <div
              key={d}
              className="border-l-[0.5px] border-b-[0.5px] border-solid border-gray-100"
            >
              {renderCells(d, hour)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
