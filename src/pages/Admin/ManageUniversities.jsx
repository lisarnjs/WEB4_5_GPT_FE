import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  universityList,
  createUniversity,
  updateUniversity,
  deleteUniversity,
} from "../../apis/university";

const ManageUniversities = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [formData, setFormData] = useState({ name: "", emailDomain: "" });

  // 대학 목록 조회
  const {
    data: universities = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["universities"],
    queryFn: universityList,
    select: (res) => res.data.data,
  });

  // CRUD Mutation
  const createMutation = useMutation({
    mutationFn: createUniversity,
    onSuccess: () => {
      queryClient.invalidateQueries(["universities"]);
      setIsFormOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUniversity,
    onSuccess: () => {
      queryClient.invalidateQueries(["universities"]);
      setIsFormOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUniversity,
    onSuccess: () => queryClient.invalidateQueries(["universities"]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      emailDomain: formData.emailDomain,
    };

    if (editingUniversity) {
      updateMutation.mutate({ ...payload, id: editingUniversity.id });
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">대학 관리</h1>
        <button
          onClick={() => {
            setIsFormOpen(true);
            setEditingUniversity(null);
            setFormData({ name: "", emailDomain: "" });
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          대학 등록
        </button>
      </div>

      {/* 등록/수정 폼 */}
      {isFormOpen && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2">대학명</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">이메일 도메인</label>
              <input
                type="text"
                name="emailDomain"
                value={formData.emailDomain}
                onChange={(e) =>
                  setFormData({ ...formData, emailDomain: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="example.ac.kr"
                required
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {editingUniversity ? "수정" : "등록"}
              </button>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 대학 테이블 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">대학명</th>
              <th className="px-6 py-3 text-left">이메일 도메인</th>
              <th className="px-6 py-3 text-left">관리</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((uni) => (
              <tr key={uni.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{uni.name}</td>
                <td className="px-6 py-4">@{uni.emailDomain}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsFormOpen(true);
                        setEditingUniversity(uni);
                        setFormData({
                          name: uni.name,
                          emailDomain: uni.emailDomain,
                        });
                      }}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("정말 삭제하시겠습니까?")) {
                          deleteMutation.mutate(uni.id);
                        }
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {universities.length === 0 && !isLoading && (
          <div className="p-6 text-center text-gray-500">
            등록된 대학이 없습니다
          </div>
        )}
      </div>

      {/* 로딩 및 에러 상태 */}
      {isLoading && <div className="p-4 text-center">로딩 중...</div>}
      {error && (
        <div className="p-4 text-red-500 text-center">
          데이터를 불러오는 중 오류가 발생했습니다
        </div>
      )}
    </div>
  );
};

export default ManageUniversities;
