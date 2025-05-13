import Select from "react-select";
import BaseButton from "../common/BaseButton";
import { majorListByUniversity } from "../../apis/university";
import { useEffect, useState } from "react";
import { requestEmailCode, verifyEmailCode } from "../../apis/auth";
import { LOGIN_PATH } from "../../constants/route.constants";

export default function ProfessorSignup({
  formData,
  setFormData,
  onSubmit,
  universities,
}) {
  const [majorOptions, setMajorOptions] = useState([]);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") setIsEmailVerified(false);
  };

  const handleSelect = (selected, field) => {
    setFormData((prev) => ({ ...prev, [field]: selected }));
    if (field === "university") {
      setFormData((prev) => ({ ...prev, major: null }));
    }
  };

  // 전공 목록 조회
  useEffect(() => {
    const fetchMajors = async () => {
      if (!formData.university?.value) {
        setMajorOptions([]);
        return;
      }
      try {
        const res = await majorListByUniversity(formData.university.value);
        const formattedMajors = res.data.data.map((m) => ({
          value: m.id,
          label: m.name,
        }));
        setMajorOptions(formattedMajors);
      } catch (err) {
        setMajorOptions([]);
        console.error("전공 목록 조회 실패", err);
      }
    };
    fetchMajors();
  }, [formData.university]);

  // 인증 코드 요청
  const handleRequestCode = async (e) => {
    e.preventDefault();
    if (!formData.email) return alert("이메일을 입력해주세요.");
    setIsSendingCode(true);
    try {
      await requestEmailCode(formData.email, "SIGNUP");
      alert("인증 코드가 전송되었습니다. 이메일을 확인해주세요.");
    } catch (error) {
      alert(error.response?.data?.message || "인증 코드 전송 실패");
    } finally {
      setIsSendingCode(false);
    }
  };

  // 인증 코드 확인
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.emailCode) {
      return alert("이메일과 인증 코드를 입력해주세요.");
    }
    setIsVerifyingCode(true);
    try {
      await verifyEmailCode(formData.email, formData.emailCode, "SIGNUP");
      setIsEmailVerified(true);
      alert("이메일 인증이 완료되었습니다.");
    } catch (error) {
      alert(error.response?.data?.message || "인증 코드 확인 실패");
    } finally {
      setIsVerifyingCode(false);
    }
  };

  // 폼 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmailVerified) return alert("이메일 인증을 완료해주세요.");
    if (formData.password !== formData.confirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    onSubmit({
      ...formData,
      universityId: formData.university?.value,
      majorId: formData.major?.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 이름 */}
      <div>
        <label className="text-sm text-textSub block mb-1">이름</label>
        <input
          name="name"
          value={formData.name || ""}
          onChange={handleInput}
          className="w-full border px-3 py-2 rounded-md"
          placeholder="홍길동"
          required
        />
      </div>

      {/* 사번 */}
      <div>
        <label className="text-sm text-textSub block mb-1">사번</label>
        <input
          name="employeeId"
          value={formData.employeeId || ""}
          onChange={handleInput}
          className="w-full border px-3 py-2 rounded-md"
          placeholder="교직원 번호"
          required
        />
      </div>

      {/* 학교 & 전공 */}
      <div className="space-y-4">
        <div>
          <label className="text-sm text-textSub block mb-1">소속 학교</label>
          <Select
            options={universities}
            value={formData.university || null}
            onChange={(selected) => handleSelect(selected, "university")}
            required
          />
        </div>

        <div>
          <label className="text-sm text-textSub block mb-1">전공</label>
          <Select
            options={majorOptions}
            value={formData.major || null}
            onChange={(selected) => handleSelect(selected, "major")}
            isDisabled={!formData.university}
            required
          />
        </div>
      </div>

      {/* 이메일 인증 */}
      <div className="space-y-3">
        <div className="flex gap-2 items-center">
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInput}
            placeholder="이메일 주소"
            className="flex-1 border px-3 py-2 rounded-md"
            disabled={isEmailVerified}
            required
          />
          <BaseButton
            onClick={handleRequestCode}
            disabled={!formData.email || isEmailVerified || isSendingCode}
            className="w-auto px-4 py-2"
          >
            {isSendingCode ? "전송 중..." : "인증요청"}
          </BaseButton>
        </div>

        {formData.email && !isEmailVerified && (
          <div className="flex gap-2 items-center">
            <input
              name="emailCode"
              value={formData.emailCode || ""}
              onChange={handleInput}
              placeholder="인증 코드 6자리 입력"
              className="flex-1 border px-3 py-2 rounded-md"
              required
            />
            <BaseButton
              onClick={handleVerifyCode}
              disabled={!formData.emailCode || isVerifyingCode}
              className="w-auto px-4 py-2"
            >
              {isVerifyingCode ? "확인 중..." : "인증확인"}
            </BaseButton>
          </div>
        )}

        {isEmailVerified && (
          <p className="text-green-500 text-sm">✅ 이메일 인증 완료</p>
        )}
      </div>

      {/* 비밀번호 */}
      <div className="space-y-3">
        <input
          type="password"
          name="password"
          value={formData.password || ""}
          onChange={handleInput}
          placeholder="비밀번호 (8자 이상)"
          className="w-full border px-3 py-2 rounded-md"
          minLength="8"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword || ""}
          onChange={handleInput}
          placeholder="비밀번호 확인"
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>

      {/* 제출 버튼 */}
      <BaseButton type="submit" className="w-full py-3">
        회원가입 신청
      </BaseButton>

      <div className="text-sm text-center text-textSub">
        이미 계정이 있으신가요?{" "}
        <a href={LOGIN_PATH} className="text-primary underline">
          로그인하기
        </a>
      </div>
    </form>
  );
}
