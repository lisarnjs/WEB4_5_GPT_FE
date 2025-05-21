// src/hooks/useEnrollmentQueue.js
import { useEffect, useState, useRef } from "react";
import { joinEnrollmentQueue } from "../apis/lecture";

export default function useEnrollmentQueue() {
  const [allowed, setAllowed] = useState(false);
  const [position, setPosition] = useState(null);
  const [estimatedWaitTime, setEstimatedWaitTime] = useState(null);
  const [message, setMessage] = useState("");
  const eventSourceRef = useRef(null);

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
    if (eventSourceRef.current) return;

    // SSE 구독
    eventSourceRef.current = new EventSource("/api/enrollments/events");

    eventSourceRef.current.addEventListener("INITIAL_STATUS", (event) => {
      const data = JSON.parse(event.data);
      setAllowed(data.allowed);
      setPosition(data.position);
      setEstimatedWaitTime(data.estimatedWaitTime);
      setMessage(data.message);
    });

    eventSourceRef.current.addEventListener("QUEUE_STATUS", (event) => {
      const data = JSON.parse(event.data);
      setAllowed(data.allowed);
      setPosition(data.position);
      setEstimatedWaitTime(data.estimatedWaitTime);
      setMessage(data.message);
    });

    // HEARTBEAT 이벤트는 무시 가능

    eventSourceRef.current.onerror = () => {
      console.warn("SSE 연결 오류");
      eventSourceRef.current?.close();
    };

    return () => {
      eventSourceRef.current?.close();
    };
  }, []);

  return {
    allowed,
    position,
    estimatedWaitTime,
    message,
    joinQueue,
  };
}
