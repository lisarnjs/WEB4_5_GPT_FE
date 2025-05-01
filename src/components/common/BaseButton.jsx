// src/components/common/BaseButton.jsx
export default function BaseButton({
  type = "button",
  children,
  className = "",
  disabled = false,
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full py-3 rounded-md font-semibold text-white transition duration-200
        ${
          disabled
            ? "bg-primaryDisabled cursor-not-allowed"
            : "bg-primary hover:bg-primaryHover active:bg-primaryActive"
        } 
        ${className}`}
    >
      {children}
    </button>
  );
}
