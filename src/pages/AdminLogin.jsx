// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { adminLogin } from "../apis/auth";
import EmailInput from "../components/common/EmailInput";
import PasswordInput from "../components/common/PasswordInput";
import BaseButton from "../components/common/BaseButton";
import { HOME_PATH, RESET_PW_PATH } from "../constants/route.constants";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setAccessToken } = useAuthStore((state) => state.actions);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { accessToken } = await adminLogin(email, password);
      setAccessToken(accessToken, "admin");
      navigate(HOME_PATH);
    } catch (err) {
      const message = err.response?.data?.message || "로그인에 실패했습니다.";
      setError(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background font-noto px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md shadow-xl rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-textMain text-center">로그인</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />

        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <BaseButton type="submit" disabled={!email || !password}>
          로그인
        </BaseButton>

        <div className="text-sm text-center text-textSub space-y-1">
          <a href={RESET_PW_PATH} className="underline">
            비밀번호 찾기
          </a>
        </div>
      </form>
    </div>
  );
}
