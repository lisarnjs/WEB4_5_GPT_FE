import clsx from "clsx";
import { dayToKorList } from "../../constants/date.constants";

export default function RegisterCourseTable({ courses, onEnroll }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm  table-auto border">
        <thead className="bg-gray-100 text-gray-600">
          <tr className="bg-gray-100">
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
            <th>수강신청</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan={10} className="text-center py-4 text-gray-400">
                조회된 강의가 없습니다.
              </td>
            </tr>
          ) : (
            courses.map((course, index) => (
              <tr
                key={course.courseId}
                className={clsx(
                  "text-center border-t",
                  index % 2 !== 0 && "bg-gray-50"
                )}
              >
                <td className="py-2 align-middle">{course.major}</td>
                <td className="py-2 align-middle">{course.title}</td>
                <td className="py-2 align-middle">{course.professor}</td>
                <td className="py-2 align-middle">{course.grade}학년</td>
                <td className="py-2 align-middle">{course.semester}학기</td>
                <td className="py-2 align-middle">{course.credit}</td>
                <td className="py-2 align-middle">{course.location}</td>
                <td className="py-2 align-middle">
                  {course.schedule.map((s) => (
                    <p>
                      {dayToKorList[s.day] ?? ""} {s.startTime}-{s.endTime}
                    </p>
                  ))}
                </td>
                <td className="py-2 align-middle">{course.capacity}</td>
                <td className="py-2 align-middle">{course.availableSeats}</td>
                <td className="py-2 align-middle">
                  <button
                    className="bg-blue-500 text-white px-2 py-2 rounded text-xs hover:bg-blue-600"
                    onClick={() => onEnroll(course.id)}
                  >
                    수강신청
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
