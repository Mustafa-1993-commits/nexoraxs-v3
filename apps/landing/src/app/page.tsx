import Navbar from "../sections/navbar/navbar";
import Hero from "../sections/hero/hero";
import Features from "../sections/features/features";
import Footer from "../sections/footer/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}