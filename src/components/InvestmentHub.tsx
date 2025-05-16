
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Info, 
  Briefcase, 
  Building, 
  Star, 
  Flag, 
  Filter, 
  Search,
  MapPin,
  Sliders,
  Calendar
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Investment {
  id: number;
  title: string;
  sector: string;
  icon: "Briefcase" | "Building" | "Star" | "Flag";
  summary: string;
  location: string;
  state: string;
  investmentSize: "small" | "medium" | "large";
  roi: {
    timeframe: string;
    percentage: number;
  };
  featured: boolean;
}

const investments: Investment[] = [
  {
    id: 1,
    title: "Invest in Lagos Arts Residency",
    sector: "Creative sector",
    icon: "Star",
    summary: "Build a world-class artist residency program in Lagos to foster creative talent and cultural exchange.",
    location: "Lekki, Lagos",
    state: "Lagos",
    investmentSize: "medium",
    roi: {
      timeframe: "3-5 years",
      percentage: 18
    },
    featured: true
  },
  {
    id: 2,
    title: "Osun Grove Tourism Development (PPP)",
    sector: "Heritage sector",
    icon: "Building",
    summary: "Public-Private Partnership to develop sustainable tourism infrastructure around the UNESCO World Heritage site.",
    location: "Osogbo, Osun",
    state: "Osun",
    investmentSize: "large",
    roi: {
      timeframe: "5-7 years",
      percentage: 22
    },
    featured: true
  },
  {
    id: 3,
    title: "Diaspora Hospitality Co-Investment",
    sector: "Real Estate",
    icon: "Flag",
    summary: "Joint venture opportunity for diaspora investors to develop boutique hospitality properties across Nigeria.",
    location: "Multiple Locations",
    state: "Multiple",
    investmentSize: "large",
    roi: {
      timeframe: "3-6 years",
      percentage: 25
    },
    featured: false
  },
  {
    id: 4,
    title: "Revamp Badagry Slave Museum",
    sector: "Infrastructure",
    icon: "Briefcase",
    summary: "Major renovation project to transform the historic Badagry Slave Museum into a world-class cultural institution.",
    location: "Badagry, Lagos",
    state: "Lagos",
    investmentSize: "medium",
    roi: {
      timeframe: "4-6 years",
      percentage: 15
    },
    featured: false
  },
  {
    id: 5,
    title: "Cross River Eco-Tourism Resort",
    sector: "Tourism Infrastructure",
    icon: "Building",
    summary: "Development of an eco-friendly resort near the Cross River National Park to promote sustainable tourism.",
    location: "Calabar, Cross River",
    state: "Cross River",
    investmentSize: "large",
    roi: {
      timeframe: "5-8 years",
      percentage: 20
    },
    featured: true
  },
  {
    id: 6,
    title: "Traditional Craft Marketplace",
    sector: "Creative sector",
    icon: "Star",
    summary: "Create a modern marketplace for traditional Nigerian crafts, connecting artisans to global markets.",
    location: "Abuja, FCT",
    state: "FCT",
    investmentSize: "small",
    roi: {
      timeframe: "2-4 years",
      percentage: 16
    },
    featured: false
  },
  {
    id: 7,
    title: "Kano Dye Pits Preservation",
    sector: "Heritage sector",
    icon: "Flag",
    summary: "Investment in preserving the 500-year-old Kano dye pits while developing sustainable tourism models.",
    location: "Kano, Kano",
    state: "Kano",
    investmentSize: "small",
    roi: {
      timeframe: "3-5 years",
      percentage: 14
    },
    featured: false
  },
  {
    id: 8,
    title: "Lagos Island Cultural District",
    sector: "Real Estate",
    icon: "Building",
    summary: "Urban renewal project to transform part of Lagos Island into a vibrant cultural and entertainment district.",
    location: "Lagos Island, Lagos",
    state: "Lagos",
    investmentSize: "large",
    roi: {
      timeframe: "7-10 years",
      percentage: 30
    },
    featured: true
  }
];

const IconMap = {
  Briefcase: <Briefcase className="h-6 w-6" />,
  Building: <Building className="h-6 w-6" />,
  Star: <Star className="h-6 w-6" />,
  Flag: <Flag className="h-6 w-6" />,
};

const nigerianStates = [
  "All States", "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", 
  "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", 
  "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "Multiple"
];

const InvestmentHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const sectors = [
    { id: "all", name: "All Sectors" },
    { id: "Creative sector", name: "Creative Sector" },
    { id: "Heritage sector", name: "Heritage Sector" },
    { id: "Real Estate", name: "Real Estate" },
    { id: "Infrastructure", name: "Infrastructure" },
    { id: "Tourism Infrastructure", name: "Tourism Infrastructure" }
  ];

  const investmentSizes = [
    { id: "all", name: "All Sizes" },
    { id: "small", name: "Small ($50K - $250K)" },
    { id: "medium", name: "Medium ($250K - $1M)" },
    { id: "large", name: "Large ($1M+)" }
  ];

  const filteredInvestments = investments.filter(investment => {
    // Filter by search query
    const searchMatch = investment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       investment.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       investment.sector.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by state
    const stateMatch = selectedState === "All States" || investment.state === selectedState;
    
    // Filter by sector
    const sectorMatch = selectedSector === "all" || investment.sector === selectedSector;
    
    // Filter by size
    const sizeMatch = selectedSize === "all" || investment.investmentSize === selectedSize;
    
    return searchMatch && stateMatch && sectorMatch && sizeMatch;
  });

  return (
    <section id="investment" className="section-padding bg-naija-lightgold/50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 className="section-title flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            Investment Hub
          </h2>
          <Button 
            variant="outline"
            className="border-naija-green text-naija-green hover:bg-naija-lightgreen flex items-center gap-1"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {/* Filters section */}
        {showFilters && (
          <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search opportunities..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1.5">Location</label>
                <Select onValueChange={setSelectedState} defaultValue={selectedState}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianStates.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1.5">Sector</label>
                <Select onValueChange={setSelectedSector} defaultValue={selectedSector}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map(sector => (
                      <SelectItem key={sector.id} value={sector.id}>{sector.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1.5">Investment Size</label>
                <Select onValueChange={setSelectedSize} defaultValue={selectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {investmentSizes.map(size => (
                      <SelectItem key={size.id} value={size.id}>{size.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvestments.map((investment) => (
            <Card 
              key={investment.id} 
              className={`border shadow-sm hover:shadow-md transition-shadow ${
                investment.featured ? 'border-naija-gold' : 'border-naija-gold/30'
              }`}
            >
              <CardContent className="p-5">
                <div className="mb-4 flex justify-between items-center">
                  <span className="bg-naija-lightgreen text-naija-green text-xs font-medium py-1 px-3 rounded-full">
                    {investment.sector}
                  </span>
                  <div className="text-naija-gold">
                    {IconMap[investment.icon]}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-3">{investment.title}</h3>
                
                <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{investment.location}</span>
                </div>
                
                <p className="text-gray-600 mb-4">{investment.summary}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-naija-green text-naija-green">
                    <Sliders className="h-3 w-3 mr-1" />
                    {investment.investmentSize === "small" ? "Small" : 
                     investment.investmentSize === "medium" ? "Medium" : "Large"}
                  </Badge>
                  <Badge variant="outline" className="border-naija-gold text-naija-gold">
                    <Star className="h-3 w-3 mr-1" />
                    {investment.roi.percentage}% ROI
                  </Badge>
                  <Badge variant="outline" className="border-gray-400 text-gray-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    {investment.roi.timeframe}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="px-5 pb-5 pt-0">
                <Button 
                  className="bg-naija-green hover:bg-naija-green/90 text-white w-full flex items-center justify-center gap-1"
                >
                  View Opportunity <Info className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredInvestments.length === 0 && (
          <div className="text-center p-12 bg-white rounded-lg border border-gray-200">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium mb-2">No investment opportunities found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}

        <div className="mt-12 bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Investment Information</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-naija-green font-medium">
                How to Invest
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 mb-2">
                  Our investment opportunities are open to both local and diaspora investors. Each listing includes:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Project scope and background</li>
                  <li>Investment requirements and structure</li>
                  <li>Expected returns and timeframes</li>
                  <li>Government incentives and support available</li>
                </ul>
                <p className="text-gray-600 mt-2">
                  Contact our investment advisors for personalized guidance and due diligence support.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-naija-green font-medium">
                Investment Sizes Explained
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="border-naija-green text-naija-green">
                      Small
                    </Badge>
                    <span>$50,000 - $250,000 USD investment requirement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="border-naija-green text-naija-green">
                      Medium
                    </Badge>
                    <span>$250,000 - $1,000,000 USD investment requirement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="border-naija-green text-naija-green">
                      Large
                    </Badge>
                    <span>$1,000,000+ USD investment requirement</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-naija-green font-medium">
                Diaspora Investment Program
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  Our Diaspora Investment Program offers exclusive benefits to Nigerians living abroad, including:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 mt-2">
                  <li>Expedited investment processing</li>
                  <li>Foreign currency account facilities</li>
                  <li>Tax benefits on repatriated funds</li>
                  <li>Local representation and management options</li>
                  <li>Networking with other diaspora investors</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default InvestmentHub;
