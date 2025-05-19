import { useEffect, useState } from "react";
import { getNoticeDetail, updateNotice, deleteNotice } from "../../apis/notice";

export default function NoticeDetailModal({
  isAdmin,
  noticeId,
  onClose,
  onUpdate,
}) {
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const [file, setFile] = useState(null);

  const fetchDetail = async () => {
    try {
      const res = await getNoticeDetail(noticeId);
      setNotice(res.data);
      setForm({
        title: res.data.title,
        content: res.data.content,
      });
    } catch (err) {
      console.error("공지사항 상세 조회 실패", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (noticeId) {
      fetchDetail();
    }
  }, [noticeId]);

  const handleUpdate = async () => {
    try {
      await updateNotice(notice.id, form, file);
      alert("공지사항이 수정되었습니다.");
      setIsEditing(false);
      onUpdate?.(); // 목록 새로고침
      fetchDetail(); // 최신 데이터 다시 반영
    } catch (err) {
      alert("수정 중 오류가 발생했습니다.", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteNotice(notice.id);
      alert("공지사항이 삭제되었습니다.");
      onClose();
      onUpdate?.(); // 목록 새로고침
    } catch (err) {
      alert("삭제 중 오류가 발생했습니다.", err);
    }
  };

  if (!noticeId) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow max-h-[90vh] overflow-y-auto">
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <>
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  rows={5}
                  className="w-full border rounded px-3 py-2"
                />
                {/* <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full"
                /> */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                    } else {
                      setFile(null); // 선택 안 했으면 null 처리
                    }
                  }}
                  className="w-full"
                />
                <p className="text-sm text-gray-400 mt-4 font-semibold">
                  이미지는 최대 1MB 까지 가능합니다.
                </p>
                <div className="flex justify-end pt-2 gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    저장
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold mb-2">{notice.title}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(notice.createdAt).toLocaleString()}
                </p>
                <div className="text-sm text-gray-700 whitespace-pre-line mb-4">
                  {notice.content}
                </div>
                {notice.attachmentUrl && (
                  <div className="mb-4">
                    <img
                      src={notice.attachmentUrl}
                      alt="첨부 이미지"
                      className="max-w-full rounded border"
                    />
                  </div>
                )}
                <div className="flex justify-end  mt-4 gap-2">
                  {isAdmin && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                      수정
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 border rounded text-red-500 hover:bg-red-50"
                    >
                      삭제
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    닫기
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
