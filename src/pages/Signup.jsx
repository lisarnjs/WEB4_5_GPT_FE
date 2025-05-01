// src/pages/Signup.jsx
import { useState } from "react";
import Select from "react-select";
import StudentSignup from "../components/Signup/StudentSignup";
import ProfessorSignup from "../components/Signup/ProfessorSignup";

const signupTypeOptions = [
  { value: "s", label: "학생" },
  { value: "p", label: "교직원" },
];

export default function Signup() {
  const [signupType, setSignupType] = useState(signupTypeOptions[0]);
  const [studentForm, setStudentForm] = useState({});
  const [professorForm, setProfessorForm] = useState({});

  const handleStudentSubmit = (data) => {
    console.log("✅ 학생 회원가입 데이터:", data);
  };

  const handleProfessorSubmit = (data) => {
    console.log("✅ 교직원 회원가입 데이터:", data);
  };

  // const handleStudentSubmit = async (data) => {
  //   try {
  //     const payload = {
  //       email: data.email,
  //       password: data.password,
  //       name: data.name,
  //       studentCode: data.studentCode,
  //       universityId: data.universityId,
  //       majorId: data.majorId,
  //       grade: data.grade,
  //       semester: data.semester,
  //     };
  //     const res = await signupStudent(payload);
  //     alert("학생 회원가입 완료 🎉");
  //   } catch (error) {
  //     alert(error.response?.data?.message || "학생 회원가입 실패");
  //   }
  // };

  // const handleProfessorSubmit = async (data) => {
  //   try {
  //     const payload = {
  //       email: data.email,
  //       password: data.password,
  //       name: data.name,
  //       employeeId: data.employeeId,
  //       universityId: data.universityId,
  //       majorId: data.majorId,
  //     };
  //     const res = await signupProfessor(payload);
  //     alert("교직원 회원가입 신청 완료 🎉\n승인을 기다려 주세요.");
  //   } catch (error) {
  //     alert(error.response?.data?.message || "교직원 회원가입 실패");
  //   }
  // };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10 font-noto">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-textMain">
          회원가입
        </h2>

        {/* 가입 유형 선택 */}
        <div>
          <label className="block text-sm text-textSub mb-1">가입 유형</label>
          <Select
            options={signupTypeOptions}
            value={signupType}
            onChange={setSignupType}
          />
        </div>

        {signupType.value === "s" ? (
          <StudentSignup
            formData={studentForm}
            setFormData={setStudentForm}
            onSubmit={handleStudentSubmit}
          />
        ) : (
          <ProfessorSignup
            formData={professorForm}
            setFormData={setProfessorForm}
            onSubmit={handleProfessorSubmit}
          />
        )}
      </div>
    </div>
  );
}
