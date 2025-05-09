// 이메일 변경
import { useState } from "react";
import { updateEmail } from "../../apis/auth";
import BaseButton from "../common/BaseButton";

export default function EmailChangeForm() {
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newEmail) {
      alert("새 이메일을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      await updateEmail(newEmail);
      alert("이메일이 성공적으로 변경되었습니다.");
      setNewEmail("");
    } catch (err) {
      const message =
        err.response?.data?.message || "이메일 변경에 실패했습니다.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm text-textSub mb-1">새 이메일</label>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="example@univ.ac.kr"
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      <BaseButton type="submit" disabled={loading}>
        이메일 변경
      </BaseButton>
    </form>
  );
}
