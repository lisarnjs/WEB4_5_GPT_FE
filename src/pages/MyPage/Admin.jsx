import { useState } from "react";
import PasswordCheck from "../../components/mypage/PasswordCheck";
import EmailChangeForm from "../../components/mypage/EmailChangeForm";
import PasswordChangeForm from "../../components/mypage/PasswordChangeForm";
import MypageSidebar from "../../components/mypage/MyPageSidebar";
import AdminInfo from "../../components/mypage/AdminInfo";

export default function AdminMypage() {
  const [selectedMenu, setSelectedMenu] = useState("info");
  const [verified, setVerified] = useState(false);

  // 비밀번호 검증이 필요한 메뉴 목록
  const requireVerification = ["email", "password"];
  const needsCheck = requireVerification.includes(selectedMenu) && !verified;

  // 컴포넌트 렌더링 로직
  const renderComponent = () => {
    if (needsCheck) {
      return (
        <PasswordCheck
          selectedMenu={selectedMenu}
          onVerified={() => setVerified(true)}
        />
      );
    }
    switch (selectedMenu) {
      case "info":
        return <AdminInfo />;
      case "email":
        return <EmailChangeForm userType="admin" />;
      case "password":
        return <PasswordChangeForm userType="admin" />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex bg-white font-noto">
      {/* 사이드바 */}
      {/* <div className="w-64 border-r p-4 flex flex-col gap-2">
        <button
          onClick={() => setSelectedMenu("email")}
          className={`text-left p-3 rounded transition-colors ${
            selectedMenu === "email"
              ? "bg-blue-50 text-blue-600 font-medium"
              : "hover:bg-gray-50"
          }`}
        >
          🖋 이메일 변경
        </button>
        <button
          onClick={() => setSelectedMenu("password")}
          className={`text-left p-3 rounded transition-colors ${
            selectedMenu === "password"
              ? "bg-blue-50 text-blue-600 font-medium"
              : "hover:bg-gray-50"
          }`}
        >
          🔒 비밀번호 변경
        </button>
      </div> */}
      <MypageSidebar selected={selectedMenu} onSelect={setSelectedMenu} />

      {/* 메인 컨텐츠 */}
      <main className="flex-1 p-8 max-w-3xl">{renderComponent()}</main>
    </div>
  );
}
