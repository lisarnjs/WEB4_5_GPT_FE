// src/components/admin/EnrollmentPeriodPagination.jsx
import React from "react";

const EnrollmentPeriodPagination = ({ pagination, onPageChange }) => {
  const handlePrev = () => onPageChange(pagination.number - 1);
  const handleNext = () => onPageChange(pagination.number + 1);

  return (
    <div className="px-6 py-4 border-t border-gray-200 bg-white rounded-b-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <span className="text-sm text-gray-700">
          총 {pagination.totalElements}건 • 페이지 {pagination.number + 1} /{" "}
          {pagination.totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={pagination.number === 0}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            이전
          </button>
          <button
            onClick={handleNext}
            disabled={pagination.number + 1 >= pagination.totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPeriodPagination;
