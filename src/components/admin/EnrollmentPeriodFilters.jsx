import React from "react";

const EnrollmentPeriodFilters = ({
  universities,
  filters,
  onFilterChange,
  onSearch,
  isLoading,
}) => {
  const handleDateFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ target: { name, value } });
  };

  return (
    <form onSubmit={onSearch} className="mb-6 bg-white p-4 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* 학교 선택 */}
        <select
          name="universityName"
          value={filters.universityName}
          onChange={onFilterChange}
          className="p-2 border rounded disabled:opacity-50"
          disabled={isLoading}
        >
          <option value="">전체 학교</option>
          {universities.map((uni) => (
            <option key={uni.id} value={uni.name}>
              {uni.name}
            </option>
          ))}
        </select>

        {/* 날짜 필터 그룹 */}
        <div className="col-span-4 grid grid-cols-4 gap-4">
          <input
            type="date"
            name="startDateFrom"
            value={filters.startDateFrom}
            onChange={handleDateFilterChange}
            className="p-2 border rounded"
            placeholder="시작일 시작"
          />
          <input
            type="date"
            name="startDateTo"
            value={filters.startDateTo}
            onChange={handleDateFilterChange}
            className="p-2 border rounded"
            placeholder="시작일 종료"
          />
          <input
            type="date"
            name="endDateFrom"
            value={filters.endDateFrom}
            onChange={handleDateFilterChange}
            className="p-2 border rounded"
            placeholder="종료일 시작"
          />
          <input
            type="date"
            name="endDateTo"
            value={filters.endDateTo}
            onChange={handleDateFilterChange}
            className="p-2 border rounded"
            placeholder="종료일 종료"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={isLoading}
        >
          조회
        </button>
      </div>
    </form>
  );
};

export default EnrollmentPeriodFilters;
