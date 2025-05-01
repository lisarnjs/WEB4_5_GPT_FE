export default function LectureTable({ lectures, isStaff, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-t">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
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
          {lectures.map((lecture) => (
            <tr key={lecture.id} className="text-center border-b">
              <td className="py-2">{lecture.major}</td>
              <td>{lecture.title}</td>
              <td>{lecture.professor}</td>
              <td>{lecture.room}</td>
              <td>{`${lecture.day} (${lecture.time})`}</td>
              <td>{lecture.plan ? "📄" : "-"}</td>
              {isStaff && (
                <td>
                  <button
                    onClick={() => onEdit(lecture)}
                    className="hover:text-primary"
                  >
                    ✏️
                  </button>
                </td>
              )}
              {isStaff && (
                <td>
                  <button
                    onClick={() => onDelete(lecture)}
                    className="hover:text-red-500"
                  >
                    ❌
                  </button>
                </td>
              )}
              <td>{lecture.credits}</td>
              <td>{lecture.capacity}</td>
              <td>{lecture.grade}</td>
              <td>{lecture.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
