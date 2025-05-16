// src/pages/Home.tsx

import { useEffect, useState } from "react";
import { getProfessorMyData, getStudentMyData } from "../apis/auth";
import { WelcomeSection } from "../components/home/WelcomeSection";
import NoticeSection from "../components/notice/NoticeSection";

export default function Home() {
  const [myData, setMyData] = useState(null);

  const roleMyDataAPI = {
    STUDENT: getStudentMyData,
    PROFESSOR: getProfessorMyData,
  };

  const role = localStorage.getItem("role");

  useEffect(() => {
    let ignore = false;
    const role = localStorage.getItem("role");
    const needToFetchMyDataRole = role === "STUDENT" || role === "PROFESSOR";
    if (!ignore && role === "ADMIN") {
      setMyData({
        member: {
          role: "ADMIN",
        },
      });
    }
    if (!ignore && needToFetchMyDataRole) {
      const fetchData = async () => {
        try {
          const res = await roleMyDataAPI[role]();
          console.log(res.data);

          sessionStorage.setItem(
            "profile",
            JSON.stringify(
              res.data?.studentProfile || res.data?.professorProfile || null
            )
          );
          sessionStorage.setItem(
            "member",
            JSON.stringify(res.data?.member || null)
          );

          setMyData(res.data);
        } catch (err) {
          console.log("err: ", err);
        }
      };
      fetchData();
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className=" bg-white px-6 py-8 text-gray-800">
      {/* 환영 메시지 섹션 */}
      {myData ? (
        <WelcomeSection myData={myData} />
      ) : (
        <div className="mb-6 rounded-xl bg-white p-6 shadow animate-pulse">
          <div className="h-6 w-64 bg-gray-100 rounded mb-2"></div>
          <div className="h-4 w-80 bg-gray-100 rounded"></div>
        </div>
      )}

      {/* 공지사항 */}
      {/* <section className="mb-6 rounded-xl bg-white p-6 shadow">

      </section> */}
      <NoticeSection isAdmin={role === "ADMIN"} />
    </div>
  );
}
