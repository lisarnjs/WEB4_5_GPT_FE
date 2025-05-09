export default function InfoRow({ label, value }) {
  return (
    <div className="flex gap-4">
      <div className="w-24 font-semibold text-textSub">{label}</div>
      <div className="text-textMain">{value}</div>
    </div>
  );
}
