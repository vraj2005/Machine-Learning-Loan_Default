"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    window.localStorage.setItem("theme", next);
    document.documentElement.dataset.theme = next;
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[color:var(--surface)]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-strong)]">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M3 12h18M7 6h10M7 18h10" />
            </svg>
          </div>
          <div>
            <p className="font-display text-lg font-semibold tracking-wide text-[var(--text)]">
              FinRisk AI
            </p>
            <p className="text-xs text-[var(--text-soft)]">Loan Default Prediction</p>
          </div>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-[var(--text-muted)] md:flex">
          <a className="transition hover:text-[var(--text)]" href="/">
            Overview
          </a>
          <a className="transition hover:text-[var(--text)]" href="/predict">
            Start Prediction
          </a>
          <a className="transition hover:text-[var(--text)]" href="#features">
            Features
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[color:var(--surface)] text-[var(--text)] shadow-sm transition hover:-translate-y-0.5"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 3v2M12 19v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M3 12h2M19 12h2M4.6 19.4l1.4-1.4M18 6l1.4-1.4" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 1 0 9.8 9.8Z" />
              </svg>
            )}
          </button>
          <a
            href="/predict"
            className="rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[color:var(--accent)]/30 transition hover:opacity-90"
          >
            Start Prediction
          </a>
        </div>
      </div>
    </header>
  );
}
