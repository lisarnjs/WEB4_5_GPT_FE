import { dayToKorList } from "../../constants/date.constants";

export default function RegisterCourseTable({ courses }) {
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
            courses.map((course) => (
              <tr key={course.courseId} className="text-center border-t">
                <td className="py-2">{course.major}</td>
                <td>{course.title}</td>
                <td>{course.professor}</td>
                <td>{course.grade}학년</td>
                <td>{course.semester}학기</td>
                <td>{course.credit}</td>
                <td>{course.location}</td>
                <td>
                  {course.schedule.map((s) => (
                    <p>
                      {dayToKorList[s.day] ?? ""} {s.startTime}-{s.endTime}
                    </p>
                  ))}
                </td>
                <td>{course.capacity}</td>
                <td>{course.availableSeats}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
