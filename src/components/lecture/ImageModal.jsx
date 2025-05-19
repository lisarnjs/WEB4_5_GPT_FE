// export default function ImageModal({ isOpen, onClose, imageUrl }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-bold">강의계획서</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-black">
//             ✕
//           </button>
//         </div>
//         <img
//           src={imageUrl}
//           alt="강의계획서"
//           className="w-full h-auto object-contain rounded"
//         />
//       </div>
//     </div>
//   );
// }

export default function ImageModal({ isOpen, imageUrl, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // 바깥쪽 클릭 시 닫기
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-4xl max-h-[90vh]">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-2 right-2 font-bold text-white bg-black bg-opacity-50  px-3  py-1 hover:bg-opacity-70"
          onClick={onClose}
          aria-label="닫기"
        >
          X
        </button>

        {/* 이미지 */}
        <img
          src={imageUrl}
          alt="강의계획서"
          className="object-contain w-full max-h-[90vh]"
        />
      </div>
    </div>
  );
}
