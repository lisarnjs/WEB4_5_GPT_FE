// import { useEffect, useState } from "react";
// import Pagination from "../components/common/Pagination";
// import FilterSection from "../components/lecture/FilterSection";
// import {
//   cancelEnrollment,
//   enrollCourse,
//   fetchLectures,
//   fetchMyEnrollments,
// } from "../apis/lecture";
// import { majorListByUniversity } from "../apis/university";
// import RegisterCourseTable from "../components/registerCourses/RegisterCourseTable";
// import MyRegisteredCourseTable from "../components/registerCourses/MyRegisterCourseTable";
// import DeleteConfirmModal from "../components/common/DeleteCofirmModal";

// const itemsPerPage = 5;

// export default function RegisterCourses() {
//   // filters: UI 입력값, searchParams: 실제 API 쿼리
//   const defaultFilters = {
//     major: "",
//     grade: "1학년",
//     semester: "1학기",
//     professor: "",
//     title: "",
//   };

//   const [filters, setFilters] = useState(defaultFilters); // UI용
//   const [searchParams, setSearchParams] = useState(defaultFilters); // API용

//   const [courses, setCourses] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);

//   const [majors, setMajors] = useState([]);
//   const [error, setError] = useState(null);

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedEnrollment, setSelectedEnrollment] = useState(null);
//   const [isCancelling, setIsCancelling] = useState(false);

//   // 내 수강내역용 상태
//   const [myCourses, setMyCourses] = useState([]);
//   const [myCurrentPage, setMyCurrentPage] = useState(1);

//   // 프로필 정보
//   const member = JSON.parse(sessionStorage.getItem("member"));
//   const profile = JSON.parse(sessionStorage.getItem("profile"));

//   useEffect(() => {
//     if (!profile?.universityId) return;
//     majorListByUniversity(profile.universityId)
//       .then((res) => setMajors(res.data.data))
//       .catch((err) => console.error("대학 목록 불러오기 실패:", err));
//   }, [profile?.universityId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSearch = () => {
//     setSearchParams(filters);
//     setCurrentPage(1);
//   };

//   const handleReset = () => {
//     setFilters(defaultFilters);
//     setSearchParams(defaultFilters);
//     setCurrentPage(1);
//   };

//   // 강의 목록 조회 (searchParams, currentPage 변경 시에만 호출)
//   useEffect(() => {
//     const loadCourses = async () => {
//       setError(null);
//       try {
//         const data = await fetchLectures({
//           mode: "ENROLL",
//           title: searchParams.title || null,
//           profName: searchParams.professor || null,
//           major: searchParams.major || null,
//           grade: searchParams.grade ? Number(searchParams.grade[0]) : null,
//           semester: searchParams.semester
//             ? Number(searchParams.semester[0])
//             : null,
//           page: currentPage - 1,
//           size: itemsPerPage,
//         });

//         // API 응답에서 content와 totalElements를 사용 (LectureList와 동일)
//         if (data.data && Array.isArray(data.data.content)) {
//           setCourses(data.data.content);
//           setTotalItems(data.data.totalElements ?? data.data.content.length);
//         } else {
//           setCourses([]);
//           setTotalItems(0);
//         }
//       } catch (err) {
//         if (err.response?.data?.code === "400") {
//           setError("검색 조건이 잘못되었습니다.");
//         } else if (err.response?.data?.code === "403") {
//           setError("현재는 수강신청이 불가능한 기간입니다.");
//         } else {
//           setError("강의 목록을 불러오는 중 오류가 발생했습니다.");
//         }
//         setCourses([]);
//         setTotalItems(0);
//       }
//     };

//     loadCourses();
//   }, [searchParams, currentPage]);

//   // 내 수강내역 불러오기 (실제 API 연동)
//   useEffect(() => {
//     const loadMyCourses = async () => {
//       try {
//         const { data } = await fetchMyEnrollments();
//         // 테스트 데이터 생성 로직
//         // const testData = Array.from({ length: 20 }, (_, i) => ({
//         //   ...data[0], // 원본 데이터 구조 복사
//         //   enrollmentId: i + 1, // 고유 ID 부여
//         //   courseTitle: `테스트강의${i + 1}`, // 고유한 강의명
//         // }));
//         setMyCourses(data);
//       } catch (err) {
//         console.error("내 수강내역 조회 실패:", err);
//         setMyCourses([]); // 에러 발생 시 빈 배열 설정
//       }
//     };

//     loadMyCourses();
//   }, []); // 컴포넌트 마운트 시 1회 실행

//   // 내 수강 신청 취소
//   const handleCancelEnrollment = async () => {
//     setIsCancelling(true);
//     try {
//       await cancelEnrollment(selectedEnrollment);
//       setMyCourses((prev) =>
//         prev.filter((e) => e.enrollmentId !== selectedEnrollment)
//       );
//       setError(null);
//     } catch (err) {
//       let errorMessage = "수강 취소 중 오류가 발생했습니다.";
//       if (err.response?.data?.code === "404") {
//         errorMessage = "수강신청 내역이 존재하지 않습니다.";
//       } else if (err.response?.data?.code === "403") {
//         errorMessage = "본인의 수강 신청만 취소할 수 있습니다.";
//       }
//       setError(errorMessage);
//     } finally {
//       setIsCancelling(false);
//       setShowDeleteModal(false);
//     }
//   };

//   // 수강신청 처리
//   const handleEnrollCourse = async (courseId) => {
//     try {
//       console.log(courseId);
//       const result = await enrollCourse(courseId);
//       if (result.code === 200) {
//         // 수강신청 성공 시 내 수강목록 갱신
//         const { data } = await fetchMyEnrollments();
//         setMyCourses(data);
//         setError(null);
//       }
//     } catch (err) {
//       // 에러 처리
//       if (err.response?.data?.code === "409") {
//         setError(err.response.data.message);
//       } else {
//         setError("수강 신청 중 오류가 발생했습니다.");
//       }
//     }
//   };

//   // 내 수강내역 페이지네이션 계산
//   const myTotalItems = myCourses.length;
//   const myCoursesToShow = myCourses.slice(
//     (myCurrentPage - 1) * itemsPerPage,
//     myCurrentPage * itemsPerPage
//   );
//   // 페이지 자동 조정 로직
//   useEffect(() => {
//     if (myCoursesToShow.length === 0 && myCurrentPage > 1) {
//       setMyCurrentPage((prev) => prev - 1);
//     }
//   }, [myCoursesToShow, myCurrentPage]);

//   return (
//     <div className="min-h-[calc(100vh-theme(spacing.headerHeight))] px-6 py-10 font-noto">
//       <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow space-y-8">
//         <div className="flex justify-between items-center">
//           <h2 className="text-3xl font-bold text-textMain">
//             수강신청 강의 목록
//           </h2>
//           <div className="text-gray-500">
//             {profile && profile.major} {member && `/ ${member.name}`}
//           </div>
//         </div>

//         <FilterSection
//           filters={filters}
//           onChange={handleChange}
//           isStaff={false}
//           majors={majors}
//           onSearch={handleSearch}
//           onReset={handleReset}
//         />

//         {error && (
//           <div className="bg-red-50 text-red-500 p-4 rounded mb-4 text-center">
//             {error}
//           </div>
//         )}

//         <div className="flex-1 mt-10">
//           <div>
//             <div className="font-bold text-lg mb-2">강의목록</div>
//             <RegisterCourseTable
//               courses={courses}
//               onEnroll={handleEnrollCourse}
//             />
//             <Pagination
//               totalItems={totalItems}
//               itemsPerPage={itemsPerPage}
//               currentPage={currentPage}
//               onPageChange={setCurrentPage}
//             />
//           </div>

//           <div className="mt-10">
//             <div className="font-bold text-lg mb-2">내 수강내역</div>
//             <MyRegisteredCourseTable
//               courses={myCoursesToShow}
//               onCancel={(enrollmentId) => {
//                 setSelectedEnrollment(enrollmentId);
//                 setShowDeleteModal(true);
//               }}
//             />
//             <Pagination
//               totalItems={myTotalItems}
//               itemsPerPage={itemsPerPage}
//               currentPage={myCurrentPage}
//               onPageChange={setMyCurrentPage}
//             />
//           </div>
//         </div>
//       </div>
//       <DeleteConfirmModal
//         isOpen={showDeleteModal}
//         message="정말 수강을 취소하시겠습니까?"
//         onCancel={() => setShowDeleteModal(false)}
//         onConfirm={handleCancelEnrollment}
//         confirmBtnMessage="확인"
//         confirmDisabled={isCancelling}
//       />
//     </div>
//   );
// }

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
    grade: "1학년",
    semester: "1학기",
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
        major: searchParams.major || null,
        grade: Number(searchParams.grade[0]),
        semester: Number(searchParams.semester[0]),
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
