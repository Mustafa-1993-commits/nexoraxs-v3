import Navbar from "../sections/navbar/navbar";
import Hero from "../sections/hero/hero";
import Features from "../sections/features/features";
import Apps from "../sections/apps/apps";
import Pricing from "../sections/pricing/pricing";
import FAQ from "../sections/faq/faq";
import Footer from "../sections/footer/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />
      <Hero />
      <Features />
      <Apps />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
