// src/components/common/PasswordInput.jsx
export default function PasswordInput({
  value,
  onChange,
  name = "password",
  required = true,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-textSub mb-1">
        비밀번호
      </label>
      <input
        type="password"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder="비밀번호"
        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
}
