
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface LoanProvider {
  id: number;
  name: string;
  loanAmount: string;
  interestRate: string;
  tenor: string;
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
    useCases: ["Event Hosting", "Equipment Purchase", "Vendor Stock"],
    applyUrl: "https://fairmoney.io/products/personal-loans"
  },
  {
    id: 2,
    name: "Palmcredit",
    loanAmount: "₦10,000 – ₦300,000",
    interestRate: "14% – 24% APR",
    tenor: "14 – 180 days",
    useCases: ["Transport", "Vendor Stock"],
    applyUrl: "https://play.google.com/store/apps/details?id=com.transsnetfinancial.palmcredit"
  },
  {
    id: 3,
    name: "Carbon",
    loanAmount: "₦2,500 – ₦1,000,000",
    interestRate: "4.5% – 30% monthly",
    tenor: "61 – 365 days",
    useCases: ["Gallery Rentals", "Equipment"],
    applyUrl: "https://getcarbon.co/"
  },
  {
    id: 4,
    name: "Branch",
    loanAmount: "₦6,000 – ₦1,000,000",
    interestRate: "3% – 23% monthly",
    tenor: "62 – 365 days",
    useCases: ["Event Hosting", "Transport"],
    applyUrl: "https://branch.co/"
  },
  {
    id: 5,
    name: "Aella Credit",
    loanAmount: "₦1,500 – ₦1,000,000",
    interestRate: "4% – 29% monthly",
    tenor: "60 – 180 days",
    useCases: ["Vendor Stock", "Equipment"],
    applyUrl: "https://aellaapp.com/"
  },
  {
    id: 6,
    name: "QuickCheck",
    loanAmount: "₦1,500 – ₦1,000,000",
    interestRate: "5% – 30% monthly",
    tenor: "91 – 365 days",
    useCases: ["Event Hosting", "Equipment"],
    applyUrl: "https://www.quickcheck.ng/"
  }
];

const useCaseCategories = [
  "All",
  "Event Hosting",
  "Equipment Purchase",
  "Vendor Stock",
  "Transport",
  "Gallery Rentals"
];

const LoanMarketplace = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredProviders = loanProviders.filter(provider => {
    if (activeFilter === "All") return true;
    return provider.useCases.includes(activeFilter);
  });

  return (
    <section id="loans" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2 text-naija-green">
           Microloans for Creators, Vendors, and Cultural Entrepreneurs
        </h2>
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-8">
          Access verified microloans to fund your next event, restock materials, rent a gallery, or transport performers.
        </p>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
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

        {/* Loan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProviders.map((provider) => (
            <Card key={provider.id} className="border shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">{provider.name}</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Loan Range:</span>
                    <span className="font-medium">{provider.loanAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Interest:</span>
                    <span className="font-medium">{provider.interestRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Tenor:</span>
                    <span className="font-medium">{provider.tenor}</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-600 font-medium">Use Case:</span>
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
                <a href={provider.applyUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="w-full bg-naija-green hover:bg-naija-green/90 text-white flex items-center justify-center gap-2">
                    Apply Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Footer Link */}
        <div className="text-center">
          <Link to="/financial">
            <Button 
              variant="outline" 
              className="border-naija-green text-naija-green hover:bg-naija-green hover:text-white"
            >
               View All Financial Services <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoanMarketplace;
