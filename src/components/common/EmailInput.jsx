// src/components/common/EmailInput.jsx
export default function EmailInput({
  value,
  onChange,
  name = "email",
  required = true,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-textSub mb-1">
        이메일
      </label>
      <input
        type="email"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder="학교 이메일 주소"
        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
}
