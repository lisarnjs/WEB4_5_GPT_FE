export default function MyRegisteredCourseTable({ courses }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm table-auto border">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className=" py-2">학과</th>
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
            courses.map((course) => (
              <tr key={course.courseId} className="border-t text-center">
                <td className="py-2">{course.majorName}</td>
                <td>{course.courseTitle}</td>
                <td>{course.professorName}</td>
                <td>{course.grade}학년</td>
                <td>{course.semester}학기</td>
                <td>{course.credit}</td>
                <td>{course.location}</td>
                <td>
                  {course.schedule
                    .map(
                      (s) =>
                        `${s.day} ${s.startTime.slice(0, 5)}~${s.endTime.slice(
                          0,
                          5
                        )}`
                    )
                    .join(", ")}
                </td>
                <td>{course.capacity}</td>
                <td>{course.availableSeats}</td>
                <td>
                  <button className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">
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
