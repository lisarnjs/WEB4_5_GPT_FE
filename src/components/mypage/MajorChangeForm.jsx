import { useEffect, useState } from "react";
import Select from "react-select";
import { updateProfessorMajor } from "../../apis/auth";
import { majorList } from "../../apis/university";

export default function MajorChangeForm() {
  const [majors, setMajors] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchMajors = async () => {
    const res = await majorList();
    console.log(res.data.data);
    setMajors(res.data.data.map((m) => ({ label: m.name, value: m.id })));
  };

  const handleSubmit = async () => {
    if (!selected) return;
    try {
      const res = await updateProfessorMajor(selected.value);
      alert(res.message);
    } catch (err) {
      alert(err.response?.data?.message || "전공 변경 실패");
    }
  };

  useEffect(() => {
    fetchMajors();
  }, []);

  return (
    <div className="space-y-4">
      <label className="text-sm">전공 선택</label>
      <Select options={majors} value={selected} onChange={setSelected} />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        변경
      </button>
    </div>
  );
}
