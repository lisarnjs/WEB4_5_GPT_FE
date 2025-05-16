import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { universityList } from "../../apis/university";
import {
  fetchEnrollmentPeriods,
  createEnrollmentPeriod,
  updateEnrollmentPeriod,
  deleteEnrollmentPeriod,
} from "../../apis/admin";
import EnrollmentPeriodFilters from "../../components/admin/EnrollmentPeriodFilters";
import EnrollmentPeriodTable from "../../components/admin/EnrollmentPeriodTable";
import EnrollmentPeriodPagination from "../../components/admin/EnrollmentPeriodPagination";
import EnrollmentPeriodForm from "../../components/admin/EnrollPeriodForm";

const defaultFilters = {
  universityName: "",
  startDateFrom: "",
  startDateTo: "",
  endDateFrom: "",
  endDateTo: "",
  page: 0,
  size: 10,
};

const PAGE_SIZE = 10;

const ManageRegistrationPeriod = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState(defaultFilters);
  const [submittedFilters, setSubmittedFilters] = useState(defaultFilters);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [formData, setFormData] = useState({
    universityId: "",
    year: "",
    grade: "",
    semester: "",
    startDate: "",
    endDate: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // 대학 목록 조회
  const { data: universities = [] } = useQuery({
    queryKey: ["universities"],
    queryFn: universityList,
    select: (res) => res.data.data,
  });

  // 수강신청 기간 조회
  const { data, isLoading } = useQuery({
    queryKey: ["enrollmentPeriods", submittedFilters],
    queryFn: () => fetchEnrollmentPeriods(submittedFilters),
    select: (res) => ({
      periods: res.data.data.content || [],
      pagination: {
        totalElements: res.data.data.totalElements,
        totalPages: res.data.data.totalPages,
        number: res.data.data.number,
      },
    }),
    keepPreviousData: true,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  // CRUD Mutation
  const createMutation = useMutation({
    mutationFn: createEnrollmentPeriod,
    onSuccess: () => handleMutationSuccess(),
    onError: (error) => handleMutationError(error, "등록"),
  });

  const updateMutation = useMutation({
    mutationFn: (data) => updateEnrollmentPeriod(selectedPeriod.id, data),
    onSuccess: () => handleMutationSuccess(),
    onError: (error) => handleMutationError(error, "수정"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEnrollmentPeriod,
    onSuccess: () => handleMutationSuccess(),
    onError: (error) => handleMutationError(error, "삭제"),
  });

  const handleMutationSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["enrollmentPeriods"] });
    setSelectedPeriod(null);
    setFormData({
      universityId: "",
      year: "",
      grade: "",
      semester: "",
      startDate: "",
      endDate: "",
    });
    setErrorMessage("");
  };

  const handleMutationError = (error, action) => {
    setErrorMessage(
      error.response?.data?.message || `${action} 처리에 실패했습니다.`
    );
  };

  // 필터 변경 핸들러
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // 검색 실행 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    setSubmittedFilters({ ...filters, page: 0 });
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    setSubmittedFilters((prev) => ({ ...prev, page: newPage }));
  };

  // 폼 입력 변경 핸들러
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const payload = {
      ...formData,
      startDate: formData.startDate.split("T")[0],
      endDate: formData.endDate.split("T")[0],
    };

    selectedPeriod.id
      ? updateMutation.mutate(payload)
      : createMutation.mutate(payload);
  };

  // 삭제 핸들러
  const handleDelete = (courseId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate(courseId);
    }
  };

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      {/* 좌측 영역 */}
      <div className="w-full md:w-3/5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">수강신청기간 관리</h2>
          <button
            onClick={() => {
              setSelectedPeriod({});
              setFormData({
                universityId: "",
                year: "",
                grade: "",
                semester: "",
                startDate: "",
                endDate: "",
              });
            }}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            신규 등록
          </button>
        </div>

        <EnrollmentPeriodFilters
          universities={universities}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {errorMessage}
          </div>
        )}

        <EnrollmentPeriodTable
          periods={data?.periods || []}
          onSelect={(period) => {
            setSelectedPeriod(period);
            setFormData({
              universityId: period.universityId,
              year: period.year,
              grade: period.grade,
              semester: period.semester,
              startDate: `${period.startDate}T00:00`,
              endDate: `${period.endDate}T00:00`,
            });
          }}
          onDelete={handleDelete}
          selectedId={selectedPeriod?.id}
          isLoading={isLoading}
        />

        <EnrollmentPeriodPagination
          pagination={
            data?.pagination || {
              totalElements: 0,
              totalPages: 1,
              number: 0,
            }
          }
          onPageChange={handlePageChange}
        />
      </div>

      {/* 우측 폼 영역 */}
      {selectedPeriod && (
        <EnrollmentPeriodForm
          universities={universities}
          formData={formData}
          onSubmit={handleSubmit}
          onCancel={() => setSelectedPeriod(null)}
          onChange={handleFormChange}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
          errorMessage={errorMessage}
          isEditMode={!!selectedPeriod.id}
        />
      )}
    </div>
  );
};

export default ManageRegistrationPeriod;
