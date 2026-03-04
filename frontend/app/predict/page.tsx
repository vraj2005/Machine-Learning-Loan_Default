import Footer from "@/components/Footer";
import LoanForm from "@/components/LoanForm";
import Navbar from "@/components/Navbar";

export default function PredictPage() {
  return (
    <main className="aurora-bg min-h-screen">
      <Navbar />
      <section className="pt-16">
        <LoanForm />
      </section>
      <Footer />
    </main>
  );
}
