// 좌측 메뉴 컴포넌트 (공통)
// components/mypage/MypageSidebar.jsx
import clsx from "clsx";

export default function MypageSidebar({ selected, onSelect }) {
  const role = localStorage.getItem("role");

  const menuItems = {
    STUDENT: [
      { key: "info", label: "내 정보" },
      { key: "major", label: "전공 변경" },
      { key: "email", label: "이메일 변경" },
      { key: "password", label: "비밀번호 변경" },
      { key: "withdraw", label: "회원 탈퇴" },
    ],
    PROFESSOR: [
      { key: "info", label: "내 정보" },
      { key: "lecture", label: "내 강의목록 보기" },
      { key: "email", label: "이메일 변경" },
      { key: "password", label: "비밀번호 변경" },
      { key: "withdraw", label: "회원 탈퇴" },
    ],
    ADMIN: [
      { key: "email", label: "이메일 변경" },
      { key: "password", label: "비밀번호 변경" },
      { key: "withdraw", label: "회원 탈퇴" },
    ],
  };
  if (!role) return <div>cannot find role</div>;
  return (
    <aside className="w-48 bg-white border-r border-r-red-500 shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] p-4">
      <h2 className="font-bold text-lg mb-4 border-b pb-2">마이페이지</h2>
      <ul className="space-y-2">
        {menuItems[role].map((item) => (
          <li
            key={item.key}
            className={clsx(
              "cursor-pointer text-sm px-2 py-1 rounded",
              selected === item.key
                ? "text-red-600 font-bold border-l-4 border-red-500 bg-red-50"
                : "hover:bg-gray-100 text-gray-700"
            )}
            onClick={() => onSelect(item.key)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
