import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Landmark, Search, Filter, Map, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CulturalSpot {
  id: number;
  name: string;
  state: string;
  city: string;
  image: string;
  description: string;
  category: "museum" | "gallery" | "monument" | "heritage" | "festival" | "market";
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const culturalSpots: CulturalSpot[] = [
  {
    id: 1,
    name: "Nike Art Gallery",
    state: "Lagos",
    city: "Lekki",
    image: "https://core.colorsxstudios.com/wp-content/uploads/2022/07/15A8793.jpg",
    description: "Home to thousands of artworks from renowned and emerging Nigerian artists across various mediums including paintings, sculptures, and textiles.",
    category: "gallery",
    coordinates: {
      latitude: 6.4281,
      longitude: 3.4538
    }
  },
  {
    id: 2,
    name: "National Museum",
    state: "Lagos",
    city: "Onikan",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/2d/c9/c2/the-national-museum.jpg?w=1200&h=-1&s=1",
    description: "Preserving Nigeria's cultural heritage with artifacts spanning centuries, including the famous Benin Bronzes and Nok terracottas.",
    category: "museum",
    coordinates: {
      latitude: 6.4433,
      longitude: 3.4050
    }
  },
  {
    id: 3,
    name: "Osun Sacred Grove",
    state: "Osun",
    city: "Osogbo",
    image: "https://rexclarkeadventures.com/wp-content/uploads/2024/08/smocontemporaryart-kelechi-amadi-obi-osun-osogbo-sacred-grove-iv-2022.jpg",
    description: "UNESCO World Heritage site dedicated to the goddess of fertility, featuring ancient sculptures and sacred shrines within pristine forest.",
    category: "heritage",
    coordinates: {
      latitude: 7.7611,
      longitude: 4.5612
    }
  },
  {
    id: 4,
    name: "Terra Kulture",
    state: "Lagos",
    city: "Victoria Island",
    image: "https://terrakulture.com/wp-content/uploads/2023/03/IMG_2574.jpg",
    description: "A cultural center promoting Nigerian languages, arts, and culture through exhibitions, theater productions, and educational programs.",
    category: "gallery",
    coordinates: {
      latitude: 6.4281,
      longitude: 3.4226
    }
  },
  {
    id: 5,
    name: "Kajuru Castle",
    state: "Kaduna",
    city: "Kajuru",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/3b/ef/23/20171002-081326-largejpg.jpg?w=900&h=500&s=1",
    description: "A medieval German-style castle built in the 1990s, offering stunning views of the surrounding hills and countryside.",
    category: "monument",
    coordinates: {
      latitude: 10.3671,
      longitude: 7.7041
    }
  },
  {
    id: 6,
    name: "Ogbunike Caves",
    state: "Anambra",
    city: "Ogbunike",
    image: "https://rexclarkeadventures.com/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-15-at-4.34.04-PM.jpeg",
    description: "A system of caves and tunnels created by erosion, holding cultural and spiritual significance for the local community.",
    category: "heritage",
    coordinates: {
      latitude: 6.1721,
      longitude: 6.9005
    }
  },
  {
    id: 7,
    name: "Lekki Conservation Centre",
    state: "Lagos",
    city: "Lekki",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/56/f6/d9/the-swaying-of-the-walkways.jpg?w=800&h=500&s=1",
    description: "A nature reserve with diverse flora and fauna, featuring the longest canopy walkway in Africa.",
    category: "heritage",
    coordinates: {
      latitude: 6.4449,
      longitude: 3.5364
    }
  },
  {
    id: 8,
    name: "New Afrika Shrine",
    state: "Lagos",
    city: "Ikeja",
    image: "https://visaliv.s3.ap-south-1.amazonaws.com/New-Afrika-Shrine-Nigeria.jpg",
    description: "Entertainment center established by Femi Kuti, preserving the legacy of Afrobeat pioneer Fela Kuti through live performances.",
    category: "monument",
    coordinates: {
      latitude: 6.6018,
      longitude: 3.3515
    }
  }
];

// Complete list of Nigerian states 
const nigerianStates = [
  "All States", "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", 
  "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", 
  "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const CulturalDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [filters, setFilters] = useState({
    museums: true,
    galleries: true,
    heritage: true,
    monuments: true,
    festivals: true,
    markets: true
  });

  // Simulate map loading after 1 second
  const loadMap = () => {
    setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
  };

  // Toggle the map view and load map when first switched to map view
  const handleToggleView = () => {
    const newShowMap = !showMap;
    setShowMap(newShowMap);
    if (newShowMap && !mapLoaded) {
      loadMap();
    }
  };

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "museum", name: "Museums" },
    { id: "gallery", name: "Art Galleries" },
    { id: "monument", name: "Monuments" },
    { id: "heritage", name: "Heritage Sites" },
    { id: "festival", name: "Festivals" },
    { id: "market", name: "Markets" }
  ];
  
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

  const filteredSpots = culturalSpots.filter(spot => {
    // Filter by search query
    const searchMatch = spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        spot.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by state
    const stateMatch = selectedState === "All States" || spot.state === selectedState;
    
    // Filter by category
    const categoryMatch = selectedCategory === "all" || spot.category === selectedCategory;
    
    // Apply map filters if showing map
    let mapFilterMatch = true;
    if (showMap) {
      mapFilterMatch = (
        (spot.category === "museum" && filters.museums) ||
        (spot.category === "gallery" && filters.galleries) ||
        (spot.category === "heritage" && filters.heritage) ||
        (spot.category === "monument" && filters.monuments) ||
        (spot.category === "festival" && filters.festivals) ||
        (spot.category === "market" && filters.markets)
      );
    }
    
    return searchMatch && stateMatch && categoryMatch && mapFilterMatch;
  });

  return (
    <section id="directory" className="section-padding bg-naija-lightgreen/40">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 className="section-title flex items-center gap-2">
            <Landmark className="h-6 w-6" />
            Cultural Directory
          </h2>
          <div className="flex items-center gap-2">
            <Button 
              variant={showMap ? "outline" : "secondary"}
              className={`flex items-center gap-2 ${showMap ? "border-naija-gold text-naija-gold" : "bg-naija-gold text-black"}`}
              onClick={handleToggleView}
            >
              {showMap ? "List View" : "Map View"} 
              {showMap ? <Landmark className="h-4 w-4" /> : <Map className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              className="text-naija-green hover:text-naija-green/90 hover:bg-naija-lightgreen flex items-center gap-1"
            >
              Full Directory <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search cultural attractions..." 
              className="pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select onValueChange={setSelectedState} defaultValue={selectedState}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {nigerianStates.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select onValueChange={setSelectedCategory} defaultValue={selectedCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {showMap ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-5 w-5 text-naija-green" />
                <h3 className="font-semibold">Map Layers</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="dir-museums" 
                    checked={filters.museums}
                    onCheckedChange={() => toggleFilter("museums")}
                  />
                  <Label htmlFor="dir-museums">Museums</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="dir-galleries" 
                    checked={filters.galleries}
                    onCheckedChange={() => toggleFilter("galleries")}
                  />
                  <Label htmlFor="dir-galleries">Art Galleries</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="dir-heritage" 
                    checked={filters.heritage}
                    onCheckedChange={() => toggleFilter("heritage")}
                  />
                  <Label htmlFor="dir-heritage">Heritage Sites</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="dir-monuments" 
                    checked={filters.monuments}
                    onCheckedChange={() => toggleFilter("monuments")}
                  />
                  <Label htmlFor="dir-monuments">Monuments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="dir-festivals" 
                    checked={filters.festivals}
                    onCheckedChange={() => toggleFilter("festivals")}
                  />
                  <Label htmlFor="dir-festivals">Festival Locations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="dir-markets" 
                    checked={filters.markets}
                    onCheckedChange={() => toggleFilter("markets")}
                  />
                  <Label htmlFor="dir-markets">Cultural Markets</Label>
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-4 space-y-3">
                <h4 className="font-medium text-sm mb-2">Price Range</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dir-free" />
                  <Label htmlFor="dir-free">Free Entry</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dir-budget" />
                  <Label htmlFor="dir-budget">Budget (₦0 - ₦2,000)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dir-mid" />
                  <Label htmlFor="dir-mid">Mid-range (₦2,000 - ₦5,000)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dir-premium" />
                  <Label htmlFor="dir-premium">Premium (₦5,000+)</Label>
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-4 space-y-3">
                <h4 className="font-medium text-sm mb-2">Accessibility</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dir-wheelchair" />
                  <Label htmlFor="dir-wheelchair">Wheelchair Accessible</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dir-parking" />
                  <Label htmlFor="dir-parking">Parking Available</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dir-public" />
                  <Label htmlFor="dir-public">Public Transport</Label>
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
                        The interactive map displays {filteredSpots.length} cultural and tourism locations
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
                  <span className="text-xs text-gray-500 ml-auto">
                    ({culturalSpots.filter(spot => spot.category === "museum").length})
                  </span>
                </div>
                <div className="bg-gray-100 p-3 rounded flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Heritage Sites</span>
                  <span className="text-xs text-gray-500 ml-auto">
                    ({culturalSpots.filter(spot => spot.category === "heritage").length})
                  </span>
                </div>
                <div className="bg-gray-100 p-3 rounded flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-xs">Art Galleries</span>
                  <span className="text-xs text-gray-500 ml-auto">
                    ({culturalSpots.filter(spot => spot.category === "gallery").length})
                  </span>
                </div>
                <div className="bg-gray-100 p-3 rounded flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">Monuments</span>
                  <span className="text-xs text-gray-500 ml-auto">
                    ({culturalSpots.filter(spot => spot.category === "monument").length})
                  </span>
                </div>
                <div className="bg-gray-100 p-3 rounded flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs">Festivals</span>
                  <span className="text-xs text-gray-500 ml-auto">
                    ({culturalSpots.filter(spot => spot.category === "festival").length})
                  </span>
                </div>
                <div className="bg-gray-100 p-3 rounded flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-xs">Markets</span>
                  <span className="text-xs text-gray-500 ml-auto">
                    ({culturalSpots.filter(spot => spot.category === "market").length})
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSpots.map((spot) => (
              <Card key={spot.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div 
                  className="h-[180px] bg-cover bg-center rounded-t-md" 
                  style={{ backgroundImage: `url(${spot.image})` }}
                ></div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-1 text-naija-green text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{spot.city}, {spot.state}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{spot.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{spot.description}</p>
                </CardContent>
                <CardFooter className="px-5 pb-5 pt-0 flex justify-between">
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-naija-green hover:text-naija-green/80 flex items-center gap-1"
                  >
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 text-xs border-naija-green text-naija-green hover:bg-naija-lightgreen"
                    onClick={() => setShowMap(true)}
                  >
                    <Map className="h-3 w-3 mr-1" /> View on Map
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {!showMap && filteredSpots.length > 0 && (
          <div className="text-center mt-8">
            <Button className="bg-naija-green hover:bg-naija-green/90 text-white">
              Load More Attractions
            </Button>
          </div>
        )}
        
        {filteredSpots.length === 0 && (
          <div className="text-center py-12">
            <Landmark className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium mb-2">No cultural spots found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CulturalDirectory;
