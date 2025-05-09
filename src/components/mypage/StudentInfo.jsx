// ✅ StudentMypage.jsx (마이페이지 본문 및 기능 구현)
import { useEffect, useState } from "react";
import { getStudentMyData } from "../../apis/auth";
import PasswordChangeForm from "./PasswordChangeForm";

export default function StudentMypage() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await getStudentMyData();
        console.log(res);
        setUserInfo(res.data); // ✅ 실제 데이터 바디 접근
      } catch (err) {
        alert("마이페이지 정보를 불러오지 못했습니다.", err);
      }
    };
    fetchInfo();
  }, []);

  if (!userInfo) return <p className="p-6">정보를 불러오는 중...</p>;

  const { member, studentProfile } = userInfo;

  return (
    <div className="flex  font-noto">
      {/* 본문 */}
      <div className="flex-1 p-10">
        <div className="bg-white rounded-xl p-6 shadow space-y-2">
          <h2 className="text-xl font-bold mb-4">내 정보</h2>
          <InfoRow label="이름" value={member.name} />
          <InfoRow label="학교" value={studentProfile.university} />
          <InfoRow label="역할" value={member.role} />
          <InfoRow label="학번" value={studentProfile.studentCode} />
          <InfoRow label="전공" value={studentProfile.major} />
          <InfoRow
            label="가입일"
            value={new Date(member.createdAt).toLocaleDateString()}
          />
          <InfoRow label="이메일" value={member.email} />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex gap-4">
      <div className="w-24 font-semibold text-textSub">{label}</div>
      <div className="text-textMain">{value}</div>
    </div>
  );
}
