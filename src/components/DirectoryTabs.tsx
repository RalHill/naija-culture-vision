
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Landmark, Utensils, Building, Coffee, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Map } from "lucide-react";

interface DirectoryTabsProps {
  className?: string;
  defaultValue?: string;
}

export const DIRECTORY_CATEGORIES = [
  {
    id: "cultural-sites",
    name: "Cultural Sites",
    icon: Landmark,
    description: "Museums, galleries, historical landmarks and cultural centers in Lagos"
  },
  {
    id: "street-food",
    name: "Street Food Spots",
    icon: Utensils,
    description: "Local street food vendors and traditional food spots across Lagos"
  },
  {
    id: "hotels",
    name: "Hotels & Short-lets",
    icon: Building,
    description: "Accommodation options from luxury hotels to short-term apartment rentals"
  },
  {
    id: "restaurants",
    name: "Restaurants",
    icon: Coffee,
    description: "Fine dining, casual eateries and local restaurants in Lagos"
  },
  {
    id: "event-halls",
    name: "Event Hall Bookings",
    icon: Calendar,
    description: "Venues and halls available for events, conferences and celebrations"
  }
];

// Define the listing interface
interface Listing {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
}

// Define listings for each category
const LISTINGS = {
  "cultural-sites": [
    {
      id: 1,
      name: "Nike Art Gallery",
      location: "Lekki, Lagos",
      description: "Home to thousands of artworks from renowned and emerging Nigerian artists.",
      image: "https://images.unsplash.com/photo-1591492938236-5fa021344945?q=80&w=800"
    },
    {
      id: 2,
      name: "National Museum",
      location: "Onikan, Lagos",
      description: "Preserving Nigeria's cultural heritage with artifacts spanning centuries.",
      image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?q=80&w=800"
    },
    {
      id: 3,
      name: "Terra Kulture",
      location: "Victoria Island, Lagos",
      description: "A cultural hub for Nigerian arts, theater, food, and education.",
      image: "https://images.unsplash.com/photo-1594688354339-c8e91052438b?q=80&w=800"
    },
    {
      id: 4,
      name: "Freedom Park",
      location: "Lagos Island, Lagos",
      description: "Former colonial prison turned into an arts and cultural venue.",
      image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=800"
    },
    {
      id: 5,
      name: "Kalakuta Museum",
      location: "Ikeja, Lagos",
      description: "The home of Fela Kuti, preserved as a museum and cultural site.",
      image: "https://images.unsplash.com/photo-1571867424488-4565932edb41?q=80&w=800"
    },
    {
      id: 6,
      name: "Jaekel House",
      location: "Ebute Metta, Lagos",
      description: "Colonial-era house with photo and rail exhibits in historic Railway Compound.",
      image: "https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=800"
    }
  ],
  "street-food": [
    {
      id: 1,
      name: "White House Buka",
      location: "Yaba, Lagos",
      description: "Iconic local spot for amala, gbegiri, and assorted meats.",
      image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?q=80&w=800"
    },
    {
      id: 2,
      name: "Amala Shitta",
      location: "Surulere, Lagos",
      description: "Legendary buka serving hot amala with ewedu and stew.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800"
    },
    {
      id: 3,
      name: "WosiWosi Efo Joint",
      location: "Bariga, Lagos",
      description: "Popular for efo riro, jollof, and native rice.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800"
    },
    {
      id: 4,
      name: "Glover Court Suya",
      location: "Ikoyi, Lagos",
      description: "Famous nighttime suya joint with vibrant street culture.",
      image: "https://images.unsplash.com/photo-1607478900766-efe13248b125?q=80&w=800"
    },
    {
      id: 5,
      name: "Mama Ebo Pepper Soup",
      location: "Apapa, Lagos",
      description: "Known for spicy goat meat pepper soup and chilled drinks.",
      image: "https://images.unsplash.com/photo-1613391538631-6834c9a56ec6?q=80&w=800"
    },
    {
      id: 6,
      name: "Ajibola Suya Spot",
      location: "Abule Egba, Lagos",
      description: "Local favorite for grilled beef suya with spicy sauce.",
      image: "https://images.unsplash.com/photo-1559561853-08451507cbe7?q=80&w=800"
    }
  ],
  "hotels": [
    {
      id: 1,
      name: "Eko Hotels & Suites",
      location: "Victoria Island, Lagos",
      description: "Lagos' most prominent luxury hotel and convention center.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800"
    },
    {
      id: 2,
      name: "Lagos Continental Hotel",
      location: "Victoria Island, Lagos",
      description: "High-rise hotel offering panoramic views of Lagos and the ocean.",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800"
    },
    {
      id: 3,
      name: "Radisson Blu Anchorage Hotel",
      location: "Victoria Island, Lagos",
      description: "Waterfront hotel with modern amenities and fine dining.",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800"
    },
    {
      id: 4,
      name: "The Wheatbaker",
      location: "Ikoyi, Lagos",
      description: "Boutique luxury hotel known for refined service and style.",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800"
    },
    {
      id: 5,
      name: "S&S Hotels and Suites",
      location: "Ikeja, Lagos",
      description: "Affordable comfort in the heart of Lagos mainland.",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800"
    },
    {
      id: 6,
      name: "Shortlet by Spaces",
      location: "Lekki Phase 1, Lagos",
      description: "Stylish, fully serviced apartments ideal for short-term stays.",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800"
    }
  ],
  "restaurants": [
    {
      id: 1,
      name: "Z Kitchen",
      location: "Victoria Island, Lagos",
      description: "Contemporary restaurant with an eclectic international menu.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800"
    },
    {
      id: 2,
      name: "The Yellow Chilli",
      location: "Victoria Island, Lagos",
      description: "Nigerian fusion cuisine in a modern, upscale setting.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800"
    },
    {
      id: 3,
      name: "RSVP Lagos",
      location: "Victoria Island, Lagos",
      description: "Chic dining experience with brunch, cocktails, and global flavors.",
      image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=800"
    },
    {
      id: 4,
      name: "Shiro Lagos",
      location: "Landmark Centre, VI",
      description: "Asian fine dining with a beachfront ambiance.",
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800"
    },
    {
      id: 5,
      name: "Ofadaboy Restaurant",
      location: "Surulere, Lagos",
      description: "Famous for traditional ofada rice and assorted meats.",
      image: "https://images.unsplash.com/photo-1603357465999-192bfc035303?q=80&w=800"
    },
    {
      id: 6,
      name: "Bungalow Restaurant",
      location: "Victoria Island, Lagos",
      description: "Mexican, Asian, and American menu with rooftop vibes.",
      image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=800"
    }
  ],
  "event-halls": [
    {
      id: 1,
      name: "The Podium",
      location: "Lekki, Lagos",
      description: "Elegant multi-purpose event center for weddings and corporate functions.",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800"
    },
    {
      id: 2,
      name: "Monarch Event Centre",
      location: "Lekki, Lagos",
      description: "Luxury venue with state-of-the-art sound and lighting.",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800"
    },
    {
      id: 3,
      name: "Eko Convention Centre",
      location: "Victoria Island, Lagos",
      description: "Nigeria's largest event hall for concerts, conferences, and exhibitions.",
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=800"
    },
    {
      id: 4,
      name: "Haven Event Centre",
      location: "Ikeja GRA, Lagos",
      description: "Versatile indoor/outdoor venue with banquet and conference facilities.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800"
    },
    {
      id: 5,
      name: "10 Degrees Event Centre",
      location: "Oregun, Lagos",
      description: "Spacious venue for large-scale parties and religious events.",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800"
    },
    {
      id: 6,
      name: "Glitz Events Centre",
      location: "Lekki, Lagos",
      description: "Contemporary event space with premium interior and amenities.",
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800"
    }
  ]
};

const DirectoryTabs = ({ className, defaultValue = "cultural-sites" }: DirectoryTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <Tabs 
      defaultValue={defaultValue} 
      className={cn("w-full", className)}
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <TabsList className="h-auto flex overflow-x-auto py-2 w-full justify-start bg-gray-100 rounded-lg mb-6">
        {DIRECTORY_CATEGORIES.map((category) => (
          <TabsTrigger 
            key={category.id}
            value={category.id}
            className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-naija-green data-[state=active]:text-white"
          >
            <category.icon className="h-4 w-4" />
            <span>{category.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {DIRECTORY_CATEGORIES.map((category) => (
        <TabsContent key={category.id} value={category.id} className="mt-0">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <category.icon className="h-5 w-5 text-naija-green" />
              {category.name} in Lagos
            </h3>
            <p className="text-gray-600 mb-4">{category.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LISTINGS[category.id as keyof typeof LISTINGS].map((listing) => (
                <Card key={listing.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div 
                    className="h-[180px] bg-cover bg-center rounded-t-md" 
                    style={{ backgroundImage: `url(${listing.image})` }}
                  ></div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-1 text-naija-green text-sm mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{listing.location}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{listing.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
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
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DirectoryTabs;
