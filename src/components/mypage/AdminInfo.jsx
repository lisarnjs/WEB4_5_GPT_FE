// ✅ AdminInfo.jsx (관리자 마이페이지 본문 및 기능 구현)
import { useEffect, useState } from "react";
import InfoRow from "./InfoRow";
import { getAdminMyData } from "../../apis/auth";

export default function AdminInfo() {
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await getAdminMyData();
        setAdminInfo(res.data); // ✅ 실제 데이터 바디 접근
      } catch (err) {
        alert("관리자 정보를 불러오지 못했습니다.", err);
      }
    };
    fetchInfo();
  }, []);

  if (!adminInfo) return <p className="p-6">정보를 불러오는 중...</p>;

  // 관리자 응답 데이터 구조에 맞게 분해
  const { name, email, role, createdAt, id } = adminInfo;

  return (
    <div className="flex font-noto">
      {/* 본문 */}
      <div className="flex-1 p-10">
        <div className="bg-white rounded-xl p-6 shadow space-y-2">
          <h2 className="text-xl font-bold mb-4">내 정보</h2>
          <InfoRow label="이름" value={name} />
          <InfoRow label="이메일" value={email} />
          <InfoRow label="역할" value={role} />
          <InfoRow label="관리자 ID" value={id} />
          <InfoRow
            label="가입일"
            value={new Date(createdAt).toLocaleDateString()}
          />
        </div>
      </div>
    </div>
  );
}
