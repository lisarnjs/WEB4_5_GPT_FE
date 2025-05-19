// import clsx from "clsx";
// import { dayToKorList } from "../../constants/date.constants";

// export default function LectureTable({ lectures, isStaff, onEdit, onDelete }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-sm border-t">
//         <thead className="bg-gray-100 text-gray-600">
//           <tr>
//             <th className="py-2">학교</th>
//             <th className="py-2">전공</th>
//             <th>강의명</th>
//             <th>교수명</th>
//             <th>강의실</th>
//             <th>수업 날짜</th>
//             <th>강의계획서</th>
//             {isStaff && <th>수정</th>}
//             {isStaff && <th>삭제</th>}
//             <th>학점</th>
//             <th>인원수</th>
//             <th>학년</th>
//             <th>학기</th>
//           </tr>
//         </thead>
//         <tbody>
//           {lectures.map((lecture, index) => (
//             <tr
//               key={lecture.id}
//               className={clsx(
//                 "text-center border-t",
//                 index % 2 !== 0 && "bg-gray-50"
//               )}
//             >
//               <td className="py-2 align-middle">{lecture.university}</td>
//               <td className="py-2 align-middle">{lecture.major}</td>
//               <td className="py-2 align-middle">{lecture.title}</td>
//               <td className="py-2 align-middle">{lecture.professor}</td>
//               <td className="py-2 align-middle">{lecture.location}</td>
//               <td className="py-2 align-middle">
//                 {lecture.schedule.map((s) => (
//                   <p>
//                     {dayToKorList[s.day] ?? ""} {s.startTime}-{s.endTime}
//                   </p>
//                 ))}
//               </td>
//               <td className="py-2 align-middle">
//                 {lecture.coursePlanAttachment ? "📄" : "-"}
//               </td>
//               {isStaff && (
//                 <td className="py-2 align-middle">
//                   <button
//                     onClick={() => onEdit(lecture)}
//                     className="hover:text-primary"
//                   >
//                     ✏️
//                   </button>
//                 </td>
//               )}
//               {isStaff && (
//                 <td className="py-2 align-middle">
//                   <button
//                     onClick={() => onDelete(lecture)}
//                     className="hover:text-red-500"
//                   >
//                     ❌
//                   </button>
//                 </td>
//               )}
//               <td className="py-2 align-middle">{lecture.credit}</td>
//               <td className="py-2 align-middle">{lecture.capacity}</td>
//               <td className="py-2 align-middle">{lecture.grade}</td>
//               <td className="py-2 align-middle">{lecture.semester}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// components/lecture/LectureTable.jsx
import clsx from "clsx";
import { useState } from "react";
import { dayToKorList } from "../../constants/date.constants";
import ImageModal from "./ImageModal";

export default function LectureTable({ lectures, isStaff, onEdit, onDelete }) {
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-t">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="py-2">학교</th>
            <th className="py-2">전공</th>
            <th>강의명</th>
            <th>교수명</th>
            <th>강의실</th>
            <th>수업 날짜</th>
            <th>강의계획서</th>
            {isStaff && <th>수정</th>}
            {isStaff && <th>삭제</th>}
            <th>학점</th>
            <th>인원수</th>
            <th>학년</th>
            <th>학기</th>
          </tr>
        </thead>
        <tbody>
          {lectures.map((lecture, index) => (
            <tr
              key={lecture.id}
              className={clsx(
                "text-center border-t",
                index % 2 !== 0 && "bg-gray-50"
              )}
            >
              <td className="py-2 align-middle">{lecture.university}</td>
              <td className="py-2 align-middle">{lecture.major}</td>
              <td className="py-2 align-middle">{lecture.title}</td>
              <td className="py-2 align-middle">{lecture.professor}</td>
              <td className="py-2 align-middle">{lecture.location}</td>
              <td className="py-2 align-middle">
                {lecture.schedule.map((s, i) => (
                  <p key={i}>
                    {dayToKorList[s.day] ?? ""} {s.startTime}-{s.endTime}
                  </p>
                ))}
              </td>
              <td className="py-2 align-middle">
                {lecture.coursePlanAttachment ? (
                  <button
                    onClick={() =>
                      setSelectedImageUrl(lecture.coursePlanAttachment)
                    }
                    className="hover:text-primary"
                  >
                    📄
                  </button>
                ) : (
                  "-"
                )}
              </td>
              {isStaff && (
                <td className="py-2 align-middle">
                  <button
                    onClick={() => onEdit(lecture)}
                    className="hover:text-primary"
                  >
                    ✏️
                  </button>
                </td>
              )}
              {isStaff && (
                <td className="py-2 align-middle">
                  <button
                    onClick={() => onDelete(lecture)}
                    className="hover:text-red-500"
                  >
                    ❌
                  </button>
                </td>
              )}
              <td className="py-2 align-middle">{lecture.credit}</td>
              <td className="py-2 align-middle">{lecture.capacity}</td>
              <td className="py-2 align-middle">{lecture.grade}</td>
              <td className="py-2 align-middle">{lecture.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ImageModal
        isOpen={!!selectedImageUrl}
        onClose={() => setSelectedImageUrl(null)}
        imageUrl={selectedImageUrl}
      />
    </div>
  );
}
