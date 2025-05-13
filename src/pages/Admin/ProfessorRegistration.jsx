import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SearchFilter from "../../components/admin/SearchFilter";
import { majorListByUniversity, universityList } from "../../apis/university";
import { fetchProfessors, updateProfessorStatus } from "../../apis/admin";

const defaultFilters = {
  universityId: "",
  professorName: "",
  majorId: "",
  status: "",
};
const PAGE_SIZE = 10;
const STATUS_OPTIONS = [
  { value: "PENDING", label: "승인대기" },
  { value: "APPROVED", label: "승인완료" },
  { value: "REJECTED", label: "승인거절" },
];

const ProfessorRegistration = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState(defaultFilters);
  const [searchParams, setSearchParams] = useState({
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

  // 교직원 목록 쿼리
  const { data: professorsData, isLoading } = useQuery({
    queryKey: ["professors", searchParams],
    queryFn: () => fetchProfessors(searchParams),
    select: (res) => res.data.data,
    keepPreviousData: true,
  });

  // 상태 변경 뮤테이션
  const { mutate, isPending } = useMutation({
    mutationFn: updateProfessorStatus,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["professors", searchParams]);
      alert(`${variables.memberId}번 교직원 상태 변경 완료`);
    },
    onError: (error, variables) => {
      alert(`${variables.memberId}번 교직원 상태 변경 실패: ${error.message}`);
    },
  });

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
      name: "professorName",
      placeholder: "교직원명 입력",
      type: "input",
    },
    {
      name: "status",
      placeholder: "전체 상태",
      options: STATUS_OPTIONS,
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

  const handleStatusChange = (memberId, newStatus) => {
    if (!newStatus) return;
    if (window.confirm("상태를 변경하시겠습니까?")) {
      mutate({ memberId, status: newStatus });
    }
  };

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const professors = professorsData?.content || [];
  const pagination = professorsData || {};

  return (
    <div className="p-6">
      <SearchFilter
        filters={filters}
        filterConfigs={filterConfigs}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {/* 결과 테이블 */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-max w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[140px]">
                대학교
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[120px]">
                교직원명
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[140px]">
                전공
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[100px]">
                현재 상태
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[120px]">
                신청일
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase min-w-[140px]">
                상태 변경
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {professors.map((prof) => (
              <tr key={prof.memberId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {prof.universityName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {prof.memberName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {prof.majorName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded ${
                      prof.status === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : prof.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {
                      STATUS_OPTIONS.find((opt) => opt.value === prof.status)
                        ?.label
                    }
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {prof.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={prof.status}
                    onChange={(e) =>
                      handleStatusChange(prof.memberId, e.target.value)
                    }
                    className="p-2 border rounded w-full"
                    disabled={isPending}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {professors.length === 0 && !isLoading && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  조회된 교직원이 없습니다.
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

export default ProfessorRegistration;
