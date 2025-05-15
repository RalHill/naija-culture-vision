
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Newspaper } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Calabar Carnival Returns",
    excerpt: "After a brief hiatus, the spectacular Calabar Carnival is set to make a grand return this December...",
    date: "October 15, 2023",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=600"
  },
  {
    id: 2,
    title: "FG Launches National Art Directory",
    excerpt: "The Federal Government has launched a comprehensive national art directory to catalog and promote Nigeria's diverse artistic talents...",
    date: "September 28, 2023",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=600"
  },
  {
    id: 3,
    title: "Diaspora Investment Drive in Tourism",
    excerpt: "A new initiative aims to attract diaspora investments in Nigeria's growing tourism sector with incentives and partnerships...",
    date: "October 5, 2023",
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?q=80&w=600"
  },
  {
    id: 4,
    title: "National Theatre Renovation Complete",
    excerpt: "The iconic National Theatre in Lagos has completed its renovation, preparing to host world-class cultural events...",
    date: "October 10, 2023",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=600"
  }
];

const NewsSection = () => {
  return (
    <section id="news" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
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
        
        <div className="flex overflow-x-auto gap-6 pb-6 -mx-4 px-4 snap-x scrollbar-none">
          {newsItems.map((item) => (
            <Card key={item.id} className="min-w-[300px] max-w-[300px] border border-gray-200 shadow-sm snap-center hover:shadow-md transition-shadow">
              <div 
                className="h-[160px] bg-cover bg-center rounded-t-md" 
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <CardContent className="p-5">
                <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.excerpt}</p>
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
      </div>
    </section>
  );
};

export default NewsSection;
