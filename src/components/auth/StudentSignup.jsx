// src/components/Signup/StudentSignup.jsx
import Select from "react-select";
import EmailInput from "../common/EmailInput";
import PasswordInput from "../common/PasswordInput";
import BaseButton from "../common/BaseButton";
import { LOGIN_PATH } from "../../constants/route.constants";

const universityOptions = [
  { value: "1", label: "Unihub대학교" },
  { value: "2", label: "AI대학교" },
];

const majorOptions = [
  { value: "101", label: "컴퓨터공학" },
  { value: "102", label: "경영학" },
];

const gradeOptions = [
  { value: "1", label: "1학년" },
  { value: "2", label: "2학년" },
  { value: "3", label: "3학년" },
  { value: "4", label: "4학년" },
];

const semesterOptions = [
  { value: "1", label: "1학기" },
  { value: "2", label: "2학기" },
];

export default function StudentSignup({ formData, setFormData, onSubmit }) {
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (selected, field) => {
    setFormData((prev) => ({ ...prev, [field]: selected }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 상위에 최종 전달
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
        />
      </div>

      {/* 학교 */}
      <div>
        <label className="text-sm text-textSub block mb-1">소속 학교</label>
        <Select
          options={universityOptions}
          value={formData.university || null}
          onChange={(selected) => handleSelect(selected, "university")}
        />
      </div>

      {/* 전공 */}
      <div>
        <label className="text-sm text-textSub block mb-1">전공</label>
        <Select
          options={majorOptions}
          value={formData.major || null}
          onChange={(selected) => handleSelect(selected, "major")}
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
          />
        </div>
        <div className="w-1/2">
          <label className="text-sm text-textSub block mb-1">학기</label>
          <Select
            options={semesterOptions}
            value={formData.semester || null}
            onChange={(selected) => handleSelect(selected, "semester")}
          />
        </div>
      </div>

      {/* 이메일 */}
      <EmailInput value={formData.email || ""} onChange={handleInput} />

      {/* 인증코드 */}
      <div className="flex gap-2 items-center">
        <input
          name="emailCode"
          value={formData.emailCode || ""}
          onChange={handleInput}
          placeholder="인증 코드 입력"
          className="flex-1 border px-3 py-2 rounded-md"
        />
        <BaseButton
          onClick={(e) => {
            e.preventDefault();
            alert("인증 요청");
          }}
          className="w-auto px-4 py-2"
        >
          인증요청
        </BaseButton>
      </div>

      {/* 비밀번호 */}
      <PasswordInput
        value={formData.password || ""}
        onChange={handleInput}
        name="password"
      />
      <PasswordInput
        value={formData.confirmPassword || ""}
        onChange={handleInput}
        name="confirmPassword"
      />

      {/* 제출 */}
      <BaseButton type="submit">회원가입 완료</BaseButton>

      <div className="text-sm text-center text-textSub">
        이미 계정이 있으신가요?{" "}
        <a href={LOGIN_PATH} className="text-primary underline">
          로그인하기
        </a>
      </div>
    </form>
  );
}
