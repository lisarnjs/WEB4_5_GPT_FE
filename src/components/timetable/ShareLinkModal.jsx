// components/timetable/ShareLinkModal.jsx
import { useState } from "react";
import BaseButton from "../common/BaseButton";

export default function ShareLinkModal({ isOpen, onClose, shareUrl }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("복사 실패 : ", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h3 className="text-lg font-bold text-textMain">공유 링크</h3>
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="w-full border px-3 py-2 rounded bg-gray-100"
        />
        <div className="flex justify-end gap-2">
          <BaseButton onClick={onClose} className="bg-gray-300 text-black">
            닫기
          </BaseButton>
          <BaseButton onClick={handleCopy}>
            {copied ? "복사됨!" : "링크 복사"}
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
