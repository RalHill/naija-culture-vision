
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-naija-green flex items-center justify-center">
              <span className="text-white font-bold text-xs">LW</span>
            </div>
            <h1 className="text-xl font-bold text-naija-green">LagosWave360</h1>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-naija-green font-medium text-sm">Home</Link>
          <a href="#news" className="text-gray-600 hover:text-naija-green font-medium text-sm">News</a>
          <Link to="/directory" className="text-gray-600 hover:text-naija-green font-medium text-sm">Directory</Link>
          <a href="#events" className="text-gray-600 hover:text-naija-green font-medium text-sm">Events</a>
          <a href="#investment" className="text-gray-600 hover:text-naija-green font-medium text-sm">Investment</a>
          <Link to="/financial" className="text-gray-600 hover:text-naija-green font-medium text-sm">Financial Services</Link>
          <Button variant="outline" className="text-naija-green border-naija-green hover:bg-naija-green hover:text-white">
            Sign In
          </Button>
        </nav>
        
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-20 px-4 animate-slide-in">
          <nav className="flex flex-col space-y-6 py-8">
            <Link to="/" className="text-gray-600 hover:text-naija-green font-medium text-lg" onClick={toggleMenu}>Home</Link>
            <a href="#news" className="text-gray-600 hover:text-naija-green font-medium text-lg" onClick={toggleMenu}>News</a>
            <Link to="/directory" className="text-gray-600 hover:text-naija-green font-medium text-lg" onClick={toggleMenu}>Directory</Link>
            <a href="#events" className="text-gray-600 hover:text-naija-green font-medium text-lg" onClick={toggleMenu}>Events</a>
            <a href="#investment" className="text-gray-600 hover:text-naija-green font-medium text-lg" onClick={toggleMenu}>Investment</a>
            <Link to="/financial" className="text-gray-600 hover:text-naija-green font-medium text-lg" onClick={toggleMenu}>Financial Services</Link>
            <Button className="w-full bg-naija-green hover:bg-naija-green/90 text-white">
              Sign In
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
