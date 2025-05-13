import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchFilter from "../../components/admin/SearchFilter";
import { majorListByUniversity, universityList } from "../../apis/university";
import { fetchMembers } from "../../apis/admin";

const defaultFilters = {
  universityId: "",
  majorId: "",
  grade: "",
  semester: "",
};
const PAGE_SIZE = 10;

const ManageUser = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [searchParams, setSearchParams] = useState({
    ...defaultFilters,
    page: 0,
    size: PAGE_SIZE,
  });

  // 대학 목록 쿼리
  const { data: universities = [] } = useQuery({
    queryKey: ["universities"],
    queryFn: universityList,
    select: (res) => res.data.data,
  });

  // 전공 목록 쿼리
  const { data: majors = [] } = useQuery({
    queryKey: ["majors", filters.universityId],
    queryFn: () =>
      filters.universityId
        ? majorListByUniversity(filters.universityId).then(
            (res) => res.data.data
          )
        : [],
    enabled: !!filters.universityId,
  });

  // 회원 목록 쿼리
  const {
    data: membersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["members", searchParams],
    queryFn: () => fetchMembers(searchParams).then((res) => res.data.data),
    keepPreviousData: true,
  });

  // 필터 설정
  const filterConfigs = [
    {
      name: "universityId",
      placeholder: "전체 학교",
      options: universities.map((uni) => ({
        value: uni.id,
        label: uni.name,
      })),
    },
    {
      name: "majorId",
      placeholder: "전체 전공",
      options: majors.map((major) => ({
        value: major.id,
        label: major.name,
      })),
      disabled: !filters.universityId,
    },
    {
      name: "grade",
      placeholder: "전체 학년",
      options: [1, 2, 3, 4].map((grade) => ({
        value: grade,
        label: `${grade}학년`,
      })),
    },
    {
      name: "semester",
      placeholder: "전체 학기",
      options: [1, 2].map((semester) => ({
        value: semester,
        label: `${semester}학기`,
      })),
    },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "universityId" && { majorId: "" }),
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({
      ...filters,
      page: 0,
      size: PAGE_SIZE,
    });
  };

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  // 안전한 데이터 구조
  const members = membersData?.content || [];
  const pagination = membersData || {};

  return (
    <div className="p-6">
      <SearchFilter
        filters={filters}
        filterConfigs={filterConfigs}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {/* 로딩 및 에러 상태 */}
      {isLoading && <p className="text-center py-4">로딩 중...</p>}
      {error && (
        <p className="text-red-500 text-center py-4">
          {error.message || "회원 목록 조회에 실패했습니다."}
        </p>
      )}

      {/* 결과 테이블 */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-max w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[120px]">
                학번
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[100px]">
                이름
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[140px]">
                대학교
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[120px]">
                전공
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[80px]">
                학년
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[80px]">
                학기
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[120px]">
                가입일
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.memberId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.studentCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.memberName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.universityName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.majorName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.grade}학년
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.semester}학기
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.createdAt}
                </td>
              </tr>
            ))}
            {members.length === 0 && !isLoading && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  조회된 회원이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white rounded-b-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <span className="text-sm text-gray-700">
            총 {pagination.totalElements ?? 0}건 • 페이지{" "}
            {(pagination.number ?? 0) + 1} / {pagination.totalPages ?? 1}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange((pagination.number ?? 0) - 1)}
              disabled={(pagination.number ?? 0) === 0}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              이전
            </button>
            <button
              onClick={() => handlePageChange((pagination.number ?? 0) + 1)}
              disabled={
                (pagination.number ?? 0) + 1 === (pagination.totalPages ?? 1)
              }
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
