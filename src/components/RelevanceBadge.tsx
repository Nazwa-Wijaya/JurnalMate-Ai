/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface RelevanceBadgeProps {
  score: number;
  label: string;
}

export function RelevanceBadge({ score, label }: RelevanceBadgeProps) {
  let badgeStyles = "bg-slate-100 text-slate-800 border-slate-200/60";
  let textStyles = "text-slate-600";
  let bgGradient = "from-slate-100 to-slate-200";

  if (score >= 85) {
    badgeStyles = "bg-emerald-50 text-emerald-800 border-emerald-200/60";
    textStyles = "text-emerald-700 font-semibold";
    bgGradient = "from-emerald-400 to-teal-500";
  } else if (score >= 70) {
    badgeStyles = "bg-indigo-50 text-indigo-800 border-indigo-200/60";
    textStyles = "text-indigo-700 font-medium";
    bgGradient = "from-indigo-400 to-violet-500";
  } else if (score >= 50) {
    badgeStyles = "bg-amber-50 text-amber-800 border-amber-200/60";
    textStyles = "text-amber-700 font-medium";
    bgGradient = "from-amber-400 to-orange-500";
  } else {
    badgeStyles = "bg-rose-50 text-rose-800 border-rose-200/60";
    textStyles = "text-rose-600";
    bgGradient = "from-rose-400 to-red-500";
  }

  return (
    <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs ${badgeStyles}`} id={`relevance-${score}`}>
      {/* Mini score indicator ball */}
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-radial ${bgGradient}`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r ${bgGradient}`}></span>
      </span>
      <span>
        {label} <span className="font-mono font-bold opacity-90">({score}%)</span>
      </span>
    </div>
  );
}
