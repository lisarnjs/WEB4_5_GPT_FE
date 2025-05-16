import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  universityList,
  majorListByUniversity,
  createMajor,
  updateMajor,
  deleteMajor,
} from "../../apis/university";

const ManageMajors = () => {
  const queryClient = useQueryClient();
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMajor, setEditingMajor] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  // 대학 목록 조회
  const { data: universities = [] } = useQuery({
    queryKey: ["universities"],
    queryFn: universityList,
    select: (res) => res.data.data,
  });

  // 전공 목록 조회
  const { data: majors = [], isLoading } = useQuery({
    queryKey: ["majors", selectedUniversity],
    queryFn: () => majorListByUniversity(selectedUniversity),
    select: (res) => res.data.data,
    enabled: !!selectedUniversity,
  });

  // 전공 생성/수정/삭제 Mutation
  const createMutation = useMutation({
    mutationFn: createMajor,
    onSuccess: () => {
      queryClient.invalidateQueries(["majors"]);
      setIsFormOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateMajor,
    onSuccess: () => {
      queryClient.invalidateQueries(["majors"]);
      setIsFormOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMajor,
    onSuccess: () => queryClient.invalidateQueries(["majors"]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      universityId: selectedUniversity,
      name: formData.name,
    };

    editingMajor
      ? updateMutation.mutate({ ...payload, id: editingMajor.id })
      : createMutation.mutate(payload);
  };

  return (
    <div className="p-6">
      {/* 대학 선택 섹션 */}
      <div className="mb-6 flex items-center gap-4">
        <select
          value={selectedUniversity}
          onChange={(e) => setSelectedUniversity(e.target.value)}
          className="p-2 border rounded w-64"
        >
          <option value="">대학을 선택해주세요</option>
          {universities.map((uni) => (
            <option key={uni.id} value={uni.id}>
              {uni.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setIsFormOpen(true);
            setEditingMajor(null);
            setFormData({ name: "" });
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          전공 등록
        </button>
      </div>

      {/* 전공 등록/수정 폼 */}
      {isFormOpen && (
        <div className="mb-6 p-4 bg-gray-100 rounded">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              placeholder="전공 이름"
              className="p-2 border rounded flex-1"
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {editingMajor ? "수정" : "등록"}
            </button>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              취소
            </button>
          </form>
        </div>
      )}

      {/* 전공 테이블 */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">전공명</th>
              <th className="px-6 py-3 text-left">관리</th>
            </tr>
          </thead>
          <tbody>
            {majors.map((major) => (
              <tr key={major.id} className="border-t">
                <td className="px-6 py-4">{major.name}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsFormOpen(true);
                        setEditingMajor(major);
                        setFormData({ name: major.name });
                      }}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("정말 삭제하시겠습니까?")) {
                          deleteMutation.mutate(major.id);
                        }
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {majors.length === 0 && !isLoading && (
          <div className="p-6 text-center text-gray-500">
            등록된 전공이 없습니다
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMajors;
