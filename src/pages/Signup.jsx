import { useEffect, useState } from "react";
import Select from "react-select";
import StudentSignup from "../components/auth/StudentSignup";
import ProfessorSignup from "../components/auth/ProfessorSignup";
import { universityList } from "../apis/university";
import { signupStudent, signupProfessor } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../constants/route.constants";

const signupTypeOptions = [
  { value: "s", label: "학생" },
  { value: "p", label: "교직원" },
];

export default function Signup() {
  const navigate = useNavigate();
  const [signupType, setSignupType] = useState(signupTypeOptions[0]);
  const [studentForm, setStudentForm] = useState({});
  const [professorForm, setProfessorForm] = useState({});
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await universityList();
        const formatted = res.data.data.map((u) => ({
          value: u.id,
          label: u.name,
        }));
        setUniversities(formatted);
      } catch (error) {
        console.error("대학 목록 조회 실패", error);
      }
    };
    fetchUniversities();
  }, []);

  // 학생 회원가입 처리
  const handleStudentSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        role: "STUDENT",
      };
      await signupStudent(payload);
      alert("학생 회원가입 완료 🎉");
      navigate(LOGIN_PATH);
    } catch (error) {
      alert(error.response?.data?.message || "학생 회원가입 실패");
    }
  };

  // 교수 회원가입 처리
  const handleProfessorSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        role: "PROFESSOR",
      };
      await signupProfessor(payload);
      alert("교직원 가입 신청 완료 🎉\n관리자의 승인을 기다려 주세요.");
      navigate(LOGIN_PATH);
    } catch (error) {
      alert(error.response?.data?.message || "교직원 회원가입 실패");
    }
  };

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
            universities={universities}
          />
        ) : (
          <ProfessorSignup
            formData={professorForm}
            setFormData={setProfessorForm}
            onSubmit={handleProfessorSubmit}
            universities={universities}
          />
        )}
      </div>
    </div>
  );
}
