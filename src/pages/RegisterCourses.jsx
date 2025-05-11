import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Pagination from "../components/common/Pagination";
import FilterSection from "../components/lecture/FilterSection";
import {
  cancelEnrollment,
  enrollCourse,
  fetchLectures,
  fetchMyEnrollments,
} from "../apis/lecture";
import { majorListByUniversity } from "../apis/university";
import RegisterCourseTable from "../components/registerCourses/RegisterCourseTable";
import MyRegisteredCourseTable from "../components/registerCourses/MyRegisterCourseTable";
import DeleteConfirmModal from "../components/common/DeleteCofirmModal";

const itemsPerPage = 5;

export default function RegisterCourses() {
  const queryClient = useQueryClient();

  const member = JSON.parse(sessionStorage.getItem("member"));
  const profile = JSON.parse(sessionStorage.getItem("profile"));

  const defaultFilters = {
    major: "",
    grade: "",
    semester: "",
    professor: "",
    title: "",
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [searchParams, setSearchParams] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [myCurrentPage, setMyCurrentPage] = useState(1);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setSearchParams(filters);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setSearchParams(defaultFilters);
    setCurrentPage(1);
  };

  // 🔸 전공 목록
  const { data: majors = [] } = useQuery({
    queryKey: ["majors", profile?.universityId],
    queryFn: () =>
      majorListByUniversity(profile.universityId).then((res) => res.data.data),
    enabled: !!profile?.universityId,
  });

  // 🔸 강의 목록
  const {
    data: lectureData,
    isError: isLectureError,
    error: lectureError,
  } = useQuery({
    queryKey: ["lectures", searchParams, currentPage],
    queryFn: () =>
      fetchLectures({
        mode: "ENROLL",
        title: searchParams.title || null,
        profName: searchParams.professor || null,
        majorId: searchParams.major || null,
        grade: searchParams.grade || null,
        semester: searchParams.semester || null,
        page: currentPage - 1,
        size: itemsPerPage,
      }),
    keepPreviousData: true,
  });

  const courses = lectureData?.data?.content || [];
  const totalItems = lectureData?.data?.totalElements || 0;

  // 🔸 내 수강 내역
  const { data: myCoursesData = [], refetch: refetchMyCourses } = useQuery({
    queryKey: ["myCourses"],
    queryFn: () => fetchMyEnrollments().then((res) => res.data),
  });

  const myCoursesToShow = myCoursesData.slice(
    (myCurrentPage - 1) * itemsPerPage,
    myCurrentPage * itemsPerPage
  );

  // 🔸 수강 신청
  const enrollMutation = useMutation({
    mutationFn: enrollCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myCourses"] });
    },
  });

  // 🔸 수강 취소
  const cancelMutation = useMutation({
    mutationFn: cancelEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myCourses"] });
      setShowDeleteModal(false);
    },
  });

  // 🔸 수강 신청 핸들러
  const handleEnrollCourse = async (courseId) => {
    try {
      await enrollMutation.mutateAsync(courseId);
      refetchMyCourses();
    } catch (err) {
      alert(err.response?.data?.message || "수강 신청 실패");
    }
  };

  // 🔸 수강 취소 핸들러
  const handleCancelEnrollment = async () => {
    try {
      await cancelMutation.mutateAsync(selectedEnrollment);
    } catch (err) {
      alert(err.response?.data?.message || "수강 취소 실패");
    }
  };

  return (
    <div className="min-h-[calc(100vh-theme(spacing.headerHeight))] px-6 py-10 font-noto">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-textMain">
            수강신청 강의 목록
          </h2>
          <div className="text-gray-500">
            {profile?.major} {member && `/ ${member.name}`}
          </div>
        </div>

        <FilterSection
          filters={filters}
          onChange={handleChange}
          onSearch={handleSearch}
          onReset={handleReset}
          majors={majors}
          isStaff={false}
        />

        {isLectureError && (
          <div className="bg-red-50 text-red-500 p-4 rounded mb-4 text-center">
            {lectureError?.response?.data?.message ||
              "강의 목록을 불러올 수 없습니다."}
          </div>
        )}

        <div className="flex-1 mt-10">
          <div>
            <div className="font-bold text-lg mb-2">강의목록</div>
            <RegisterCourseTable
              courses={courses}
              onEnroll={handleEnrollCourse}
            />
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>

          <div className="mt-10">
            <div className="font-bold text-lg mb-2">내 수강내역</div>
            <MyRegisteredCourseTable
              courses={myCoursesToShow}
              onCancel={(id) => {
                setSelectedEnrollment(id);
                setShowDeleteModal(true);
              }}
            />
            <Pagination
              totalItems={myCoursesData.length}
              itemsPerPage={itemsPerPage}
              currentPage={myCurrentPage}
              onPageChange={setMyCurrentPage}
            />
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        message="정말 수강을 취소하시겠습니까?"
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleCancelEnrollment}
        confirmBtnMessage="확인"
        confirmDisabled={cancelMutation.isPending}
      />
    </div>
  );
}
