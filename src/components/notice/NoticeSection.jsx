import { useEffect, useState } from "react";
import { getNotices } from "../../apis/notice";
import BaseButton from "../common/BaseButton";
import Pagination from "../common/Pagination";
import useDebounce from "../../hooks/useDebounce";
import NoticeDetailModal from "./NoticeDetailModal";
import NoticeModal from "./NoticeModal";

export default function NoticeSection({ isAdmin }) {
  const [notices, setNotices] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const debouncedSearchTitle = useDebounce(searchTitle, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState(null);

  const itemsPerPage = 5;

  const fetchNoticeList = async (
    page = currentPage,
    keyword = debouncedSearchTitle
  ) => {
    try {
      const res = await getNotices({
        title: keyword,
        page: page - 1,
        size: itemsPerPage,
      });
      setNotices(res.data.content);
      setTotalItems(res.data.totalElements);
    } catch (err) {
      console.error("공지사항 조회 실패", err);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // 검색어 변경 시 1페이지로
    fetchNoticeList(1, debouncedSearchTitle);
  }, [debouncedSearchTitle]);

  useEffect(() => {
    fetchNoticeList(currentPage, debouncedSearchTitle);
  }, [currentPage]);

  const handleClickNotice = (id) => {
    setSelectedNoticeId(id);
  };

  return (
    <section className="mb-6 rounded-xl bg-white p-6 shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold w-full">📌 공지사항</h2>
        {isAdmin && (
          <BaseButton onClick={() => setShowModal(true)}>
            공지사항 등록
          </BaseButton>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="공지사항 검색"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-sm"
        />
      </div>

      <div className="grid grid-cols-5 font-semibold text-sm border-b pb-2">
        <span>번호</span>
        <span className="col-span-2">제목</span>
        <span>등록일</span>
      </div>

      {notices.map((notice, index) => (
        <div
          key={notice.id}
          className="grid grid-cols-5 text-sm text-gray-700 py-2 border-b cursor-pointer hover:bg-gray-50"
          onClick={() => handleClickNotice(notice.id)}
        >
          <span>{(currentPage - 1) * itemsPerPage + index + 1}</span>
          <span className="col-span-2 truncate">{notice.title}</span>
          <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
        </div>
      ))}

      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <NoticeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => fetchNoticeList(1)}
      />

      {selectedNoticeId && (
        <NoticeDetailModal
          noticeId={selectedNoticeId}
          onClose={() => setSelectedNoticeId(null)}
          onUpdate={() => fetchNoticeList(currentPage, debouncedSearchTitle)}
        />
      )}
    </section>
  );
}
