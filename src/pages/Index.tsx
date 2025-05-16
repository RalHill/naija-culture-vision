
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import CulturalDirectory from "@/components/CulturalDirectory";
import EventHighlights from "@/components/EventHighlights";
import InvestmentHub from "@/components/InvestmentHub";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col pt-16">
      <Header />
      <main>
        <Hero />
        <NewsSection />
        <CulturalDirectory />
        <EventHighlights />
        <InvestmentHub />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
