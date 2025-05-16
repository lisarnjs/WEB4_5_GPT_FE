import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { inviteAdmin } from "../../apis/admin";

export default function InviteAdmin() {
  const [formData, setFormData] = useState({
    adminName: "",
    email: "",
  });
  const [error, setError] = useState("");

  // 폼 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 관리자 초대 mutation
  const mutation = useMutation({
    mutationFn: inviteAdmin,
    onSuccess: () => {
      alert("관리자 초대가 완료됐습니다.");
      setFormData({ adminName: "", email: "" }); // 폼 초기화
      setError("");
    },
    onError: (error) => {
      setError(error.response?.data?.message || "관리자 초대에 실패했습니다.");
    },
  });

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 간단한 유효성 검사
    if (!formData.adminName.trim()) {
      setError("관리자명을 입력해주세요.");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("유효한 이메일을 입력해주세요.");
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="bg-gray-200 p-8 rounded-md">
        <h2 className="text-xl text-center mb-6 font-medium">관리자 초대</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">관리자명</label>
            <input
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              className="w-full p-2 border"
              placeholder="김관리자"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1">이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border"
              placeholder="admin@example.com"
            />
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900 disabled:opacity-50"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "처리 중..." : "초대하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
