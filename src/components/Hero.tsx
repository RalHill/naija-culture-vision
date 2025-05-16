
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Building, Flag } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-24 pb-12 px-4 md:pt-32 md:pb-16 md:px-8 lg:px-12 bg-gradient-to-b from-naija-lightgreen to-white relative">
      {/* Hero background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15 z-0"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1577495581456-93f33e6a0a77?q=80&w=1000')", 
          backgroundBlendMode: "overlay" 
        }}
      ></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-naija-green flex items-center justify-center">
              <span className="text-white font-bold">NC</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-naija-green">NaijaCulture<span className="text-naija-gold">360</span></h1>
          </div>
          
          <p className="text-xl md:text-2xl font-medium text-gray-700 mb-8 max-w-xl mx-auto">
            Explore, Attend, and Invest in Nigeria
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <Button 
              className="bg-naija-green hover:bg-naija-green/90 text-white flex items-center gap-2 px-6"
              size="lg"
            >
              <Building className="h-5 w-5" />
              Explore Attractions
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button 
              className="bg-naija-gold hover:bg-naija-gold/90 text-black flex items-center gap-2 px-6"
              size="lg"
            >
              <Calendar className="h-5 w-5" />
              Discover Events
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button 
              className="bg-white hover:bg-gray-100 text-naija-green border border-naija-green flex items-center gap-2 px-6"
              size="lg"
            >
              <Flag className="h-5 w-5" />
              View Opportunities
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-3">
            <div className="h-3 w-3 rounded-full bg-naija-green"></div>
            <div className="h-3 w-20 rounded-full bg-naija-gold"></div>
            <div className="h-3 w-3 rounded-full bg-naija-green"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
