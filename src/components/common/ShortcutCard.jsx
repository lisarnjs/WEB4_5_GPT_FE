// src/components/ShortcutCard.tsx
import { Link } from "react-router-dom";
import { ReactNode } from "react";

export default function ShortcutCard({
  to,
  icon,
  label,
  colorClass,
  disabled = false,
}) {
  const baseStyle = `rounded px-4 py-2 font-medium text-sm ${colorClass}`;
  if (disabled) {
    return (
      <span className={`${baseStyle} cursor-not-allowed opacity-50`}>
        {icon} {label}
      </span>
    );
  }

  return (
    <Link to={to} className={`${baseStyle} hover:brightness-105`}>
      {icon} {label}
    </Link>
  );
}
