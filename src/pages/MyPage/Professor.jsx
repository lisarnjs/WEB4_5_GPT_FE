// pages/mypage/ProfessorMypage.jsx
import { useState } from "react";
import ProfessorInfo from "../../components/mypage/ProfessorInfo";
import PasswordCheck from "../../components/mypage/PasswordCheck";
import EmailChangeForm from "../../components/mypage/EmailChangeForm";
import PasswordChangeForm from "../../components/mypage/PasswordChangeForm";
import WithdrawForm from "../../components/mypage/WithdrawForm";
import MypageSidebar from "../../components/mypage/MyPageSidebar";
import ProfessorLectureList from "../../components/mypage/ProfessorLectureList";

export default function ProfessorMypage() {
  const [selectedMenu, setSelectedMenu] = useState("info");
  const [verified, setVerified] = useState(false); // 비밀번호 인증 여부

  const requireVerification = ["email", "password", "withdraw"];
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
        return <ProfessorInfo />;
      case "email":
        return <EmailChangeForm />;
      case "password":
        return <PasswordChangeForm />;
      case "withdraw":
        return <WithdrawForm />;
      case "lecture":
        return <ProfessorLectureList />;

      default:
        return <ProfessorInfo />;
    }
  };

  return (
    <div className="h-full flex bg-background font-noto">
      <MypageSidebar selected={selectedMenu} onSelect={setSelectedMenu} />
      <main className="flex-1 p-10">{renderComponent()}</main>
    </div>
  );
}
