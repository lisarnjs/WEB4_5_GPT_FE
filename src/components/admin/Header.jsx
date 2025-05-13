// // components/admin/Header.jsx
// import React, { useState, useEffect } from "react";
// import { majorListByUniversity, universityList } from "../../apis/university";

// const Header = () => {
//   const [universities, setUniversities] = useState([]);
//   const [majors, setMajors] = useState([]);
//   const [selectedUniversity, setSelectedUniversity] = useState("");
//   const [selectedMajor, setSelectedMajor] = useState("");

//   useEffect(() => {
//     const loadUniversities = async () => {
//       try {
//         const res = await universityList();
//         console.log(res);
//         setUniversities(res.data.data);
//       } catch (error) {
//         console.error("대학 목록 조회 실패:", error);
//       }
//     };
//     loadUniversities();
//   }, []);

//   useEffect(() => {
//     if (!selectedUniversity) return;

//     const loadMajors = async () => {
//       try {
//         const res = await majorListByUniversity(selectedUniversity);
//         setMajors(res.data);
//         setSelectedMajor(""); // 대학 변경 시 전공 초기화
//       } catch (error) {
//         console.error("전공 목록 조회 실패:", error);
//       }
//     };
//     loadMajors();
//   }, [selectedUniversity]);

//   return (
//     <header className="bg-gray-800 text-white py-4 px-8 shadow-lg">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         <h1 className="text-xl font-bold">관리자 대시보드</h1>

//         <div className="flex gap-4">
//           <select
//             value={selectedUniversity}
//             onChange={(e) => setSelectedUniversity(e.target.value)}
//             className="px-4 py-2 rounded bg-gray-700 border border-gray-600 hover:bg-gray-600 transition-colors"
//           >
//             <option value="">대학 선택</option>
//             {universities.map((uni) => (
//               <option key={uni.id} value={uni.id}>
//                 {uni.name}
//               </option>
//             ))}
//           </select>

//           <select
//             value={selectedMajor}
//             onChange={(e) => setSelectedMajor(e.target.value)}
//             className="px-4 py-2 rounded bg-gray-700 border border-gray-600 hover:bg-gray-600 transition-colors disabled:opacity-50"
//             disabled={!selectedUniversity}
//           >
//             <option value="">전공 선택</option>
//             {majors.map((major) => (
//               <option key={major.id} value={major.id}>
//                 {major.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

export default function Header() {
  return (
    <header className="bg-gray-800 text-white py-4 px-8 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">관리자 대시보드</h1>
      </div>
    </header>
  );
}
