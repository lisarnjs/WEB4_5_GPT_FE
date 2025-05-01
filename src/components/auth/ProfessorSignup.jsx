// src/components/Signup/ProfessorSignup.jsx
import Select from "react-select";
import EmailInput from "../common/EmailInput";
import PasswordInput from "../common/PasswordInput";
import BaseButton from "../common/BaseButton";

const universityOptions = [
  { value: "1", label: "Unihub대학교" },
  { value: "2", label: "AI대학교" },
];

const majorOptions = [
  { value: "101", label: "컴퓨터공학" },
  { value: "102", label: "경영학" },
];

export default function ProfessorSignup({ formData, setFormData, onSubmit }) {
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

    onSubmit({
      ...formData,
      universityId: formData.university?.value,
      majorId: formData.major?.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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

      <div>
        <label className="text-sm text-textSub block mb-1">사번</label>
        <input
          name="professorCode"
          value={formData.professorCode || ""}
          onChange={handleInput}
          className="w-full border px-3 py-2 rounded-md"
          placeholder="교직원 번호"
        />
      </div>

      <div>
        <label className="text-sm text-textSub block mb-1">소속 학교</label>
        <Select
          options={universityOptions}
          value={formData.university || null}
          onChange={(selected) => handleSelect(selected, "university")}
        />
      </div>

      <div>
        <label className="text-sm text-textSub block mb-1">전공</label>
        <Select
          options={majorOptions}
          value={formData.major || null}
          onChange={(selected) => handleSelect(selected, "major")}
        />
      </div>

      <EmailInput value={formData.email || ""} onChange={handleInput} />

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

      <BaseButton type="submit">회원가입 신청</BaseButton>

      <div className="text-sm text-center text-textSub space-y-1">
        <div>
          이미 계정이 있으신가요?{" "}
          <a href="/login" className="text-primary underline">
            로그인하기
          </a>
        </div>
        <p className="text-sm mt-1 text-gray-500">
          신청 후 관리자의 승인을 기다려주세요.
        </p>
      </div>
    </form>
  );
}
