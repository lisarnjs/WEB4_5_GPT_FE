// src/pages/Home.tsx

import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import ShortcutCard from "../components/common/ShortcutCard";
import {
  MY_PAGE_PATH,
  REGISTER_COURSES_PATH,
} from "../constants/route.constants";
import { getStudentMyData } from "../apis/auth";

export default function Home() {
  const [myData, setMyData] = useState(null);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      try {
        const res = getStudentMyData();
        console.log(res);
        setMyData(res);
      } catch (err) {
        console.log("err: ", err);
      }
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-8 text-gray-800">
      {/* 사용자 환영 메시지 */}
      <section className="mb-6 rounded-xl bg-white p-6 shadow">
        <p className="text-lg font-semibold">안녕하세요! 👋</p>
        <p className="mt-1 text-sm text-gray-600">
          컴퓨터공학과 / 소프트웨어전공 / 1학년 / A대학교
        </p>
      </section>

      {/* 공지사항 */}
      <section className="mb-6 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-2 text-base font-semibold">📌 공지사항</h2>
        <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700">
          <span>번호</span>
          <span>날짜</span>
          <span className="col-span-2">제목</span>
        </div>
        <div className="mt-2 grid grid-cols-4 gap-4 text-sm text-gray-600">
          <span>1</span>
          <span>2025-05-07</span>
          <span className="col-span-2 truncate">중간고사 일정 변경 안내</span>
        </div>
      </section>

      {/* 기능 바로가기 */}
      <section className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-base font-semibold">기능 바로가기</h2>
        <div className="flex flex-wrap gap-4">
          <ShortcutCard
            to={REGISTER_COURSES_PATH}
            icon="📝"
            label="수강신청"
            colorClass="bg-blue-100 text-blue-700"
          />
          {/* <ShortcutCard
            to="/evaluations"
            icon="✏️"
            label="강의평가"
            colorClass="bg-yellow-100 text-yellow-700"
          />
          <ShortcutCard
            to="/votes"
            icon="🌐"
            label="학생회 투표"
            colorClass="bg-green-100 text-green-700"
          />
          <ShortcutCard
            to="/notices"
            icon="📢"
            label="공지사항 보기"
            colorClass="bg-red-100 text-red-700"
          /> */}
          <ShortcutCard
            to={MY_PAGE_PATH}
            icon="⚙️"
            label="마이페이지"
            colorClass="bg-gray-100 text-gray-800"
          />
        </div>
      </section>
    </div>
  );
}
