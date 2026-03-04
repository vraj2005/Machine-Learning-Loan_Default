export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-24">
      <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-[var(--accent)]/20 blur-3xl animate-pulse-slow" />
      <div className="absolute right-10 top-32 h-80 w-80 rounded-full bg-[var(--accent-strong)]/20 blur-3xl animate-pulse-slow" />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-6 animate-fade-up">
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--text-soft)]">
            AI-Powered Fintech
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-[var(--text)] md:text-5xl">
            AI Loan Default Risk Prediction
          </h1>
          <p className="text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Predict whether a borrower may default on a loan using a
            machine-learning risk engine built for fast, accurate financial
            decisions.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/predict"
              className="rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[color:var(--accent)]/30 transition hover:opacity-90"
            >
              Start Prediction
            </a>
            <div className="rounded-full border border-[var(--border)] bg-[color:var(--surface)]/60 px-4 py-2 text-xs text-[var(--text-muted)]">
              Real-time risk scoring and insights
            </div>
          </div>
        </div>
        <div className="glass-card glow-border relative rounded-3xl p-6 animate-fade-up">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-soft)]">
                Live Risk Signal
              </p>
              <h3 className="font-display text-xl text-[var(--text)]">
                Portfolio Snapshot
              </h3>
            </div>
            <span className="rounded-full bg-[var(--success)]/15 px-3 py-1 text-xs font-semibold text-[var(--success)]">
              Stable
            </span>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 p-4">
              <div className="flex items-center justify-between text-sm text-[var(--text-muted)]">
                <span>Average Risk Score</span>
                <span className="text-[var(--text)]">0.12</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-[var(--border)]">
                <div className="h-2 w-[35%] rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)]" />
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 p-4">
              <div className="flex items-center justify-between text-sm text-[var(--text-muted)]">
                <span>Defaults Prevented</span>
                <span className="text-[var(--text)]">64%</span>
              </div>
              <p className="mt-2 text-xs text-[var(--text-soft)]">
                Early risk detection reduces portfolio losses.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Accuracy", value: "88.5%" },
                { label: "Latency", value: "35ms" },
                { label: "Coverage", value: "255k" },
                { label: "Signals", value: "24" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 p-3 text-center"
                >
                  <p className="text-xs text-[var(--text-soft)]">{item.label}</p>
                  <p className="font-display text-lg text-[var(--text)]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 right-6 rounded-2xl bg-[var(--surface)] px-4 py-3 text-xs text-[var(--text-muted)] shadow-lg">
            Auto-refreshing insights every 60s
          </div>
        </div>
      </div>
    </section>
  );
}
