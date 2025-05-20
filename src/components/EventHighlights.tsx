
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Tag,
  Filter,
  Star,
  Search
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TicketTier {
  name: string;
  price: number;
  currency: string;
  available: boolean;
  isVIP: boolean;
}

interface Event {
  id: number;
  title: string;
  startDate: string;
  endDate?: string;
  time: string;
  location: {
    city: string;
    venue: string;
    state: string;
  };
  image: string;
  description: string;
  category: "music" | "art" | "culture" | "food" | "festival" | "conference";
  ticketTiers: TicketTier[];
  featured: boolean;
  isDecemberEvent: boolean;
}

const events: Event[] = [
  {
    id: 1,
    title: "Afro Nation Nigeria",
    startDate: "December 15, 2023",
    endDate: "December 17, 2023",
    time: "4:00 PM",
    location: {
      city: "Lagos",
      venue: "Eko Atlantic City",
      state: "Lagos"
    },
    image: "https://thebounce.net/wp-content/uploads/2023/06/CF9CFFC5-8B69-4ECE-A0C3-01730BCF69D9.png",
    description: "Africa's biggest afrobeats festival comes to Nigeria with a star-studded lineup of local and international artists.",
    category: "music",
    ticketTiers: [
      { name: "Regular", price: 25000, currency: "NGN", available: true, isVIP: false },
      { name: "Gold", price: 50000, currency: "NGN", available: true, isVIP: false },
      { name: "VIP", price: 100000, currency: "NGN", available: true, isVIP: true },
      { name: "VVIP", price: 250000, currency: "NGN", available: false, isVIP: true }
    ],
    featured: true,
    isDecemberEvent: true
  },
  {
    id: 2,
    title: "Felabration",
    startDate: "October 10, 2023",
    endDate: "October 16, 2023",
    time: "6:00 PM",
    location: {
      city: "Lagos",
      venue: "New Afrika Shrine",
      state: "Lagos"
    },
    image: "https://www.thecable.ng/wp-content/uploads/2024/05/FELABRATION-2024.jpg",
    description: "Annual festival commemorating the life and legacy of Afrobeat pioneer Fela Kuti with performances by top artists.",
    category: "music",
    ticketTiers: [
      { name: "Regular", price: 5000, currency: "NGN", available: true, isVIP: false },
      { name: "VIP", price: 20000, currency: "NGN", available: true, isVIP: true }
    ],
    featured: true,
    isDecemberEvent: false
  },
  {
    id: 3,
    title: "The Experience Lagos",
    startDate: "December 3, 2023",
    time: "7:00 PM",
    location: {
      city: "Lagos",
      venue: "Tafawa Balewa Square",
      state: "Lagos"
    },
    image: "https://blog.fusion.ng/wp-content/uploads/2024/11/the-experience-lagos.jpg",
    description: "Africa's largest gospel music concert featuring international and local gospel artists.",
    category: "music",
    ticketTiers: [
      { name: "Free Entry", price: 0, currency: "NGN", available: true, isVIP: false },
      { name: "VIP", price: 15000, currency: "NGN", available: true, isVIP: true }
    ],
    featured: false,
    isDecemberEvent: true
  },
  {
    id: 4,
    title: "Art X Lagos",
    startDate: "November 4, 2022",
    endDate: "November 6, 2022",
    time: "10:00 AM",
    location: {
      city: "Lagos",
      venue: "Federal Palace Hotel",
      state: "Lagos"
    },
    image: "https://www.bellanaija.com/wp-content/uploads/2022/11/D32D301A-B495-4E7D-90E3-08A16661C648.jpeg",
    description: "West Africa's premier international art fair showcasing contemporary art from Africa and its diaspora.",
    category: "art",
    ticketTiers: [
      { name: "Day Pass", price: 3000, currency: "NGN", available: true, isVIP: false },
      { name: "Weekend Pass", price: 7500, currency: "NGN", available: true, isVIP: false },
      { name: "VIP Preview", price: 25000, currency: "NGN", available: false, isVIP: true }
    ],
    featured: false,
    isDecemberEvent: false
  },
  {
    id: 5,
    title: "Calabar Carnival",
    startDate: "December 26, 2023",
    endDate: "December 31, 2023",
    time: "12:00 PM",
    location: {
      city: "Calabar",
      venue: "Calabar Cultural Centre",
      state: "Cross River"
    },
    image: "https://theafricanhobo.wordpress.com/wp-content/uploads/2021/03/rotated-text-iphone-layout-e1615152868216.png?w=1400",
    description: "Africa's biggest street party with colorful costumes, music, and dance celebrations.",
    category: "festival",
    ticketTiers: [
      { name: "Observer", price: 2000, currency: "NGN", available: true, isVIP: false },
      { name: "Participant", price: 10000, currency: "NGN", available: true, isVIP: false },
      { name: "VIP Access", price: 50000, currency: "NGN", available: true, isVIP: true }
    ],
    featured: true,
    isDecemberEvent: true
  },
  {
    id: 6,
    title: "Argungu Fishing Festival",
    startDate: "March 12, 2024",
    endDate: "March 15, 2024",
    time: "8:00 AM",
    location: {
      city: "Argungu",
      venue: "Argungu River",
      state: "Kebbi"
    },
    image: "https://diplomaticwatch.com/wp-content/uploads/2023/03/images-5.jpeg",
    description: "Historic cultural festival featuring traditional fishing competition, agricultural fair, and cultural displays.",
    category: "culture",
    ticketTiers: [
      { name: "Standard", price: 5000, currency: "NGN", available: true, isVIP: false },
      { name: "Premium", price: 20000, currency: "NGN", available: true, isVIP: true }
    ],
    featured: false,
    isDecemberEvent: false
  }
];

const EventHighlights = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const locations = Array.from(new Set(events.map(event => event.location.state)));
  
  const filteredEvents = events.filter(event => {
    // Filter by tab
    const tabMatch = 
      activeTab === "all" || 
      (activeTab === "december" && event.isDecemberEvent) || 
      (activeTab === "featured" && event.featured) ||
      (activeTab === event.category);
    
    // Filter by search
    const searchMatch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by location
    const locationMatch = 
      selectedLocation === "all" || 
      event.location.state === selectedLocation;
    
    return tabMatch && searchMatch && locationMatch;
  });

  // Set initial selected event
  useEffect(() => {
    if (filteredEvents.length > 0 && !selectedEvent) {
      setSelectedEvent(filteredEvents[0]);
    }
  }, [filteredEvents]);

  const categories = [
    { id: "all", name: "All Events" },
    { id: "december", name: "December Events" },
    { id: "featured", name: "Featured" },
    { id: "music", name: "Music" },
    { id: "art", name: "Art" },
    { id: "culture", name: "Cultural" },
    { id: "festival", name: "Festivals" },
    { id: "food", name: "Food" },
    { id: "conference", name: "Conferences" }
  ];

  return (
    <section id="events" className="section-padding bg-white relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 className="section-title flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Event Marketplace
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/4">
            <div className="bg-naija-lightgreen/30 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Find Events</h3>
                <Filter className="h-4 w-4 text-naija-green" />
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search events..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1.5">Location</label>
                  <Select onValueChange={setSelectedLocation} defaultValue={selectedLocation}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <h3 className="font-semibold mb-4">Event Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      activeTab === category.id 
                        ? 'bg-naija-green text-white' 
                        : 'hover:bg-naija-lightgreen/50 text-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            <div className="md:hidden mb-6 overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm ${
                      activeTab === category.id 
                        ? 'bg-naija-green text-white' 
                        : 'border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {filteredEvents.length > 0 ? (
              <>
                {/* December Events Special Carousel */}
                {activeTab === "all" || activeTab === "december" ? (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Star className="h-5 w-5 text-naija-gold" />
                        December Specials
                      </h3>
                    </div>
                    <Carousel className="w-full">
                      <CarouselContent>
                        {events
                          .filter(event => event.isDecemberEvent)
                          .map(event => (
                            <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                              <Card className="border-naija-gold/30 shadow-sm hover:shadow-md transition-all cursor-pointer"
                                onClick={() => setSelectedEvent(event)}
                              >
                                <div 
                                  className="h-[180px] bg-cover bg-center rounded-t-lg" 
                                  style={{ backgroundImage: `url(${event.image})` }}
                                >
                                  <div className="p-2">
                                    <Badge className="bg-naija-gold text-black hover:bg-naija-gold/90">
                                      December Event
                                    </Badge>
                                  </div>
                                </div>
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-1 text-naija-gold text-sm mb-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{event.startDate}</span>
                                  </div>
                                  <h4 className="font-semibold text-lg mb-1 line-clamp-1">{event.title}</h4>
                                  <div className="flex items-center gap-1 text-gray-600 text-sm">
                                    <MapPin className="h-3 w-3" />
                                    <span>{event.location.venue}, {event.location.city}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            </CarouselItem>
                          ))}
                      </CarouselContent>
                      <CarouselPrevious className="-left-4 border-naija-gold text-naija-gold" />
                      <CarouselNext className="-right-4 border-naija-gold text-naija-gold" />
                    </Carousel>
                  </div>
                ) : null}

                {/* All events grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map(event => (
                    <Card 
                      key={event.id} 
                      className={`border cursor-pointer hover:shadow-md transition-all ${
                        selectedEvent?.id === event.id 
                          ? 'ring-2 ring-naija-green' 
                          : event.featured 
                            ? 'border-naija-gold/30' 
                            : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div 
                        className="h-[160px] bg-cover bg-center rounded-t-lg" 
                        style={{ backgroundImage: `url(${event.image})` }}
                      >
                        {event.featured && (
                          <div className="p-2">
                            <Badge className="bg-naija-green text-white hover:bg-naija-green/90">
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-1 text-naija-green text-sm mb-1">
                          <Calendar className="h-4 w-4" />
                          <span>{event.startDate}{event.endDate ? ` - ${event.endDate}` : ''}</span>
                        </div>
                        <h4 className="font-semibold mb-1">{event.title}</h4>
                        <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location.venue}, {event.location.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Tag className="h-3 w-3 text-naija-gold" />
                          <span className="text-sm text-gray-600">
                            From {event.ticketTiers[0].price === 0 
                              ? 'Free' 
                              : `₦${event.ticketTiers[0].price.toLocaleString()}`}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No events found</h3>
                <p className="text-gray-600 text-center max-w-md">
                  We couldn't find any events matching your criteria. Try adjusting your filters or search terms.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Event details section */}
        {selectedEvent && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <h3 className="text-2xl font-bold mb-2">{selectedEvent.title}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                  <div className="flex items-center gap-1 text-naija-green">
                    <Calendar className="h-4 w-4" />
                    <span>{selectedEvent.startDate}{selectedEvent.endDate ? ` - ${selectedEvent.endDate}` : ''}, {selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-naija-green" />
                    <span>{selectedEvent.location.venue}, {selectedEvent.location.city}, {selectedEvent.location.state}</span>
                  </div>
                </div>
                <div 
                  className="h-[300px] bg-cover bg-center rounded-lg mb-6" 
                  style={{ backgroundImage: `url(${selectedEvent.image})` }}
                ></div>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{selectedEvent.description}</p>
                  <p className="text-gray-700 mt-4">
                    Join thousands of culture enthusiasts at this premier event celebrating Nigerian arts and culture. 
                    Secure your tickets now for an unforgettable experience.
                  </p>
                </div>
              </div>
              <div className="lg:w-1/3 bg-naija-lightgreen/20 p-5 rounded-lg">
                <h4 className="font-semibold text-lg mb-4">Ticket Information</h4>
                <div className="space-y-4">
                  {selectedEvent.ticketTiers.map((tier, index) => (
                    <div 
                      key={index} 
                      className={`bg-white p-4 rounded-md border ${
                        tier.isVIP ? 'border-naija-gold' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{tier.name}</span>
                          {tier.isVIP && (
                            <Badge className="bg-naija-gold text-black">VIP</Badge>
                          )}
                        </div>
                        <span className="font-bold">
                          {tier.price === 0 ? 'FREE' : `₦${tier.price.toLocaleString()}`}
                        </span>
                      </div>
                      <Button 
                        className={`w-full ${
                          tier.available 
                            ? 'bg-naija-green hover:bg-naija-green/90 text-white' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!tier.available}
                      >
                        {tier.available ? 'Buy Ticket' : 'Sold Out'}
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-white p-4 rounded-md border border-gray-200">
                  <h5 className="font-medium mb-2">Payment Methods</h5>
                  <div className="flex gap-3 mb-4">
                    <div className="border border-gray-300 rounded px-3 py-1.5 text-sm">Flutterwave</div>
                    <div className="border border-gray-300 rounded px-3 py-1.5 text-sm">Paystack</div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Secure transactions with immediate ticket delivery via email. QR code will be generated after purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventHighlights;
