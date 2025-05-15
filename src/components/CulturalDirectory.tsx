
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Landmark } from "lucide-react";

interface CulturalSpot {
  id: number;
  name: string;
  location: string;
  image: string;
  description: string;
}

const culturalSpots: CulturalSpot[] = [
  {
    id: 1,
    name: "Nike Art Gallery",
    location: "Lagos",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=600",
    description: "Home to thousands of artworks from renowned and emerging Nigerian artists."
  },
  {
    id: 2,
    name: "National Museum",
    location: "Onikan",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=600",
    description: "Preserving Nigeria's cultural heritage with artifacts spanning centuries."
  },
  {
    id: 3,
    name: "Osun Sacred Grove",
    location: "Osun State",
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?q=80&w=600",
    description: "UNESCO World Heritage site dedicated to the goddess of fertility."
  },
  {
    id: 4,
    name: "Terra Kulture",
    location: "Lagos",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=600",
    description: "A cultural center promoting Nigerian languages, arts, and culture."
  }
];

const CulturalDirectory = () => {
  return (
    <section id="directory" className="section-padding bg-naija-lightgreen/40">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title flex items-center gap-2">
            <Landmark className="h-6 w-6" />
            Cultural Directory
          </h2>
          <Button 
            variant="ghost" 
            className="text-naija-green hover:text-naija-green/90 hover:bg-naija-lightgreen flex items-center gap-1"
          >
            Full Directory <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {culturalSpots.map((spot) => (
            <Card key={spot.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div 
                className="h-[180px] bg-cover bg-center rounded-t-md" 
                style={{ backgroundImage: `url(${spot.image})` }}
              ></div>
              <CardContent className="p-5">
                <div className="flex items-center gap-1 text-naija-green text-sm mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{spot.location}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{spot.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{spot.description}</p>
              </CardContent>
              <CardFooter className="px-5 pb-5 pt-0">
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-naija-green hover:text-naija-green/80 flex items-center gap-1"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CulturalDirectory;
