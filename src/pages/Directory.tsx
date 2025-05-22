
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { SearchBar } from "@/components/SearchBar";
import DirectoryTabs from "@/components/DirectoryTabs";
import { Button } from "@/components/ui/button";
import { Filter, MapPin, Star } from "lucide-react";

const Directory = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
      <Header />
      <main className="flex-1">
        {/* Global Search Bar */}
        <div className="bg-white py-4 px-4 shadow-sm">
          <div className="container mx-auto">
            <SearchBar placeholder="Search attractions, restaurants, or hotels in Lagos..." />
          </div>
        </div>

        {/* Directory Hero */}
        <div className="bg-naija-green text-white py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-3">Lagos Directory</h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Discover the best cultural sites, food spots, accommodations, and venues that Lagos has to offer
            </p>
          </div>
        </div>

        {/* Directory Content */}
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filter Panel (Desktop) */}
            <div className="hidden md:block w-64 shrink-0">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-5 w-5 text-naija-green" />
                  <h3 className="font-semibold">Filters</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Rating Filter */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">Rating</h4>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <Button
                          key={rating}
                          variant="outline"
                          size="sm"
                          className={`w-full justify-start ${
                            activeFilter === `rating-${rating}` ? 'border-naija-green text-naija-green' : 'border-gray-200'
                          }`}
                          onClick={() => handleFilterClick(`rating-${rating}`)}
                        >
                          <div className="flex items-center gap-1">
                            {Array(rating).fill(0).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            {Array(5 - rating).fill(0).map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-gray-300" />
                            ))}
                            <span className="ml-1">& up</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Area Filter */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">Area</h4>
                    <div className="space-y-2">
                      {["Lekki", "Victoria Island", "Ikeja", "Ikoyi", "Yaba", "Surulere"].map((area) => (
                        <Button
                          key={area}
                          variant="outline"
                          size="sm"
                          className={`w-full justify-start ${
                            activeFilter === `area-${area}` ? 'border-naija-green text-naija-green' : 'border-gray-200'
                          }`}
                          onClick={() => handleFilterClick(`area-${area}`)}
                        >
                          <MapPin className="h-3 w-3 mr-2" />
                          {area}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* More filters can be added here */}
                </div>
              </div>
            </div>
            
            {/* Main Directory Content */}
            <div className="flex-1">
              <DirectoryTabs />
            </div>
          </div>
          
          {/* Mobile Filter Button */}
          <div className="md:hidden fixed bottom-20 right-4">
            <Button className="rounded-full w-12 h-12 bg-naija-green shadow-lg p-0">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Directory;
