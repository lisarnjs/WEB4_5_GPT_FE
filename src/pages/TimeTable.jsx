import { useEffect, useState } from "react";
import BaseButton from "../components/common/BaseButton";
import {
  createMyTimetable,
  createTimetableShareLink,
  getMyTimetable,
} from "../apis/timeTable";
import AddScheduleModal from "../components/timetable/AddScheduleModal";
import { dayToEngList } from "../constants/date.constants";
import ShareLinkModal from "../components/timetable/ShareLinkModal";

const now = new Date();
const currentYear = now.getFullYear();
const currentSemester = now.getMonth() + 1 <= 6 ? 1 : 2;

const days = ["월", "화", "수", "목", "금", "토", "일"];
const hours = Array.from({ length: 12 }, (_, i) => 9 + i); // 9~20시

export default function TimeTablePage() {
  const [year, setYear] = useState(currentYear);
  const [semester, setSemester] = useState(currentSemester);
  const [timetable, setTimetable] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  // 시간표 공유 - 내부 상태 추가
  const [shareUrl, setShareUrl] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [expiresAt, setExpiresAt] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  // 공유 링크 생성 함수
  const handleGenerateLink = async () => {
    if (!timetable?.timetableId) return;
    try {
      const res = await createTimetableShareLink({
        timetableId: timetable.timetableId,
        visibility,
      });
      const pathname = new URL(res.shareUrl).pathname;
      setShareUrl(`${window.location.origin}${pathname}`);
      setExpiresAt(res.expiresAt);
    } catch (err) {
      alert("공유 링크 생성에 실패했습니다.");
      console.error(err);
    }
  };

  // 공유 버튼 핸들러
  // const handleShare = async () => {
  //   if (!timetable?.timetableId) {
  //     alert("시간표가 존재하지 않습니다.");
  //     return;
  //   }

  //   try {
  //     const res = await createTimetableShareLink({
  //       timetableId: timetable.timetableId,
  //       visibility,
  //     });

  //     const origin = window.location.origin;
  //     const url = res.shareUrl;
  //     const pathname = new URL(url).pathname;
  //     const fullUrl = `${origin}${pathname}`;
  //     setShareUrl(fullUrl);
  //     setExpiresAt(res.expiresAt);
  //     setShowShareModal(true);
  //   } catch (err) {
  //     alert("공유 링크 생성에 실패했습니다.", err);
  //   }
  // };

  const fetchTimetable = async () => {
    setLoading(true);
    setNotFound(false);
    try {
      const res = await getMyTimetable({ year, semester });
      console.log(res);
      setTimetable(res);
    } catch (err) {
      if (err.response?.status === 404) {
        setNotFound(true);
      } else {
        alert("시간표 조회 실패");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      await createMyTimetable({ year, semester });
      await fetchTimetable();
    } catch (err) {
      alert("시간표 생성 실패", err);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, [year, semester]);

  const renderCells = (dayKor, hour) => {
    const dayEng = dayToEngList[dayKor]; // ✅ 한글 → 영문 변환

    const items =
      timetable?.timetableItems?.flatMap((item) =>
        item.schedule
          .filter((s) => s.day === dayEng) // ✅ 영문 기준 비교
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-[calc(100vh-theme(spacing.headerHeight))]">
      <div className="w-60 bg-green-100 p-4 space-y-4">
        <div className="text-sm text-gray-600 flex gap-2 items-center">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border rounded px-1 py-0.5"
          >
            {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(
              (y) => (
                <option key={y} value={y}>
                  {y}년
                </option>
              )
            )}
          </select>

          <span>[</span>
          <select
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            className="border rounded px-1 py-0.5"
          >
            <option value={1}>1학기</option>
            <option value={2}>2학기</option>
          </select>
          <span>]</span>
        </div>
        <BaseButton onClick={fetchTimetable}>학기 시간표 조회</BaseButton>
        {notFound && (
          <BaseButton onClick={handleCreate} className="bg-yellow-400">
            학기 시간표 생성
          </BaseButton>
        )}
        {/* 추가 기능 버튼 */}
        <BaseButton onClick={() => setShowShareModal(true)}>
          시간표 공유
        </BaseButton>
        <BaseButton onClick={() => setShowAddModal(true)}>
          시간표 등록 - 직접입력
        </BaseButton>
        <BaseButton disabled>시간표 등록 - 강의 불러오기</BaseButton>
        <BaseButton disabled>내 시간표 불러오기</BaseButton>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <h2 className="text-2xl font-bold mb-4">시간표</h2>
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
                {renderCells(d.toUpperCase(), hour)}
              </div>
            ))}
          </div>
        ))}
      </div>

      <AddScheduleModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        timetableId={timetable?.timetableId}
        onSuccess={() => fetchTimetable()} // 성공 후 다시 조회
      />

      <ShareLinkModal
        isOpen={showShareModal}
        onClose={() => {
          setShowShareModal(false);
          setShareUrl("");
          setExpiresAt("");
        }}
        shareUrl={shareUrl}
        expiresAt={expiresAt}
        visibility={visibility}
        onVisibilityChange={setVisibility}
        onGenerateLink={handleGenerateLink}
      />
    </div>
  );
}
