
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Landmark, Utensils, Building, Coffee, Calendar } from "lucide-react";

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
            
            {/* This is a placeholder for the actual content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Listings coming soon</span>
              </div>
              <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Listings coming soon</span>
              </div>
              <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Listings coming soon</span>
              </div>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DirectoryTabs;
