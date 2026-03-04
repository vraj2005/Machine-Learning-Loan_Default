export default function ResultCard({ result }) {
  if (!result) return null;

  const probability = Number(result.probability ?? 0);
  const probabilityPercent = probability > 1 ? probability : probability * 100;
  const isHighRisk = result.prediction === 1 || probabilityPercent >= 50;

  return (
    <div className="glass-card glow-border mt-6 rounded-3xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-soft)]">
            Prediction Result
          </p>
          <h3 className="font-display text-2xl text-[var(--text)]">{
            isHighRisk ? "High Risk" : "Low Risk"
          }</h3>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Probability of default: {probabilityPercent.toFixed(2)}%
          </p>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            isHighRisk ? "bg-[var(--danger)]/15" : "bg-[var(--success)]/15"
          }`}
        >
          <span
            className={`text-sm font-semibold ${
              isHighRisk ? "text-[var(--danger)]" : "text-[var(--success)]"
            }`}
          >
            {isHighRisk ? "!" : "OK"}
          </span>
        </div>
      </div>
      <div className="mt-5 h-2 rounded-full bg-[var(--border)]">
        <div
          className={`h-2 rounded-full ${
            isHighRisk
              ? "bg-gradient-to-r from-[var(--danger)] to-[#fca5a5]"
              : "bg-gradient-to-r from-[var(--success)] to-[#86efac]"
          }`}
          style={{ width: `${Math.min(100, Math.max(4, probabilityPercent))}%` }}
        />
      </div>
    </div>
  );
}
