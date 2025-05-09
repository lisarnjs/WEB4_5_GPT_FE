// import { useEffect, useState } from "react";
// import Pagination from "../components/common/Pagination";
// import FilterSection from "../components/lecture/FilterSection";
// import { fetchLectures } from "../apis/lecture";
// import { majorListByUniversity } from "../apis/university";
// import RegisterCourseTable from "../components/registerCourses/RegisterCourseTable";
// import MyRegisteredCourseTable from "../components/registerCourses/MyRegisterCourseTable";

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

//   // 내 수강내역용 상태
//   const [myCourses, setMyCourses] = useState([]);

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

//         if (data.data && Array.isArray(data.data.content)) {
//           setCourses(data.data.content);
//           setTotalItems(data.data.total || data.data.content.length);
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

//   // 내 수강내역 불러오기 (API 연동 필요, 임시 데이터)
//   useEffect(() => {
//     // fetchMyLectures()로 대체 필요
//     setMyCourses([
//       {
//         courseId: 1,
//         majorName: "컴퓨터공학과",
//         courseTitle: "운영체제",
//         professorName: "김교수",
//         grade: 3,
//         semester: 2,
//         credit: 3,
//         location: "OOO",
//         schedule: [{ day: "금", startTime: "13:00", endTime: "16:00" }],
//         capacity: 50,
//         availableSeats: 2,
//       },
//     ]);
//   }, []);

//   return (
//     <div className="h-[calc(100vh-theme(spacing.headerHeight))] px-6 py-10 font-noto">
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
//             <RegisterCourseTable courses={courses} />
//             <Pagination
//               totalItems={totalItems}
//               itemsPerPage={itemsPerPage}
//               currentPage={currentPage}
//               onPageChange={setCurrentPage}
//             />
//           </div>

//           <div className="mt-10">
//             <div className="font-bold text-lg mb-2">내 수강내역</div>
//             <MyRegisteredCourseTable courses={myCourses} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import Pagination from "../components/common/Pagination";
import FilterSection from "../components/lecture/FilterSection";
import { fetchLectures } from "../apis/lecture";
import { majorListByUniversity } from "../apis/university";
import RegisterCourseTable from "../components/registerCourses/RegisterCourseTable";
import MyRegisteredCourseTable from "../components/registerCourses/MyRegisterCourseTable";

const itemsPerPage = 5;

export default function RegisterCourses() {
  // filters: UI 입력값, searchParams: 실제 API 쿼리
  const defaultFilters = {
    major: "",
    grade: "1학년",
    semester: "1학기",
    professor: "",
    title: "",
  };

  const [filters, setFilters] = useState(defaultFilters); // UI용
  const [searchParams, setSearchParams] = useState(defaultFilters); // API용

  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [majors, setMajors] = useState([]);
  const [error, setError] = useState(null);

  // 내 수강내역용 상태
  const [myCourses, setMyCourses] = useState([]);

  // 프로필 정보
  const member = JSON.parse(sessionStorage.getItem("member"));
  const profile = JSON.parse(sessionStorage.getItem("profile"));

  useEffect(() => {
    if (!profile?.universityId) return;
    majorListByUniversity(profile.universityId)
      .then((res) => setMajors(res.data.data))
      .catch((err) => console.error("대학 목록 불러오기 실패:", err));
  }, [profile?.universityId]);

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

  // 강의 목록 조회 (searchParams, currentPage 변경 시에만 호출)
  useEffect(() => {
    const loadCourses = async () => {
      setError(null);
      try {
        const data = await fetchLectures({
          mode: "ENROLL",
          title: searchParams.title || null,
          profName: searchParams.professor || null,
          major: searchParams.major || null,
          grade: searchParams.grade ? Number(searchParams.grade[0]) : null,
          semester: searchParams.semester
            ? Number(searchParams.semester[0])
            : null,
          page: currentPage - 1,
          size: itemsPerPage,
        });

        // API 응답에서 content와 totalElements를 사용 (LectureList와 동일)
        if (data.data && Array.isArray(data.data.content)) {
          setCourses(data.data.content);
          setTotalItems(data.data.totalElements ?? data.data.content.length);
        } else {
          setCourses([]);
          setTotalItems(0);
        }
      } catch (err) {
        if (err.response?.data?.code === "400") {
          setError("검색 조건이 잘못되었습니다.");
        } else if (err.response?.data?.code === "403") {
          setError("현재는 수강신청이 불가능한 기간입니다.");
        } else {
          setError("강의 목록을 불러오는 중 오류가 발생했습니다.");
        }
        setCourses([]);
        setTotalItems(0);
      }
    };

    loadCourses();
  }, [searchParams, currentPage]);

  // 내 수강내역 불러오기 (API 연동 필요, 임시 데이터)
  useEffect(() => {
    // fetchMyLectures()로 대체 필요
    setMyCourses([
      {
        courseId: 1,
        majorName: "컴퓨터공학과",
        courseTitle: "운영체제",
        professorName: "김교수",
        grade: 3,
        semester: 2,
        credit: 3,
        location: "OOO",
        schedule: [{ day: "금", startTime: "13:00", endTime: "16:00" }],
        capacity: 50,
        availableSeats: 2,
      },
    ]);
  }, []);

  return (
    <div className="min-h-[calc(100vh-theme(spacing.headerHeight))] px-6 py-10 font-noto">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-textMain">
            수강신청 강의 목록
          </h2>
          <div className="text-gray-500">
            {profile && profile.major} {member && `/ ${member.name}`}
          </div>
        </div>

        <FilterSection
          filters={filters}
          onChange={handleChange}
          isStaff={false}
          majors={majors}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <div className="flex-1 mt-10">
          <div>
            <div className="font-bold text-lg mb-2">강의목록</div>
            <RegisterCourseTable courses={courses} />
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>

          <div className="mt-10">
            <div className="font-bold text-lg mb-2">내 수강내역</div>
            <MyRegisteredCourseTable courses={myCourses} />
          </div>
        </div>
      </div>
    </div>
  );
}
