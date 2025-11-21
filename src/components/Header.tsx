import { Search, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background shadow-header z-50 h-[60px]">
      <div className="h-full px-6 flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-[20px] font-bold text-foreground">
            Zip Fontes
          </h1>
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-[400px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Pesquisar uma fonte..."
              className="pl-10 rounded-lg border-gray-200 focus:border-primary"
            />
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex items-center gap-4">
          <Button 
            className="bg-success hover:bg-success/90 text-success-foreground rounded-lg px-4 py-2 font-medium hover-scale"
          >
            Enviar uma fonte
          </Button>
          
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
