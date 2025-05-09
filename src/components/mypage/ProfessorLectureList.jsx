import { useEffect, useState } from "react";
import { getProfessorMyLectures } from "../../apis/auth";

export default function ProfessorLectureList() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await getProfessorMyLectures();
        setLectures(res.data); // 실제 응답 구조에 따라 수정
      } catch (err) {
        setError("강의 목록을 불러오지 못했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLectures();
  }, []);

  if (loading) return <p>강의 목록을 불러오는 중...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!lectures.length) return <p>등록된 강의가 없습니다.</p>;

  return (
    <div className="bg-white rounded-xl p-6 shadow space-y-4">
      <h2 className="text-xl font-bold mb-4">내 강의 목록</h2>
      <ul className="divide-y text-sm">
        {lectures.map((lecture) => (
          <li key={lecture.id} className="py-2">
            <div className="font-semibold text-textMain">{lecture.title}</div>
            <div className="text-gray-500 text-sm">
              {lecture.major} / {lecture.location} / 학년 {lecture.grade}, 학기{" "}
              {lecture.semester}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
