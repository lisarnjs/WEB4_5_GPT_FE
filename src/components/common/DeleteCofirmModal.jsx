export default function DeleteConfirmModal({
  isOpen,
  onCancel,
  onConfirm,
  message,
  confirmBtnMessage = "삭제",
  confirmDisabled,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow space-y-6">
        <p className="text-center text-textMain font-medium">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            disabled={confirmDisabled}
          >
            {confirmBtnMessage}
          </button>
        </div>
      </div>
    </div>
  );
}
