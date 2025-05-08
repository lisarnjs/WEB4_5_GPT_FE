// src/pages/Login.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { login } from "../apis/auth";
import EmailInput from "../components/common/EmailInput";
import PasswordInput from "../components/common/PasswordInput";
import BaseButton from "../components/common/BaseButton";
import {
  ADMIN_LOGIN_PATH,
  HOME_PATH,
  RESET_PW_PATH,
  SIGNUP_PATH,
} from "../constants/route.constants";

export default function Login() {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useAuthStore((state) => state.actions);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const {
        accessToken,
        email: userEmail,
        id,
        role,
      } = await login(email, password);

      setAccessToken(accessToken, role);
      setUser({ id, email: userEmail, role });
      navigate(HOME_PATH);
    } catch (err) {
      const message = err.response?.data?.message || "로그인에 실패했습니다.";
      setError(message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      alert("이미 로그인 되었습니다!");
      navigate(HOME_PATH);
    }
  }, []);

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
          <div>
            <a href={ADMIN_LOGIN_PATH} className="underline">
              관리자 로그인
            </a>
          </div>

          <div>
            계정이 없으신가요?{" "}
            <a href={SIGNUP_PATH} className="text-primary underline">
              회원가입
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
