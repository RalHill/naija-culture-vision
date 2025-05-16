
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Layers, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const MapView = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [filters, setFilters] = useState({
    museums: true,
    galleries: true,
    heritage: true,
    monuments: true,
    festivals: true,
    markets: true
  });
  
  // Simulate map loading after 2 seconds
  setTimeout(() => {
    setMapLoaded(true);
  }, 2000);

  const regions = [
    { id: "all", name: "All Regions" },
    { id: "north-central", name: "North Central" },
    { id: "north-east", name: "North East" },
    { id: "north-west", name: "North West" },
    { id: "south-east", name: "South East" },
    { id: "south-south", name: "South South" },
    { id: "south-west", name: "South West" }
  ];

  const toggleFilter = (filterName: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  return (
    <section id="map" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 className="section-title flex items-center gap-2">
            <MapPin className="h-6 w-6" />
            Interactive Map
          </h2>
        </div>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-start">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search locations..." 
              className="pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select onValueChange={setSelectedRegion} defaultValue={selectedRegion}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map(region => (
                <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            className="border-naija-green text-naija-green hover:bg-naija-lightgreen flex items-center gap-1"
          >
            <Filter className="h-4 w-4" /> More Filters
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-5 w-5 text-naija-green" />
              <h3 className="font-semibold">Map Layers</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="museums" 
                  checked={filters.museums}
                  onCheckedChange={() => toggleFilter("museums")}
                />
                <Label htmlFor="museums">Museums</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="galleries" 
                  checked={filters.galleries}
                  onCheckedChange={() => toggleFilter("galleries")}
                />
                <Label htmlFor="galleries">Art Galleries</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="heritage" 
                  checked={filters.heritage}
                  onCheckedChange={() => toggleFilter("heritage")}
                />
                <Label htmlFor="heritage">Heritage Sites</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="monuments" 
                  checked={filters.monuments}
                  onCheckedChange={() => toggleFilter("monuments")}
                />
                <Label htmlFor="monuments">Monuments</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="festivals" 
                  checked={filters.festivals}
                  onCheckedChange={() => toggleFilter("festivals")}
                />
                <Label htmlFor="festivals">Festival Locations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="markets" 
                  checked={filters.markets}
                  onCheckedChange={() => toggleFilter("markets")}
                />
                <Label htmlFor="markets">Cultural Markets</Label>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-4 space-y-3">
              <h4 className="font-medium text-sm mb-2">Price Range</h4>
              <div className="flex items-center space-x-2">
                <Checkbox id="free" />
                <Label htmlFor="free">Free Entry</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="budget" />
                <Label htmlFor="budget">Budget (₦0 - ₦2,000)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="mid" />
                <Label htmlFor="mid">Mid-range (₦2,000 - ₦5,000)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="premium" />
                <Label htmlFor="premium">Premium (₦5,000+)</Label>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-4 space-y-3">
              <h4 className="font-medium text-sm mb-2">Accessibility</h4>
              <div className="flex items-center space-x-2">
                <Checkbox id="wheelchair" />
                <Label htmlFor="wheelchair">Wheelchair Accessible</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="parking" />
                <Label htmlFor="parking">Parking Available</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="public" />
                <Label htmlFor="public">Public Transport</Label>
              </div>
            </div>
            
            <Button className="w-full bg-naija-green hover:bg-naija-green/90 text-white mt-6">
              Apply Filters
            </Button>
          </div>
          
          <div className="md:col-span-3">
            <div className="h-[600px] bg-gray-100 rounded-lg border border-gray-200 relative">
              {!mapLoaded ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-naija-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-naija-green font-medium">Loading interactive map...</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-naija-green mx-auto mb-2" />
                    <p className="text-lg font-semibold text-naija-green">Map Integration Ready</p>
                    <p className="text-gray-600 max-w-md mx-auto mt-2">
                      The interactive map will display all cultural and tourism locations across Nigeria 
                      based on your selected filters.
                    </p>
                    <div className="mt-6">
                      <Button className="bg-naija-gold hover:bg-naija-gold/90 text-black">
                        Show My Location
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="bg-gray-100 p-3 rounded flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs">Museums</span>
                <span className="text-xs text-gray-500 ml-auto">(12)</span>
              </div>
              <div className="bg-gray-100 p-3 rounded flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Heritage Sites</span>
                <span className="text-xs text-gray-500 ml-auto">(8)</span>
              </div>
              <div className="bg-gray-100 p-3 rounded flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-xs">Art Galleries</span>
                <span className="text-xs text-gray-500 ml-auto">(15)</span>
              </div>
              <div className="bg-gray-100 p-3 rounded flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs">Monuments</span>
                <span className="text-xs text-gray-500 ml-auto">(10)</span>
              </div>
              <div className="bg-gray-100 p-3 rounded flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs">Festivals</span>
                <span className="text-xs text-gray-500 ml-auto">(7)</span>
              </div>
              <div className="bg-gray-100 p-3 rounded flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-xs">Markets</span>
                <span className="text-xs text-gray-500 ml-auto">(9)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapView;
