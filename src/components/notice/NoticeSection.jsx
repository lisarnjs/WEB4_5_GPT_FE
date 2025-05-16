// components/home/NoticeSection.jsx
import { useEffect, useState } from "react";
import { getNotices } from "../../apis/notice";
import NoticeModal from "./NoticeModal";
import BaseButton from "../common/BaseButton";
import Pagination from "../common/BaseButton";

export default function NoticeSection({ isAdmin }) {
  const [notices, setNotices] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const itemsPerPage = 5;

  const fetchNoticeList = async () => {
    try {
      const res = await getNotices({
        // title: searchTitle,
        page: currentPage - 1,
        size: itemsPerPage,
      });
      setNotices(res.data.content);
      setTotalItems(res.data.totalElements);
    } catch (err) {
      console.error("공지사항 조회 실패", err);
    }
  };

  useEffect(() => {
    fetchNoticeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTitle, currentPage]);

  return (
    <section className="mb-6 rounded-xl bg-white p-6 shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold">📌 공지사항</h2>
        {isAdmin && (
          <BaseButton onClick={() => setShowModal(true)}>
            +게시물 등록
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
        <span>수정일</span>
      </div>

      {notices.map((notice, index) => (
        <div
          key={notice.id}
          className="grid grid-cols-5 text-sm text-gray-700 py-2 border-b"
        >
          <span>{(currentPage - 1) * itemsPerPage + index + 1}</span>
          <span className="col-span-2 truncate">{notice.title}</span>
          <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
          <span>{new Date(notice.modifiedAt).toLocaleDateString()}</span>
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
        onCreated={fetchNoticeList}
      />
    </section>
  );
}
