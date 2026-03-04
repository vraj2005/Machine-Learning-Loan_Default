"use client";

import { useState } from "react";
import ResultCard from "@/components/ResultCard";

export default function LoanForm() {
  const [formData, setFormData] = useState({
    Age: "",
    Income: "",
    CreditScore: "",
    MonthsEmployed: "",
    LoanAmount: "",
    InterestRate: "",
    LoanTerm: "",
    DTIRatio: "",
    NumCreditLines: "",
    HasMortgage: "0",
    HasDependents: "0",
    HasCoSigner: "0",
    Education: "High School",
    EmploymentType: "Full Time",
    MaritalStatus: "Married",
    LoanPurpose: "Business",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toNumber = (value) => (value === "" ? 0 : Number(value));

  const buildPayload = () => {
    const payload = {
      Age: toNumber(formData.Age),
      Income: toNumber(formData.Income),
      LoanAmount: toNumber(formData.LoanAmount),
      CreditScore: toNumber(formData.CreditScore),
      MonthsEmployed: toNumber(formData.MonthsEmployed),
      NumCreditLines: toNumber(formData.NumCreditLines),
      InterestRate: toNumber(formData.InterestRate),
      LoanTerm: toNumber(formData.LoanTerm),
      DTIRatio: toNumber(formData.DTIRatio),
      HasMortgage: Number(formData.HasMortgage),
      HasDependents: Number(formData.HasDependents),
      HasCoSigner: Number(formData.HasCoSigner),
      "Education_High School": formData.Education === "High School" ? 1 : 0,
      "Education_Master's": formData.Education === "Master's" ? 1 : 0,
      Education_PhD: formData.Education === "PhD" ? 1 : 0,
      "EmploymentType_Part-time":
        formData.EmploymentType === "Part Time" ? 1 : 0,
      "EmploymentType_Self-employed":
        formData.EmploymentType === "Self Employed" ? 1 : 0,
      EmploymentType_Unemployed:
        formData.EmploymentType === "Unemployed" ? 1 : 0,
      MaritalStatus_Married: formData.MaritalStatus === "Married" ? 1 : 0,
      MaritalStatus_Single: formData.MaritalStatus === "Single" ? 1 : 0,
      LoanPurpose_Business: formData.LoanPurpose === "Business" ? 1 : 0,
      LoanPurpose_Education: formData.LoanPurpose === "Education" ? 1 : 0,
      LoanPurpose_Home: formData.LoanPurpose === "Home" ? 1 : 0,
      LoanPurpose_Other: formData.LoanPurpose === "Other" ? 1 : 0,
    };

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Prediction failed.");
      }
      setResult(data);
    } catch (err) {
      setResult(null);
      setError(err.message || "Unable to reach the prediction service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-soft)]">
            Prediction Console
          </p>
          <h2 className="font-display text-3xl text-[var(--text)]">
            Loan Risk Assessment
          </h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Fill in the borrower profile to generate a live default risk score.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 px-4 py-3 text-xs text-[var(--text-muted)]">
          Powered by ML pipeline and risk signals
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card glow-border rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)]/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[var(--text-soft)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M4 20h16M6 16h12M8 12h8M10 8h4" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl text-[var(--text)]">
                  Personal Financial Data
                </h3>
                <p className="text-xs text-[var(--text-soft)]">
                  Core borrower indicators
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { name: "Age", label: "Age" },
                { name: "Income", label: "Income" },
                { name: "CreditScore", label: "Credit Score" },
                { name: "MonthsEmployed", label: "Months Employed" },
              ].map((field) => (
                <label key={field.name} className="text-xs text-[var(--text-soft)]">
                  {field.label}
                  <input
                    type="number"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                    required
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="glass-card glow-border rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-strong)]/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[var(--text-muted)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M3 7h18M5 7l2 10h10l2-10" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl text-[var(--text)]">Loan Details</h3>
                <p className="text-xs text-[var(--text-soft)]">
                  Amounts, rates, and duration
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { name: "LoanAmount", label: "Loan Amount" },
                { name: "InterestRate", label: "Interest Rate" },
                { name: "LoanTerm", label: "Loan Term" },
                { name: "DTIRatio", label: "Debt-to-Income Ratio" },
                { name: "NumCreditLines", label: "Number of Credit Lines" },
              ].map((field) => (
                <label key={field.name} className="text-xs text-[var(--text-soft)]">
                  {field.label}
                  <input
                    type="number"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                    required
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass-card glow-border rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)]/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[var(--text-muted)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M6 12h12M6 8h12M6 16h12" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg text-[var(--text)]">Financial Status</h3>
                <p className="text-xs text-[var(--text-soft)]">Assets and obligations</p>
              </div>
            </div>
            {["HasMortgage", "HasDependents", "HasCoSigner"].map((field) => (
              <label key={field} className="mb-4 block text-xs text-[var(--text-soft)]">
                {field === "HasMortgage"
                  ? "Has Mortgage"
                  : field === "HasDependents"
                  ? "Has Dependents"
                  : "Has Co-Signer"}
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </label>
            ))}
          </div>

          <div className="glass-card glow-border rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-strong)]/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[var(--text-muted)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M12 3v18M5 8h14M6 20h12" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg text-[var(--text)]">Education</h3>
                <p className="text-xs text-[var(--text-soft)]">Highest qualification</p>
              </div>
            </div>
            <label className="block text-xs text-[var(--text-soft)]">
              Education Level
              <select
                name="Education"
                value={formData.Education}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
              >
                <option>High School</option>
                <option>Master's</option>
                <option>PhD</option>
              </select>
            </label>
          </div>

          <div className="glass-card glow-border rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)]/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[var(--text-muted)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M4 7h16v10H4z" />
                  <path d="M9 7V5h6v2" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg text-[var(--text)]">Employment Type</h3>
                <p className="text-xs text-[var(--text-soft)]">Work status</p>
              </div>
            </div>
            <label className="block text-xs text-[var(--text-soft)]">
              Employment
              <select
                name="EmploymentType"
                value={formData.EmploymentType}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Self Employed</option>
                <option>Unemployed</option>
              </select>
            </label>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card glow-border rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-strong)]/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[var(--text-muted)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M12 6v12M6 12h12" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg text-[var(--text)]">Marital Status</h3>
                <p className="text-xs text-[var(--text-soft)]">Household context</p>
              </div>
            </div>
            <label className="block text-xs text-[var(--text-soft)]">
              Status
              <select
                name="MaritalStatus"
                value={formData.MaritalStatus}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
              >
                <option>Married</option>
                <option>Single</option>
              </select>
            </label>
          </div>

          <div className="glass-card glow-border rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)]/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[var(--text-muted)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M4 6h16v4H4z" />
                  <path d="M6 14h12v4H6z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg text-[var(--text)]">Loan Purpose</h3>
                <p className="text-xs text-[var(--text-soft)]">Intended usage</p>
              </div>
            </div>
            <label className="block text-xs text-[var(--text-soft)]">
              Purpose
              <select
                name="LoanPurpose"
                value={formData.LoanPurpose}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
              >
                <option>Business</option>
                <option>Education</option>
                <option>Home</option>
                <option>Other</option>
              </select>
            </label>
          </div>
        </div>

        <div className="glass-card glow-border rounded-3xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl text-[var(--text)]">Run Prediction</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Submit to compute probability of default.
              </p>
            </div>
            <button
              type="submit"
              className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[color:var(--accent)]/30 transition hover:opacity-90 disabled:opacity-60"
              disabled={loading}
            >
              {loading && <span className="spinner" />}
              {loading ? "Running Prediction" : "Predict"}
            </button>
          </div>
          {error && (
            <p className="mt-4 rounded-2xl border border-[var(--danger)]/40 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]">
              {error}
            </p>
          )}
        </div>
      </form>

      <ResultCard result={result} />
    </section>
  );
}