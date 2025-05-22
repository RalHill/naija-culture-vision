
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  placeholder?: string;
}

export const SearchBar = ({ placeholder = "Search..." }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input 
          placeholder={placeholder} 
          className="pl-10 pr-4 py-3 h-12 rounded-full border border-gray-300 shadow-sm focus:border-naija-green focus:ring-1 focus:ring-naija-green"
        />
      </div>
    </div>
  );
};
