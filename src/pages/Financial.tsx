
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BriefcaseBusiness, FileText, HandCoins, Timer } from "lucide-react";

interface LoanProvider {
  id: number;
  name: string;
  loanAmount: string;
  interestRate: string;
  tenor: string;
  requirements: string[];
  useCases: string[];
  applyUrl: string;
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
    applyUrl: "https://fairmoney.io/products/personal-loans"
  },
  {
    id: 2,
    name: "Palmcredit",
    loanAmount: "₦10,000 – ₦300,000",
    interestRate: "14% – 24% APR",
    tenor: "14 – 180 days",
    requirements: ["BVN"],
    useCases: ["Transport for Performers", "Vendor Stock"],
    applyUrl: "https://play.google.com/store/apps/details?id=com.transsnetfinancial.palmcredit"
  },
  {
    id: 3,
    name: "Carbon",
    loanAmount: "₦2,500 – ₦1,000,000",
    interestRate: "4.5% – 30% monthly",
    tenor: "61 – 365 days",
    requirements: ["BVN"],
    useCases: ["Gallery Rentals", "Equipment Purchase"],
    applyUrl: "https://getcarbon.co/"
  },
  {
    id: 4,
    name: "Branch",
    loanAmount: "₦6,000 – ₦1,000,000",
    interestRate: "3% – 23% monthly",
    tenor: "62 – 365 days",
    requirements: ["BVN"],
    useCases: ["Event Hosting", "Transport for Performers"],
    applyUrl: "https://branch.co/"
  },
  {
    id: 5,
    name: "Aella Credit",
    loanAmount: "₦1,500 – ₦1,000,000",
    interestRate: "4% – 29% monthly",
    tenor: "60 – 180 days",
    requirements: ["BVN"],
    useCases: ["Vendor Stock", "Equipment"],
    applyUrl: "https://aellaapp.com/"
  },
  {
    id: 6,
    name: "QuickCheck",
    loanAmount: "₦1,500 – ₦1,000,000",
    interestRate: "5% – 30% monthly",
    tenor: "91 – 365 days",
    requirements: ["BVN"],
    useCases: ["Event Hosting", "Equipment"],
    applyUrl: "https://www.quickcheck.ng/"
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

const Financial = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredProviders = loanProviders.filter(provider => {
    if (activeFilter === "All") return true;
    return provider.useCases.includes(activeFilter);
  });

  return (
    <div className="min-h-screen bg-white flex flex-col pt-16">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-naija-lightgreen py-16 px-4 text-center">
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
            <h2 className="section-title">Loan Marketplace</h2>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2 mb-8">
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

            {/* Loan Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="border shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{provider.name}</h3>
                    
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
                  </CardContent>
                  <CardFooter className="pt-0 pb-6 px-6">
                    <Button className="w-full bg-naija-green hover:bg-naija-green/90 text-white flex items-center justify-center gap-2">
                      Apply Now <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section-padding bg-gray-50">
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
                NaijaCulture360 does not issue loans. All loan decisions are made by the providers listed. 
                Ensure responsible borrowing. Loans are subject to provider terms. 
                Affiliate links may generate platform revenue.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Financial;
