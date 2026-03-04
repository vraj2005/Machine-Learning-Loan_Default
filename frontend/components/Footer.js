export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-[var(--text-soft)] md:flex-row">
        <p>Built for AI-driven lending decisions.</p>
        <div className="flex items-center gap-6">
          <span className="text-xs uppercase tracking-[0.2em]">FinRisk AI</span>
          <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
          <span>Loan Default Prediction</span>
        </div>
      </div>
    </footer>
  );
}
