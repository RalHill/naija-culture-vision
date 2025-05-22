
import { Link } from "react-router-dom";
import { Newspaper, MapPin, Calendar, DollarSign, HandCoins } from "lucide-react";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40 md:hidden">
      <div className="flex justify-between px-2 py-2">
        <Link to="/#news" className="flex flex-col items-center justify-center w-1/5 py-1">
          <Newspaper className="h-5 w-5 text-gray-600" />
          <span className="text-xs mt-1 text-gray-600">News</span>
        </Link>
        <Link to="/directory" className="flex flex-col items-center justify-center w-1/5 py-1">
          <MapPin className="h-5 w-5 text-gray-600" />
          <span className="text-xs mt-1 text-gray-600">Directory</span>
        </Link>
        <Link to="/#events" className="flex flex-col items-center justify-center w-1/5 py-1">
          <Calendar className="h-5 w-5 text-gray-600" />
          <span className="text-xs mt-1 text-gray-600">Events</span>
        </Link>
        <Link to="/#investment" className="flex flex-col items-center justify-center w-1/5 py-1">
          <DollarSign className="h-5 w-5 text-gray-600" />
          <span className="text-xs mt-1 text-gray-600">Investment</span>
        </Link>
        <Link to="/financial" className="flex flex-col items-center justify-center w-1/5 py-1">
          <HandCoins className="h-5 w-5 text-gray-600" />
          <span className="text-xs mt-1 text-gray-600">Financial</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
