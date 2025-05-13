// src/components/auth/StudentSignup.jsx
import Select from "react-select";
import BaseButton from "../common/BaseButton";
import { majorListByUniversity } from "../../apis/university";
import { useEffect, useState } from "react";
import { requestEmailCode, verifyEmailCode } from "../../apis/auth";

const gradeOptions = [
  { value: 1, label: "1학년" },
  { value: 2, label: "2학년" },
  { value: 3, label: "3학년" },
  { value: 4, label: "4학년" },
];

const semesterOptions = [
  { value: 1, label: "1학기" },
  { value: 2, label: "2학기" },
];

export default function StudentSignup({
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
    if (name === "email") setIsEmailVerified(false); // 이메일 바뀌면 인증 초기화
  };

  const handleSelect = (selected, field) => {
    setFormData((prev) => ({ ...prev, [field]: selected }));
    if (field === "university") {
      setFormData((prev) => ({ ...prev, major: null })); // 대학 바뀌면 전공 초기화
    }
  };

  // 대학 선택 시 해당 대학의 전공 목록 조회
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

  // 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!isEmailVerified) return alert("이메일 인증을 완료해주세요.");
    if (formData.password !== formData.confirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    onSubmit({
      ...formData,
      universityId: formData.university?.value,
      majorId: formData.major?.value,
      grade: Number(formData.grade?.value),
      semester: Number(formData.semester?.value),
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
      {/* 학번 */}
      <div>
        <label className="text-sm text-textSub block mb-1">학번</label>
        <input
          name="studentCode"
          value={formData.studentCode || ""}
          onChange={handleInput}
          className="w-full border px-3 py-2 rounded-md"
          placeholder="20231234"
          required
        />
      </div>
      {/* 학교 */}
      <div>
        <label className="text-sm text-textSub block mb-1">소속 학교</label>
        <Select
          options={universities}
          value={formData.university || null}
          onChange={(selected) => handleSelect(selected, "university")}
          required
        />
      </div>
      {/* 전공 */}
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
      {/* 학년 / 학기 */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="text-sm text-textSub block mb-1">학년</label>
          <Select
            options={gradeOptions}
            value={formData.grade || null}
            onChange={(selected) => handleSelect(selected, "grade")}
            required
          />
        </div>
        <div className="w-1/2">
          <label className="text-sm text-textSub block mb-1">학기</label>
          <Select
            options={semesterOptions}
            value={formData.semester || null}
            onChange={(selected) => handleSelect(selected, "semester")}
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
        회원가입 완료
      </BaseButton>
    </form>
  );
}
