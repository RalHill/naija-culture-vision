
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, BriefcaseBusiness, FileText, HandCoins, Timer, Star } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import BottomNav from "@/components/BottomNav";

interface LoanProvider {
  id: number;
  name: string;
  loanAmount: string;
  interestRate: string;
  tenor: string;
  requirements: string[];
  useCases: string[];
  applyUrl: string;
  rating: number;
}

const loanProviders: LoanProvider[] = [
  {
    id: 1,
    name: "FairMoney",
    loanAmount: "₦10,000 – ₦3,000,000",
    interestRate: "2.5% – 30% monthly",
    tenor: "2 – 24 months",
    requirements: ["BVN", "Bank Account"],
    useCases: ["Event Hosting", "Equipment Purchase", "Vendor Stock Replenishment"],
    applyUrl: "https://fairmoney.io/products/personal-loans",
    rating: 4.3
  },
  {
    id: 2,
    name: "Palmcredit",
    loanAmount: "₦10,000 – ₦300,000",
    interestRate: "14% – 24% APR",
    tenor: "14 – 180 days",
    requirements: ["BVN"],
    useCases: ["Transport for Performers", "Vendor Stock"],
    applyUrl: "https://play.google.com/store/apps/details?id=com.transsnetfinancial.palmcredit",
    rating: 4.1
  },
  {
    id: 3,
    name: "Carbon",
    loanAmount: "₦2,500 – ₦1,000,000",
    interestRate: "4.5% – 30% monthly",
    tenor: "61 – 365 days",
    requirements: ["BVN"],
    useCases: ["Gallery Rentals", "Equipment Purchase"],
    applyUrl: "https://getcarbon.co/",
    rating: 4.5
  },
  {
    id: 4,
    name: "Branch",
    loanAmount: "₦6,000 – ₦1,000,000",
    interestRate: "3% – 23% monthly",
    tenor: "62 – 365 days",
    requirements: ["BVN"],
    useCases: ["Event Hosting", "Transport for Performers"],
    applyUrl: "https://branch.co/",
    rating: 4.2
  },
  {
    id: 5,
    name: "Aella Credit",
    loanAmount: "₦1,500 – ₦1,000,000",
    interestRate: "4% – 29% monthly",
    tenor: "60 – 180 days",
    requirements: ["BVN"],
    useCases: ["Vendor Stock", "Equipment"],
    applyUrl: "https://aellaapp.com/",
    rating: 3.9
  },
  {
    id: 6,
    name: "QuickCheck",
    loanAmount: "₦1,500 – ₦1,000,000",
    interestRate: "5% – 30% monthly",
    tenor: "91 – 365 days",
    requirements: ["BVN"],
    useCases: ["Event Hosting", "Equipment"],
    applyUrl: "https://www.quickcheck.ng/",
    rating: 4.0
  }
];

const useCaseCategories = [
  "All",
  "Event Hosting",
  "Equipment Purchase",
  "Vendor Stock",
  "Transport for Performers",
  "Gallery Rentals"
];

// Helper component for star ratings
const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<Star key={i} className="h-4 w-4 fill-naija-gold text-naija-gold" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <div key={i} className="relative">
          <Star className="h-4 w-4 text-gray-300" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="h-4 w-4 fill-naija-gold text-naija-gold" />
          </div>
        </div>
      );
    } else {
      stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
    }
  }

  return (
    <div className="flex items-center gap-1">
      {stars}
      <span className="text-sm font-medium text-gray-600 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};

const Financial = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const filteredProviders = loanProviders.filter(provider => {
    if (activeFilter === "All") return true;
    return provider.useCases.includes(activeFilter);
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        {/* Search Bar */}
        <div className="bg-white py-4 px-4 shadow-sm">
          <div className="container mx-auto">
            <SearchBar placeholder="Search for loan providers..." />
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-naija-lightgreen py-12 px-4 text-center">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-naija-green mb-4">Financial Services</h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-6">
              Empowering Lagos' creators, vendors, and event organizers with access to trusted microloans.
            </p>
            <p className="text-md md:text-lg text-gray-600 max-w-2xl mx-auto">
              Access flexible loans for event hosting, vendor stock, gallery rentals, and more—tailored to support the Lagos cultural economy.
            </p>
          </div>
        </section>

        {/* Loan Marketplace Section */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="section-title">Loan Marketplace</h2>
              <Button 
                variant="outline" 
                className="text-naija-green border-naija-green"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                {isFilterOpen ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>

            {/* Filter Section - TripAdvisor Style */}
            {isFilterOpen && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Filter by Use Case</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {useCaseCategories.map((category) => (
                    <Button 
                      key={category}
                      variant={activeFilter === category ? "default" : "outline"}
                      className={`rounded-full text-sm py-1 h-auto ${
                        activeFilter === category 
                          ? "bg-naija-green text-white" 
                          : "border-naija-green/50 text-naija-green"
                      }`}
                      onClick={() => setActiveFilter(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-4">Filter by Rating</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="4-stars" className="mr-2" />
                    <label htmlFor="4-stars" className="flex items-center">
                      <div className="flex">
                        <Star className="h-4 w-4 fill-naija-gold text-naija-gold" />
                        <Star className="h-4 w-4 fill-naija-gold text-naija-gold" />
                        <Star className="h-4 w-4 fill-naija-gold text-naija-gold" />
                        <Star className="h-4 w-4 fill-naija-gold text-naija-gold" />
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <span className="ml-2 text-sm">& up</span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="3-stars" className="mr-2" />
                    <label htmlFor="3-stars" className="flex items-center">
                      <div className="flex">
                        <Star className="h-4 w-4 fill-naija-gold text-naija-gold" />
                        <Star className="h-4 w-4 fill-naija-gold text-naija-gold" />
                        <Star className="h-4 w-4 fill-naija-gold text-naija-gold" />
                        <Star className="h-4 w-4 text-gray-300" />
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <span className="ml-2 text-sm">& up</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Loan Cards - TripAdvisor Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="bg-white border shadow-sm hover:shadow-md transition-all overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-naija-lightgreen h-12 p-4 flex justify-between items-center">
                      <h3 className="font-semibold">{provider.name}</h3>
                      <StarRating rating={provider.rating} />
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Loan Amount:</span>
                          <span className="font-medium">{provider.loanAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Interest Rate:</span>
                          <span className="font-medium">{provider.interestRate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Tenor:</span>
                          <span className="font-medium">{provider.tenor}</span>
                        </div>
                        
                        <div>
                          <span className="text-gray-600 font-medium">Requirements:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {provider.requirements.map((req, index) => (
                              <span key={index} className="inline-flex items-center text-xs bg-gray-100 text-gray-700 rounded px-2 py-1">
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-gray-600 font-medium">Use Cases:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {provider.useCases.map((useCase, index) => (
                              <span key={index} className="inline-flex items-center text-xs bg-naija-lightgreen text-naija-green rounded px-2 py-1">
                                {useCase}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t p-4">
                    <a href={provider.applyUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button className="w-full bg-naija-green hover:bg-naija-green/90 text-white flex items-center justify-center gap-2">
                        Apply Now <ArrowRight className="h-4 w-4" />
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section-padding bg-white shadow-sm">
          <div className="container mx-auto">
            <h2 className="section-title text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-naija-green rounded-full flex items-center justify-center mb-4">
                  <FileText className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Choose a Loan Provider</h3>
                <p className="text-gray-600">Compare options and select the provider that best suits your needs</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-naija-green rounded-full flex items-center justify-center mb-4">
                  <Timer className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Apply in Minutes</h3>
                <p className="text-gray-600">Complete a quick application with your basic information</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-naija-green rounded-full flex items-center justify-center mb-4">
                  <HandCoins className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fund Your Cultural Venture</h3>
                <p className="text-gray-600">Receive funds and invest in your cultural business or project</p>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Section */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600 max-w-4xl mx-auto text-center">
              <p>
                Lagos Wave360 does not issue loans. All loan decisions are made by the providers listed. 
                Ensure responsible borrowing. Loans are subject to provider terms. 
                Affiliate links may generate platform revenue.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Financial;
