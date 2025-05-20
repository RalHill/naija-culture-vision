
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Newspaper, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: "culture" | "tourism" | "heritage" | "economy" | "diaspora" | "investment";
  isHighlighted: boolean;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Calabar Carnival Returns",
    excerpt: "After a brief hiatus, the spectacular Calabar Carnival is set to make a grand return this December with enhanced cultural displays and international participants...",
    date: "October 15, 2023",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=600",
    category: "culture",
    isHighlighted: true
  },
  {
    id: 2,
    title: "Lagos generated $71.6m from December tourism festivities",
    excerpt: "The Lagos State Government has announced that it generated over $71.6 million in revenue from tourism, hospitality, and entertainment during the 2024 ‘Detty December’ celebrations...",
    date: "September 28, 2023",
    image: "https://cdn.punchng.com/wp-content/uploads/2024/09/27093430/Idris-Aregbe.jpg",
    category: "culture",
    isHighlighted: false
  },
  {
    id: 3,
    title: "Nigeria seeks to grow December reveler jamboree boosting tourism",
    excerpt: "Nigeria is seeking to capitalize off an end-of-year extravaganza that’s become the most profitable month for its commercial capital’s tourism sector in a bid to grow the economy...",
    date: "October 5, 2024",
    image: "https://images.unsplash.com/photo-1649502913092-fb7f0e8fc632?q=80&w=2159&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "diaspora",
    isHighlighted: true
  },
  {
    id: 4,
    title: "Engaging youths through creative art, way to go – Aregbe",
    excerpt: "Mr Idris Aregbe, Special Adviser to the governor on Tourism Arts and Culture, disclosed this at a news conference to launch the initiative at the Lekki Creative Arts and Crafts Market, on Friday....",
    date: "November 10, 2024",
    image: "https://cdn.vanguardngr.com/wp-content/uploads/2024/03/Babajide-Sanwo-olu.webp",
    category: "heritage",
    isHighlighted: false
  },
  {
    id: 5,
    title: "Nigeria Hosts International Tourism Summit",
    excerpt: "Lagos is set to host the International Tourism Summit bringing together stakeholders from across Africa to discuss sustainable tourism development...",
    date: "October 20, 2023",
    image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=600",
    category: "tourism",
    isHighlighted: true
  },
  {
    id: 6,
    title: "New Tax Incentives for Cultural Investments",
    excerpt: "Federal Government announces new tax incentives for investors in Nigeria's cultural and creative sectors to boost economic growth...",
    date: "October 18, 2023",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600",
    category: "economy",
    isHighlighted: false
  }
];

const NewsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = newsItems.filter(item => {
    // Filter by category
    const categoryMatch = activeFilter === "all" || item.category === activeFilter;
    
    // Filter by search query
    const searchMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const categories = [
    { id: "all", name: "All" },
    { id: "culture", name: "Culture" },
    { id: "tourism", name: "Tourism" },
    { id: "heritage", name: "Heritage" },
    { id: "economy", name: "Economy" },
    { id: "diaspora", name: "Diaspora" },
    { id: "investment", name: "Investment" }
  ];

  return (
    <section id="news" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 className="section-title flex items-center gap-2">
            <Newspaper className="h-6 w-6" />
            News & Insights
          </h2>
          <Button 
            variant="ghost" 
            className="text-naija-green hover:text-naija-green/90 hover:bg-naija-lightgreen flex items-center gap-1"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search news articles..." 
                className="pl-10"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-naija-green h-5 w-5" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            <div className="flex overflow-x-auto gap-2 pb-2 -mx-1 px-1 scrollbar-none">
              {categories.map(category => (
                <Button 
                  key={category.id}
                  variant={activeFilter === category.id ? "default" : "outline"}
                  className={`rounded-full text-xs py-1 h-auto ${
                    activeFilter === category.id 
                      ? "bg-naija-green text-white" 
                      : "border-naija-green/50 text-naija-green"
                  }`}
                  onClick={() => setActiveFilter(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredNews.map((item) => (
            <Card 
              key={item.id} 
              className={`border shadow-sm hover:shadow-md transition-shadow ${
                item.isHighlighted ? 'border-naija-gold' : 'border-gray-200'
              }`}
            >
              <div 
                className="h-[200px] bg-cover bg-center rounded-t-md" 
                style={{ backgroundImage: `url(${item.image})` }}
              >
                {item.isHighlighted && (
                  <span className="inline-block bg-naija-gold text-black text-xs font-bold px-3 py-1 rounded-br-md">
                    Featured
                  </span>
                )}
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">{item.date}</span>
                  <span className="text-xs px-2 py-1 bg-naija-lightgreen text-naija-green rounded-full">
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{item.excerpt}</p>
              </CardContent>
              <CardFooter className="px-5 pb-5 pt-0">
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-naija-green hover:text-naija-green/80 flex items-center gap-1"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button className="bg-naija-green hover:bg-naija-green/90 text-white">
            Load More Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
