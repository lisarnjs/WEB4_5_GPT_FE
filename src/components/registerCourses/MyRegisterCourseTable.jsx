// import { dayToKorList } from "../../constants/date.constants";

// export default function MyRegisteredCourseTable({ courses }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-sm table-auto border">
//         <thead className="bg-gray-50 text-gray-600">
//           <tr>
//             <th className=" py-2">학과</th>
//             <th>과목명</th>
//             <th>교수명</th>
//             <th>학년</th>
//             <th>학기</th>
//             <th>학점</th>
//             <th>강의실</th>
//             <th>시간표</th>
//             <th>정원</th>
//             <th>잔여</th>
//             <th>수강취소</th>
//           </tr>
//         </thead>
//         <tbody>
//           {courses.length === 0 ? (
//             <tr>
//               <td colSpan={11} className="text-center py-4 text-gray-400">
//                 수강 내역이 없습니다.
//               </td>
//             </tr>
//           ) : (
//             courses.map((enrollment) => (
//               <tr
//                 key={enrollment.enrollmentId}
//                 className="border-t text-center"
//               >
//                 <td className="py-2">{enrollment.majorName}</td>
//                 <td>{enrollment.courseTitle}</td>
//                 <td>{enrollment.professorName}</td>
//                 <td>{enrollment.grade}학년</td>
//                 <td>{enrollment.semester}학기</td>
//                 <td>{enrollment.credit}</td>
//                 <td>{enrollment.location}</td>
//                 <td>
//                   {enrollment.schedule.map((s) => (
//                     <p>
//                       {dayToKorList[s.day]} {s.startTime}-{s.endTime}
//                     </p>
//                   ))}
//                 </td>
//                 <td>{enrollment.capacity}</td>
//                 <td>{enrollment.availableSeats}</td>
//                 <td>
//                   <button className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">
//                     취소
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { dayToKorList } from "../../constants/date.constants";

export default function MyRegisteredCourseTable({ courses, onCancel }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm table-auto border">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="py-2">학과</th>
            <th>과목명</th>
            <th>교수명</th>
            <th>학년</th>
            <th>학기</th>
            <th>학점</th>
            <th>강의실</th>
            <th>시간표</th>
            <th>정원</th>
            <th>잔여</th>
            <th>수강취소</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan={11} className="text-center py-4 text-gray-400">
                수강 내역이 없습니다.
              </td>
            </tr>
          ) : (
            courses.map((enrollment) => (
              <tr
                key={enrollment.enrollmentId}
                className="border-t text-center"
              >
                <td className="py-2">{enrollment.majorName}</td>
                <td>{enrollment.courseTitle}</td>
                <td>{enrollment.professorName}</td>
                <td>{enrollment.grade}학년</td>
                <td>{enrollment.semester}학기</td>
                <td>{enrollment.credit}</td>
                <td>{enrollment.location}</td>
                <td>
                  {enrollment.schedule.map((s, index) => (
                    <p key={index}>
                      {dayToKorList[s.day]} {s.startTime.slice(0, 5)}~
                      {s.endTime.slice(0, 5)}
                    </p>
                  ))}
                </td>
                <td>{enrollment.capacity}</td>
                <td>{enrollment.availableSeats}</td>
                <td>
                  <button
                    onClick={() => onCancel(enrollment.courseId)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                  >
                    취소
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
