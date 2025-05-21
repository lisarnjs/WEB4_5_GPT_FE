// src/pages/ProtectedRegisterCourses.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEnrollmentQueueStatus } from "../apis/lecture";
import RegisterCourses from "./EnrollmentCourses/RegisterCourses";
import EnrollmentWaitingPage from "./EnrollmentCourses/EnrollmentWaitingPage"; // 다음 단계에서 구현할 예정
import { HOME_PATH } from "../constants/route.constants";

export default function ProtectedRegisterCourses() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkQueue = async () => {
      try {
        const res = await getEnrollmentQueueStatus();
        setStatus(res);
      } catch (err) {
        console.error("대기열 상태 확인 실패", err);
        alert("수강신청 상태 확인에 실패했습니다.");
        navigate(HOME_PATH);
      } finally {
        setLoading(false);
      }
    };

    checkQueue();
  }, []);

  if (loading)
    return <div className="p-10 text-center">수강신청 상태 확인 중...</div>;

  if (status.allowed) {
    return <RegisterCourses />;
  } else {
    return <EnrollmentWaitingPage initialStatus={status} />;
  }
}
