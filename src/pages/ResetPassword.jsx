import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailInput from "../components/common/EmailInput";
import PasswordInput from "../components/common/PasswordInput";
import BaseButton from "../components/common/BaseButton";
import { requestEmailCode, verifyEmailCode, resetPassword } from "../apis/auth";
import { LOGIN_PATH } from "../constants/route.constants";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });

  const [codeRequested, setCodeRequested] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequestCode = async (e) => {
    e.preventDefault();
    if (!form.email) {
      setMessage({ type: "error", text: "이메일을 입력해주세요." });
      return;
    }
    try {
      setLoading(true);
      await requestEmailCode(form.email);
      setCodeRequested(true);
      setMessage({ type: "success", text: "인증 코드가 전송되었습니다." });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "인증 코드 요청 실패",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!form.code) {
      setMessage({ type: "error", text: "인증 코드를 입력해주세요." });
      return;
    }
    try {
      setLoading(true);
      await verifyEmailCode(form.email, form.code);
      setCodeVerified(true);
      setMessage({ type: "success", text: "인증이 완료되었습니다." });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "인증 코드 확인 실패",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage({ type: "error", text: "비밀번호가 일치하지 않습니다." });
      return;
    }
    if (!codeVerified) {
      setMessage({ type: "error", text: "이메일 인증을 완료해주세요." });
      return;
    }

    try {
      setLoading(true);
      await resetPassword(form.email, form.password);
      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/login");
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "비밀번호 재설정 실패",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 font-noto">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-textMain mb-4">
          비밀번호 재설정
        </h2>

        {/* 메시지 표시 */}
        {message.text && (
          <p
            className={`text-sm text-center ${
              message.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* 이메일 입력 */}
        <EmailInput value={form.email} onChange={handleInput} />

        {/* 인증 코드 */}
        <div className="flex gap-2 items-center">
          <input
            name="code"
            value={form.code}
            onChange={handleInput}
            placeholder="인증 코드 입력"
            className="flex-1 border px-3 py-2 rounded-md"
            disabled={!codeRequested || codeVerified}
          />
          <BaseButton
            onClick={codeRequested ? handleVerifyCode : handleRequestCode}
            className="w-auto px-4 py-2"
            disabled={loading}
          >
            {codeRequested ? "인증확인" : "인증요청"}
          </BaseButton>
        </div>

        {/* 비밀번호 */}
        <PasswordInput
          value={form.password}
          onChange={handleInput}
          name="password"
        />
        <PasswordInput
          value={form.confirmPassword}
          onChange={handleInput}
          name="confirmPassword"
        />

        <BaseButton type="submit" disabled={loading}>
          비밀번호 재설정 완료
        </BaseButton>

        <div className="text-sm text-center text-textSub">
          <a href={LOGIN_PATH} className="text-primary underline">
            로그인 페이지로 돌아가기
          </a>
        </div>
      </form>
    </div>
  );
}
