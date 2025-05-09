// 비밀번호 변경
import { useState } from "react";
import { changePassword } from "../../apis/auth";
import BaseButton from "../common/BaseButton";

export default function PasswordChangeForm() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword } = form;

    if (!currentPassword || !newPassword) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (currentPassword === newPassword) {
      alert("새 비밀번호는 현재 비밀번호와 달라야 합니다.");
      return;
    }

    try {
      setLoading(true);
      await changePassword(currentPassword, newPassword);
      alert("비밀번호가 성공적으로 변경되었습니다.");
      setForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      const message =
        err.response?.data?.message || "비밀번호 변경에 실패했습니다.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm text-textSub mb-1">현재 비밀번호</label>
        <input
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-textSub mb-1">새 비밀번호</label>
        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>

      <BaseButton type="submit" disabled={loading}>
        비밀번호 변경
      </BaseButton>
    </form>
  );
}
