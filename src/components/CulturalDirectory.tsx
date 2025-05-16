
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Landmark, Search, Filter, Map } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=600",
    description: "Entertainment center established by Femi Kuti, preserving the legacy of Afrobeat pioneer Fela Kuti through live performances.",
    category: "monument",
    coordinates: {
      latitude: 6.6018,
      longitude: 3.3515
    }
  }
];

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

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "museum", name: "Museums" },
    { id: "gallery", name: "Art Galleries" },
    { id: "monument", name: "Monuments" },
    { id: "heritage", name: "Heritage Sites" },
    { id: "festival", name: "Festivals" },
    { id: "market", name: "Markets" }
  ];

  const filteredSpots = culturalSpots.filter(spot => {
    // Filter by search query
    const searchMatch = spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        spot.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by state
    const stateMatch = selectedState === "All States" || spot.state === selectedState;
    
    // Filter by category
    const categoryMatch = selectedCategory === "all" || spot.category === selectedCategory;
    
    return searchMatch && stateMatch && categoryMatch;
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
              onClick={() => setShowMap(!showMap)}
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
          <div className="h-[500px] w-full bg-gray-100 rounded-lg flex items-center justify-center mb-6">
            <div className="text-center">
              <Map className="h-12 w-12 text-naija-green mx-auto mb-2" />
              <p className="text-lg font-semibold text-naija-green">Map View Coming Soon</p>
              <p className="text-gray-600 max-w-md mx-auto mt-2">
                Soon you'll be able to explore all cultural locations visually across Nigeria on an interactive map.
              </p>
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
