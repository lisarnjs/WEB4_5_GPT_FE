// src/components/notice/NoticeModal.jsx
import { useState } from "react";
import { createNotice } from "../../apis/notice";
import BaseButton from "../common/BaseButton";

export default function NoticeModal({ isOpen, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify({ title, content })], {
        type: "application/json",
      })
    );
    if (file) formData.append("file", file);

    try {
      setIsSubmitting(true);
      await createNotice(formData);
      alert("공지사항이 등록되었습니다.");
      onSuccess();
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || "공지사항 등록 실패";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">공지사항 등록</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="제목"
            className="w-full border px-4 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="내용"
            className="w-full border px-4 py-2 rounded h-40"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-2">
            <BaseButton
              type="button"
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={onClose}
              disabled={isSubmitting}
            >
              취소
            </BaseButton>
            <BaseButton type="submit" disabled={isSubmitting}>
              등록
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  );
}
