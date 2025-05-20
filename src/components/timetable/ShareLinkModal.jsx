// import { useState } from "react";
// import BaseButton from "../common/BaseButton";

// export default function ShareLinkModal({
//   isOpen,
//   onClose,
//   shareUrl,
//   expiresAt,
//   visibility,
//   onVisibilityChange,
// }) {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(shareUrl);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       alert("복사 실패 : ", err);
//     }
//   };

//   if (!isOpen) return null;

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toISOString().split("T")[0]; // "2025-05-19"
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4 border">
//         <h3 className="text-lg font-bold">📌 시간표 공유</h3>

//         {/* 공유 링크 */}
//         <div className="space-y-2">
//           <div className="text-sm">🔗 공유 링크:</div>
//           <input
//             type="text"
//             value={shareUrl}
//             readOnly
//             className="w-full border px-3 py-2 rounded bg-gray-100 text-sm"
//           />
//           <BaseButton onClick={handleCopy} className="w-full">
//             {copied ? "✅ 복사됨!" : "📋 복사하기"}
//           </BaseButton>
//         </div>

//         {/* 공개 범위 설정 */}
//         <div className="text-sm space-y-1">
//           <div>🚫 공개 범위 설정:</div>
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="visibility"
//               value="PUBLIC"
//               checked={visibility === "PUBLIC"}
//               onChange={(e) => onVisibilityChange(e.target.value)}
//             />
//             링크를 아는 사람만 보기 가능
//           </label>
//           <label className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
//             <input
//               type="radio"
//               name="visibility"
//               value="PRIVATE"
//               onChange={(e) => onVisibilityChange(e.target.value)}
//             />
//             비공개 (나만 보기)
//           </label>
//         </div>

//         {/* 유효기간 */}
//         {expiresAt && (
//           <div className="text-sm border-t pt-2 text-gray-600">
//             🛡️ 유효기간: 7일 후 자동 만료
//             <br />
//             (만료일: {formatDate(expiresAt)})
//           </div>
//         )}

//         <div className="text-center pt-2">
//           <BaseButton
//             onClick={onClose}
//             className="w-full bg-gray-300 text-black"
//           >
//             닫기
//           </BaseButton>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import BaseButton from "../common/BaseButton";

export default function ShareLinkModal({
  isOpen,
  onClose,
  shareUrl,
  expiresAt,
  visibility,
  onVisibilityChange,
  onGenerateLink, // ✅ 링크 생성 핸들러 prop
}) {
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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4 border">
        <h3 className="text-lg font-bold">📌 시간표 공유</h3>

        {/* 공개 범위 설정 */}
        <div className="text-sm space-y-1">
          <div>🚫 공개 범위 설정:</div>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="visibility"
              value="PUBLIC"
              checked={visibility === "PUBLIC"}
              onChange={(e) => onVisibilityChange(e.target.value)}
            />
            링크를 아는 사람만 보기 가능
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="visibility"
              value="PRIVATE"
              onChange={(e) => onVisibilityChange(e.target.value)}
            />
            비공개 (나만 보기)
          </label>
        </div>

        {/* 링크 생성 버튼 */}
        {!shareUrl && (
          <BaseButton onClick={onGenerateLink} className="w-full">
            🔗 링크 생성
          </BaseButton>
        )}

        {/* 생성된 공유 링크 표시 */}
        {shareUrl && (
          <div className="space-y-2 pt-2 border-t text-sm">
            <div>🔗 공유 링크:</div>
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100 text-sm"
            />
            <BaseButton onClick={handleCopy} className="w-full">
              {copied ? "✅ 복사됨!" : "📋 복사하기"}
            </BaseButton>

            <div className="text-gray-600 pt-2">
              🛡️ 유효기간: 7일 후 자동 만료
              <br />
              (만료일: {formatDate(expiresAt)})
            </div>
          </div>
        )}

        <div className="text-center pt-2">
          <BaseButton
            onClick={onClose}
            className="w-full bg-gray-300 text-black"
          >
            닫기
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
