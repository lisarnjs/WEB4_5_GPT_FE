// src/hooks/useEnrollmentQueuePolling.js
import { useEffect, useState } from "react";
import { getEnrollmentQueueStatus, joinEnrollmentQueue } from "../apis/lecture";

export default function useEnrollmentQueuePolling() {
  const [allowed, setAllowed] = useState(false);
  const [position, setPosition] = useState(null);
  const [estimatedWaitTime, setEstimatedWaitTime] = useState(null);
  const [message, setMessage] = useState("");

  const joinQueue = async () => {
    try {
      const res = await joinEnrollmentQueue();
      const { allowed, position, estimatedWaitTime, message } = res;
      setAllowed(allowed);
      setPosition(position);
      setEstimatedWaitTime(estimatedWaitTime);
      setMessage(message);
    } catch (err) {
      console.error("대기열 참여 실패:", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await getEnrollmentQueueStatus();
        setAllowed(res.allowed);
        setPosition(res.position);
        setEstimatedWaitTime(res.estimatedWaitTime);
        setMessage(res.message);
      } catch (err) {
        console.error("대기열 상태 조회 실패:", err);
      }
    }, 5000); // 5초마다 polling

    return () => clearInterval(interval);
  }, []);

  return {
    allowed,
    position,
    estimatedWaitTime,
    message,
    joinQueue,
  };
}
