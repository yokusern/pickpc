interface Props {
  label: string;
  value: number;
  max?: number;
  color?: string;
}

export default function ScoreBar({ label, value, max = 100, color = "bg-blue-500" }: Props) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 text-xs text-gray-600 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-xs text-right font-semibold text-gray-700">{value}</span>
    </div>
  );
}
