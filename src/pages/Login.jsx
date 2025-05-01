// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { login } from "../apis/auth";

export default function Login() {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { accessToken } = await login(email, password);
      setAccessToken(accessToken);
      navigate("/dashboard"); // 로그인 성공 후 이동할 페이지
    } catch (err) {
      const message = err.response?.data?.message || "로그인에 실패했습니다.";
      setError(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">로그인</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            이메일
          </label>
          <input
            type="email"
            className="mt-1 block w-full border px-3 py-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="학교 이메일 주소"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            type="password"
            className="mt-1 block w-full border px-3 py-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-green-700 font-semibold"
        >
          로그인
        </button>

        <div className="text-sm text-center text-subText">
          <a href="#" className="underline text-sm">
            비밀번호 찾기
          </a>
          <br />
          계정이 없으신가요?{" "}
          <a href="/signup" className="text-primary underline">
            회원가입
          </a>
        </div>
      </form>
    </div>
  );
}
