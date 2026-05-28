import { Search } from "lucide-react";
import zipFontesLogo from "@/assets/zip-fontes-logo.png";

interface PageHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  rightContent?: React.ReactNode;
}

export const PageHeader = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  rightContent,
}: PageHeaderProps) => {
  return (
    <header className="h-[60px] bg-background border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={zipFontesLogo} alt="Zip Fontes" className="h-8" />
        </a>
        
        {/* Search */}
        <div className="relative ml-6">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label={searchPlaceholder}
            className="w-[300px] px-4 py-2 pl-10 bg-muted rounded-full text-sm border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
      
      {/* Right side */}
      {rightContent && (
        <div className="flex items-center gap-4">
          {rightContent}
        </div>
      )}
    </header>
  );
};
