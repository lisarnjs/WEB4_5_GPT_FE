// 비밀번호 확인 폼
// src/components/mypage/PasswordCheck.jsx
import { useState } from "react";
import BaseButton from "../common/BaseButton";
import { verifyPassword } from "../../apis/auth";

const passwordCheckTitle = {
  email: "이메일 변경",
  password: "비밀번호 변경",
  withdraw: "회원 탈퇴",
  major: "전공 변경",
};

export default function PasswordCheck({ selectedMenu, onVerified }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return setError("비밀번호를 입력해주세요.");
    setError("");
    try {
      setLoading(true);
      await verifyPassword(password);
      onVerified();
    } catch (err) {
      const message = err.response?.data?.message || "비밀번호 확인 실패";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white rounded-xl p-6 shadow space-y-4"
    >
      <h2 className="text-xl font-bold text-textMain">비밀번호 확인</h2>
      <p className="text-sm text-textSub">
        {passwordCheckTitle[selectedMenu]}을 위해 비밀번호를 한번 더
        입력해주세요.
      </p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        placeholder="비밀번호 입력"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-end">
        <BaseButton type="submit" disabled={loading}>
          확인
        </BaseButton>
      </div>
    </form>
  );
}
