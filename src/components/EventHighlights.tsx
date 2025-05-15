
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Afro Nation Nigeria",
    date: "December 15-17, 2023",
    location: "Lagos",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=600"
  },
  {
    id: 2,
    title: "Felabration",
    date: "October 10-16, 2023",
    location: "New Afrika Shrine, Lagos",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=600"
  },
  {
    id: 3,
    title: "The Experience Lagos",
    date: "December 3, 2023",
    location: "Tafawa Balewa Square, Lagos",
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?q=80&w=600"
  },
  {
    id: 4,
    title: "Art X Lagos",
    date: "November 3-5, 2023",
    location: "Federal Palace Hotel, Lagos",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=600"
  }
];

const EventHighlights = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (sliderRef.current) {
      const newSlide = (currentSlide + 1) % events.length;
      setCurrentSlide(newSlide);
      sliderRef.current.scrollTo({
        left: newSlide * sliderRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      const newSlide = (currentSlide - 1 + events.length) % events.length;
      setCurrentSlide(newSlide);
      sliderRef.current.scrollTo({
        left: newSlide * sliderRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="events" className="section-padding bg-white relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Event Highlights
          </h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="border-naija-green text-naija-green hover:bg-naija-lightgreen" 
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="border-naija-green text-naija-green hover:bg-naija-lightgreen" 
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div 
          ref={sliderRef}
          className="flex overflow-x-hidden snap-x w-full"
        >
          {events.map((event) => (
            <Card key={event.id} className="min-w-full w-full flex-shrink-0 snap-center border-none shadow-none">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div 
                  className="h-60 w-full md:h-80 md:w-1/2 bg-cover bg-center rounded-md" 
                  style={{ backgroundImage: `url(${event.image})` }}
                ></div>
                <CardContent className="p-0 md:w-1/2 flex flex-col items-start">
                  <div className="flex items-center gap-2 text-naija-gold mb-2">
                    <Calendar className="h-5 w-5" />
                    <span className="font-semibold">{event.date}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{event.title}</h3>
                  <p className="text-gray-600 mb-2">Location: {event.location}</p>
                  <p className="text-gray-600 mb-6">
                    Join thousands of culture enthusiasts at this premier event celebrating Nigerian arts and culture.
                  </p>
                  <Button className="bg-naija-gold hover:bg-naija-gold/90 text-black">
                    Buy Ticket
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center gap-2 mt-6">
          {events.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full ${
                index === currentSlide ? 'w-8 bg-naija-gold' : 'w-2 bg-gray-300'
              }`}
              onClick={() => {
                setCurrentSlide(index);
                sliderRef.current?.scrollTo({
                  left: index * sliderRef.current.clientWidth,
                  behavior: 'smooth'
                });
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventHighlights;
