// // 이메일 변경
// import { useState } from "react";
// import { updateEmail } from "../../apis/auth";
// import BaseButton from "../common/BaseButton";

// export default function EmailChangeForm() {
//   const [newEmail, setNewEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!newEmail) {
//       alert("새 이메일을 입력해주세요.");
//       return;
//     }

//     try {
//       setLoading(true);
//       await updateEmail(newEmail);
//       alert("이메일이 성공적으로 변경되었습니다.");
//       setNewEmail("");
//     } catch (err) {
//       const message =
//         err.response?.data?.message || "이메일 변경에 실패했습니다.";
//       alert(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
//       <div>
//         <label className="block text-sm text-textSub mb-1">새 이메일</label>
//         <input
//           type="email"
//           value={newEmail}
//           onChange={(e) => setNewEmail(e.target.value)}
//           placeholder="example@univ.ac.kr"
//           className="w-full border px-3 py-2 rounded-md"
//         />
//       </div>

//       <BaseButton type="submit" disabled={loading}>
//         이메일 변경
//       </BaseButton>
//     </form>
//   );
// }

import { useState } from "react";
import {
  requestEmailCode,
  verifyEmailCode,
  updateEmail,
} from "../../apis/auth";
import BaseButton from "../common/BaseButton";

export default function EmailChangeForm() {
  const [newEmail, setNewEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRequestCode = async () => {
    if (!newEmail) {
      alert("새 이메일을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      await requestEmailCode(newEmail, "EMAIL_CHANGE");
      alert("인증번호가 이메일로 전송되었습니다.");
      setIsCodeSent(true);
    } catch (err) {
      alert(err.response?.data?.message || "인증번호 요청에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!emailCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      await verifyEmailCode(newEmail, emailCode, "EMAIL_CHANGE");
      alert("이메일 인증이 완료되었습니다.");
      setIsVerified(true);
    } catch (err) {
      alert(err.response?.data?.message || "인증에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();

    if (!isVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    try {
      setLoading(true);
      await updateEmail(newEmail);
      alert("이메일이 성공적으로 변경되었습니다.");
      // 상태 초기화
      setNewEmail("");
      setEmailCode("");
      setIsCodeSent(false);
      setIsVerified(false);
    } catch (err) {
      alert(err.response?.data?.message || "이메일 변경에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleChangeEmail} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1">새 이메일</label>
        <div className="flex gap-2">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="flex-1 border px-3 py-2 rounded-md"
            disabled={isVerified}
          />
          <BaseButton
            type="button"
            onClick={handleRequestCode}
            disabled={loading || isVerified}
          >
            인증요청
          </BaseButton>
        </div>
      </div>

      {isCodeSent && (
        <div>
          <label className="block mb-1">인증번호</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value)}
              className="flex-1 border px-3 py-2 rounded-md"
              disabled={isVerified}
            />
            <BaseButton
              type="button"
              onClick={handleVerifyCode}
              disabled={loading || isVerified}
            >
              인증
            </BaseButton>
          </div>
        </div>
      )}

      <BaseButton type="submit" disabled={!isVerified || loading}>
        변경
      </BaseButton>
    </form>
  );
}
