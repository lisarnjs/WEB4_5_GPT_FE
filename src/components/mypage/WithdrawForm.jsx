// 회원 탈퇴
import { useNavigate } from "react-router-dom";
import BaseButton from "../common/BaseButton";
import { withdrawMember } from "../../apis/auth";

export default function WithdrawForm() {
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    const confirmed = window.confirm("정말로 회원 탈퇴하시겠습니까?");
    if (!confirmed) return;

    try {
      const res = await withdrawMember();
      alert(res.message || "회원 탈퇴가 완료되었습니다.");

      // ✅ 로컬스토리지 정리 및 리다이렉트
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      navigate("/");
    } catch (error) {
      const msg =
        error?.response?.data?.message || "회원 탈퇴 중 오류가 발생했습니다.";
      alert(msg);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow space-y-4">
      <h2 className="text-xl font-bold mb-4">회원 탈퇴</h2>
      <p className="text-sm text-gray-700">
        탈퇴 시 계정 정보는 30일 간 보관되며, 그 이후 완전히 삭제됩니다.
      </p>
      <BaseButton
        className="bg-red-500 hover:bg-red-600"
        onClick={handleWithdraw}
      >
        회원 탈퇴하기
      </BaseButton>
    </div>
  );
}
