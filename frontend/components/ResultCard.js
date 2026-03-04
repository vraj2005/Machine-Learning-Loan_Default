export default function ResultCard({ result }) {
  if (!result) return null;

  const probability = Number(result.probability ?? 0);
  const probabilityPercent = probability > 1 ? probability : probability * 100;
  const riskTiers = [
    { label: "Very Low Risk", min: 0, max: 15, color: "var(--success)" },
    { label: "Low Risk", min: 15, max: 35, color: "var(--success)" },
    { label: "Moderate Risk", min: 35, max: 60, color: "#f59e0b" },
    { label: "High Risk", min: 60, max: 80, color: "var(--danger)" },
    { label: "Very High Risk", min: 80, max: 101, color: "var(--danger)" },
  ];

  const tierByProbability =
    riskTiers.find(
      (tier) => probabilityPercent >= tier.min && probabilityPercent < tier.max
    ) || riskTiers[0];

  const tierByLabel = riskTiers.find(
    (tier) => tier.label === result.risk_level
  );

  const activeTier = tierByLabel || tierByProbability;
  const isHighRisk = ["High Risk", "Very High Risk"].includes(activeTier.label);

  return (
    <div className="glass-card glow-border mt-6 rounded-3xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-soft)]">
            Prediction Result
          </p>
          <h3 className="font-display text-2xl text-[var(--text)]">
            {activeTier.label}
          </h3>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Probability of default: {probabilityPercent.toFixed(2)}%
          </p>
        </div>
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `color-mix(in srgb, ${activeTier.color} 18%, transparent)` }}
        >
          <span className="text-sm font-semibold" style={{ color: activeTier.color }}>
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
