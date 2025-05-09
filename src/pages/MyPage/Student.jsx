// pages/mypage/StudentMypage.jsx
import { useState } from "react";
import StudentInfo from "../../components/mypage/StudentInfo";
import PasswordCheck from "../../components/mypage/PasswordCheck";
import EmailChangeForm from "../../components/mypage/EmailChangeForm";
import PasswordChangeForm from "../../components/mypage/PasswordChangeForm";
import WithdrawForm from "../../components/mypage/WithdrawForm";
import MajorChangeForm from "../../components/mypage/MajorChangeForm";
import MypageSidebar from "../../components/mypage/MyPageSidebar";

export default function StudentMypage() {
  const [selectedMenu, setSelectedMenu] = useState("info");
  const [verified, setVerified] = useState(false); // 비밀번호 인증 여부

  const requireVerification = ["email", "password", "withdraw", "major"];
  const needsCheck = requireVerification.includes(selectedMenu) && !verified;

  const renderComponent = () => {
    if (needsCheck)
      return (
        <PasswordCheck
          selectedMenu={selectedMenu}
          onVerified={() => setVerified(true)}
        />
      );
    switch (selectedMenu) {
      case "info":
        return <StudentInfo />;
      case "email":
        return <EmailChangeForm />;
      case "password":
        return <PasswordChangeForm />;
      case "withdraw":
        return <WithdrawForm />;
      case "major":
        return <MajorChangeForm />;
      default:
        return <StudentInfo />;
    }
  };

  return (
    <div className="h-full flex  bg-white font-noto">
      <MypageSidebar selected={selectedMenu} onSelect={setSelectedMenu} />
      <main className="flex-1 p-10">{renderComponent()}</main>
    </div>
  );
}
