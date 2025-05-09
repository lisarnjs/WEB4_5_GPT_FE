// components/mypage/ProfessorInfo.jsx
import { useEffect, useState } from "react";
import { getProfessorMyData } from "../../apis/auth";
import InfoRow from "./InfoRow";

export default function ProfessorInfo() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProfessorMyData();
        setInfo(res.data);
      } catch {
        alert("교수 정보를 불러오지 못했습니다.");
      }
    };
    fetch();
  }, []);

  if (!info) return <p className="p-6">정보를 불러오는 중...</p>;

  const { member, professorProfile } = info;

  return (
    <div className="bg-white rounded-xl p-6 shadow space-y-2">
      <h2 className="text-xl font-bold mb-4">내 정보</h2>
      <InfoRow label="이름" value={member.name} />
      <InfoRow label="학교" value={professorProfile.university} />
      <InfoRow label="역할" value={member.role} />
      <InfoRow label="교번" value={professorProfile.employeeId} />
      <InfoRow label="전공" value={professorProfile.major} />
      <InfoRow
        label="가입일"
        value={new Date(member.createdAt).toLocaleDateString()}
      />
      <InfoRow label="이메일" value={member.email} />
    </div>
  );
}
