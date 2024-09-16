import { Footer } from "@/components/article/Footer";
import { HeroSection } from "@/components/article/HeroSection";
import { Navbar } from "@/components/article/NavBar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="w-full flex-grow  bg-gradient-to-r from-purple-500 to-violet-800">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
