import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="aurora-bg min-h-screen">
      <Navbar />
      <LandingContent />
      <Footer />
    </main>
  );
}

function LandingContent() {
  const features = [
    {
      title: "Accurate Risk Analysis",
      description:
        "Assess default probability with multi-feature signal modeling and scalable ML pipelines.",
    },
    {
      title: "Financial Insights",
      description:
        "Surface the drivers behind risky profiles with clean, high-signal indicators.",
    },
    {
      title: "Early Risk Detection",
      description:
        "Identify loan default threats early to protect portfolio performance.",
    },
  ];

  return (
    <>
      <Hero />
      <section id="features" className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-soft)]">
              Why FinRisk AI
            </p>
            <h2 className="font-display text-3xl text-[var(--text)]">
              Predictive intelligence for lenders
            </h2>
          </div>
          <p className="max-w-md text-sm text-[var(--text-muted)]">
            A clean dashboard experience built for modern fintech teams seeking
            reliable, explainable risk scores.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card glow-border rounded-3xl p-6 transition hover:-translate-y-1"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent-strong)]/20">
                <span className="font-display text-lg text-[var(--text)]">0{index + 1}</span>
              </div>
              <h3 className="font-display text-xl text-[var(--text)]">{feature.title}</h3>
              <p className="mt-3 text-sm text-[var(--text-muted)]">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}