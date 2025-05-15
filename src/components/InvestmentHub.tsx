
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Briefcase, Building, Star, Flag } from "lucide-react";

interface Investment {
  id: number;
  title: string;
  sector: string;
  icon: "Briefcase" | "Building" | "Star" | "Flag";
  summary: string;
}

const investments: Investment[] = [
  {
    id: 1,
    title: "Invest in Lagos Arts Residency",
    sector: "Creative sector",
    icon: "Star",
    summary: "Build a world-class artist residency program in Lagos to foster creative talent and cultural exchange."
  },
  {
    id: 2,
    title: "Osun Grove Tourism Development (PPP)",
    sector: "Heritage sector",
    icon: "Building",
    summary: "Public-Private Partnership to develop sustainable tourism infrastructure around the UNESCO World Heritage site."
  },
  {
    id: 3,
    title: "Diaspora Hospitality Co-Investment",
    sector: "Real Estate",
    icon: "Flag",
    summary: "Joint venture opportunity for diaspora investors to develop boutique hospitality properties across Nigeria."
  },
  {
    id: 4,
    title: "Revamp Badagry Slave Museum",
    sector: "Infrastructure",
    icon: "Briefcase",
    summary: "Major renovation project to transform the historic Badagry Slave Museum into a world-class cultural institution."
  }
];

const IconMap = {
  Briefcase: <Briefcase className="h-6 w-6" />,
  Building: <Building className="h-6 w-6" />,
  Star: <Star className="h-6 w-6" />,
  Flag: <Flag className="h-6 w-6" />,
};

const InvestmentHub = () => {
  return (
    <section id="investment" className="section-padding bg-naija-lightgold/50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            Investment Hub
          </h2>
          <Button 
            variant="ghost" 
            className="text-naija-green hover:text-naija-green/90 hover:bg-naija-lightgreen flex items-center gap-1"
          >
            All Opportunities <Info className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {investments.map((investment) => (
            <Card key={investment.id} className="border border-naija-gold/30 shadow-sm hover:shadow-md transition-shadow">
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
                <p className="text-gray-600 mb-4">{investment.summary}</p>
              </CardContent>
              <CardFooter className="px-5 pb-5 pt-0">
                <Button 
                  className="bg-naija-green hover:bg-naija-green/90 text-white flex items-center gap-1"
                >
                  See Details <Info className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentHub;
