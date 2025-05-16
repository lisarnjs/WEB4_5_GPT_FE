import React from "react";

const EnrollmentPeriodTable = ({
  periods,
  onSelect,
  onDelete,
  selectedId,
  isLoading,
}) => (
  <div className="bg-white rounded-lg shadow overflow-x-auto">
    <table className="min-w-max w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[140px]">
            학교명
          </th>
          <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[80px]">
            학년도
          </th>
          <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[80px]">
            학년
          </th>
          <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[80px]">
            학기
          </th>
          <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[140px]">
            시작일
          </th>
          <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[140px]">
            종료일
          </th>
          <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[100px]">
            관리
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {periods.map((period) => (
          <tr
            key={period.id}
            className={selectedId === period.id ? "bg-blue-50" : ""}
          >
            <td className="px-6 py-4 whitespace-nowrap">
              {period.universityName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{period.year}학년도</td>
            <td className="px-6 py-4 whitespace-nowrap">{period.grade}학년</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {period.semester}학기
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{period.startDate}</td>
            <td className="px-6 py-4 whitespace-nowrap">{period.endDate}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex gap-2">
                <button
                  onClick={() => onSelect(period)}
                  className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                >
                  수정
                </button>
                <button
                  onClick={() => onDelete(period.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                >
                  삭제
                </button>
              </div>
            </td>
          </tr>
        ))}
        {periods.length === 0 && !isLoading && (
          <tr>
            <td colSpan={7} className="text-center py-8 text-gray-400">
              등록된 수강신청기간이 없습니다.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default EnrollmentPeriodTable;
