// // src/pages/EnrollmentWaitingPage.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useEnrollmentQueue from "../../hooks/useEnrollmentQueue";
// import BaseButton from "../../components/common/BaseButton";
// import { getEnrollmentQueueStatus } from "../../apis/lecture";

// export default function EnrollmentWaitingPage() {
//   const {
//     allowed,
//     position,
//     estimatedWaitTime: initialWaitTime,
//     message,
//     joinQueue,
//   } = useEnrollmentQueue();

//   const [localWaitTime, setLocalWaitTime] = useState(initialWaitTime);
//   const navigate = useNavigate();

//   useEffect(() => {
//     joinQueue(); // 첫 진입 시 대기열 참여
//   }, []);

//   useEffect(() => {
//     if (allowed) {
//       navigate("/member/register-courses");
//     }
//   }, [allowed]);

//   // estimatedWaitTime이 바뀔 때마다 로컬 카운트 재설정
//   useEffect(() => {
//     setLocalWaitTime(initialWaitTime);
//   }, [initialWaitTime]);

//   // 로컬 타이머 (1초마다 감소)
//   useEffect(() => {
//     if (localWaitTime == null || allowed) return;

//     if (localWaitTime === 0 && !allowed) {
//       const checkQueueStatus = async () => {
//         try {
//           const res = await getEnrollmentQueueStatus();
//           if (res.allowed) {
//             navigate("/member/register-courses");
//           } else {
//             // 여전히 대기 중인 경우 메시지 갱신
//             console.log("아직 접속 허용되지 않았습니다.");
//           }
//         } catch (error) {
//           console.error("대기열 상태 재확인 실패:", error);
//         }
//       };

//       checkQueueStatus();
//     }

//     const timer = setInterval(() => {
//       setLocalWaitTime((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [localWaitTime, allowed]);

//   const formatTime = (sec) => {
//     const min = Math.floor(sec / 60);
//     const remainSec = sec % 60;
//     return `${min}분 ${remainSec}초`;
//   };

//   return (
//     <div className="h-full flex flex-col items-center justify-center text-center px-4">
//       <h1 className="text-2xl font-bold mb-4">⏳ 수강신청 대기 중</h1>
//       <p className="mb-2 text-md">{message}</p>
//       {position !== null && (
//         <>
//           <p className="text-lg">
//             대기 순번: <strong>{position}</strong> 번
//           </p>
//           <p className="text-lg">
//             예상 대기 시간: <strong>{formatTime(localWaitTime || 0)}</strong>
//           </p>
//         </>
//       )}
//       {localWaitTime === 0 && !allowed && (
//         <p className="mt-2 text-sm text-red-500">
//           예상 시간이 지났지만 접속이 허용되지 않았습니다. 조금만 더 기다려
//           주세요.
//         </p>
//       )}
//       <div className="mt-6">
//         <BaseButton className="px-2" onClick={() => navigate("/member/home")}>
//           나가기
//         </BaseButton>
//       </div>
//     </div>
//   );
// }

// src/pages/EnrollmentWaitingPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useEnrollmentQueuePolling from "../../hooks/useEnrollmentQueuePolling";
import BaseButton from "../../components/common/BaseButton";
import {
  getEnrollmentQueueStatus,
  releaseEnrollmentSession,
} from "../../apis/lecture";

export default function EnrollmentWaitingPage() {
  const { allowed, position, estimatedWaitTime, message, joinQueue } =
    useEnrollmentQueuePolling();

  const [localWaitTime, setLocalWaitTime] = useState(estimatedWaitTime);
  const navigate = useNavigate();

  useEffect(() => {
    joinQueue(); // 첫 진입 시 대기열 참여
  }, []);

  // useEffect(() => {
  //   if (allowed) {
  //     navigate("/member/register-courses");
  //   }
  // }, [allowed]);
  useEffect(() => {
    if (allowed) {
      const endSessionAndNavigate = async () => {
        try {
          await releaseEnrollmentSession(); // ✅ 세션 종료
        } catch (e) {
          console.error("세션 종료 실패 (입장 허용 시):", e);
        } finally {
          navigate("/member/register-courses"); // ✅ 이동
        }
      };

      endSessionAndNavigate();
    }
  }, [allowed]);

  useEffect(() => {
    setLocalWaitTime(estimatedWaitTime);
  }, [estimatedWaitTime]);

  useEffect(() => {
    if (localWaitTime == null || allowed) return;

    if (localWaitTime === 0 && !allowed) {
      const checkStatusAndCloseSession = async () => {
        try {
          const status = await getEnrollmentQueueStatus(); // 🔍 대기열 상태 재확인

          if (status.allowed) {
            await releaseEnrollmentSession(); // ✅ 세션 종료
            navigate("/member/register-courses"); // ✅ 입장
          } else {
            console.log("아직 접속 허용되지 않았습니다.");
            // 세션 종료는 하지 않음 — 여전히 대기 중이므로
          }
        } catch (error) {
          console.error("대기열 상태 확인 또는 세션 종료 실패:", error);
        }
      };

      checkStatusAndCloseSession();
    }

    const timer = setInterval(() => {
      setLocalWaitTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [localWaitTime, allowed]);

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const remainSec = sec % 60;
    return `${min}분 ${remainSec}초`;
  };

  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl font-bold mb-4">⏳ 수강신청 대기 중</h1>
      <p className="mb-2 text-md">{message}</p>
      {position !== null && (
        <>
          <p className="text-lg">
            대기 순번: <strong>{position}</strong> 번
          </p>
          <p className="text-lg">
            예상 대기 시간: <strong>{formatTime(localWaitTime || 0)}</strong>
          </p>
        </>
      )}
      {localWaitTime === 0 && !allowed && (
        <p className="mt-2 text-sm text-red-500">
          예상 시간이 지났지만 접속이 허용되지 않았습니다. 조금만 더 기다려
          주세요.
        </p>
      )}
      <div className="mt-6">
        <BaseButton className="px-2" onClick={() => navigate("/member/home")}>
          나가기
        </BaseButton>
      </div>
    </div>
  );
}
