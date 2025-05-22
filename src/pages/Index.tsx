
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import CulturalDirectory from "@/components/CulturalDirectory";
import EventHighlights from "@/components/EventHighlights";
import InvestmentHub from "@/components/InvestmentHub";
import LoanMarketplace from "@/components/LoanMarketplace";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { SearchBar } from "@/components/SearchBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
      <Header />
      <main className="flex-1">
        {/* Global Search Bar */}
        <div className="bg-white py-4 px-4 shadow-sm">
          <div className="container mx-auto">
            <SearchBar placeholder="Search attractions, events, or areas in Lagos..." />
          </div>
        </div>
        <Hero />
        <NewsSection />
        <CulturalDirectory />
        <EventHighlights />
        <InvestmentHub />
        <LoanMarketplace />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Index;
