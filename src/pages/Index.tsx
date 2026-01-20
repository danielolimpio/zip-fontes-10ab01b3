import { useState } from "react";
import { Header } from "@/components/Header";
import { IconSidebar } from "@/components/IconSidebar";
import { FilterPanel } from "@/components/FilterPanel";
import { FontCard } from "@/components/FontCard";
import { FontPagination } from "@/components/FontPagination";
import { Button } from "@/components/ui/button";
import { Grid, List, Info, X } from "lucide-react";

// Mock data - fontes livres de direitos autorais
const mockFonts = [
  { id: 1, name: "Google Sans Flex", category: "Variable (6 axes)", author: "Google", fontFamily: "system-ui" },
  { id: 2, name: "Roboto", category: "Variable (3 axes)", author: "Christian Robertson, Paratype, Font Bureau", fontFamily: "sans-serif" },
  { id: 3, name: "Rubik Storm", category: "1 style", author: "NaN, Luke Prowse", fontFamily: "fantasy" },
  { id: 4, name: "Noto Sans Syriac", category: "Variable (1 axis)", author: "Google", fontFamily: "sans-serif" },
  { id: 5, name: "Open Sans", category: "Variable (3 axes)", author: "Steve Matteson", fontFamily: "sans-serif" },
  { id: 6, name: "Lato", category: "10 styles", author: "Łukasz Dziedzic", fontFamily: "sans-serif" },
  { id: 7, name: "Montserrat", category: "Variable (2 axes)", author: "Julieta Ulanovsky", fontFamily: "sans-serif" },
  { id: 8, name: "Oswald", category: "Variable (1 axis)", author: "Vernon Adams", fontFamily: "sans-serif" },
  { id: 9, name: "Raleway", category: "Variable (2 axes)", author: "Matt McInerney", fontFamily: "sans-serif" },
  { id: 10, name: "Poppins", category: "18 styles", author: "Indian Type Foundry", fontFamily: "sans-serif" },
];

const Index = () => {
  const [previewText, setPreviewText] = useState("TRADER");
  const [fontSize, setFontSize] = useState(40);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(true);

  // Pagination
  const totalPages = Math.ceil(mockFonts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFonts = mockFonts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-background">
      {/* Icon Sidebar (narrow left) */}
      <IconSidebar />
      
      {/* Main Layout */}
      <div className="ml-16 flex min-h-screen">
        {/* Filter Panel */}
        {showFilters && (
          <FilterPanel
            previewText={previewText}
            onPreviewTextChange={setPreviewText}
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
          />
        )}
        
        {/* Main Content Area - full width */}
        <main className="flex-1 min-h-screen bg-white">
          {/* Header dentro do conteúdo */}
          <div className="sticky top-0 z-40 bg-white border-b border-border">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">⋮⋮</span>
                  <span className="text-xl font-bold text-foreground">Zip Fontes</span>
                </div>
                
                {/* Search */}
                <div className="relative ml-6">
                  <input
                    type="text"
                    placeholder="Search fonts"
                    className="w-[300px] px-4 py-2 pl-10 bg-muted rounded-full text-sm border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Right side */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Sort by</span>
                <select className="text-sm font-medium bg-transparent border-0 focus:outline-none cursor-pointer">
                  <option>Relevance</option>
                  <option>Popularity</option>
                  <option>Newest</option>
                  <option>Name</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="px-6 py-6">
            {/* Filters Button */}
            <div className="mb-6">
              <Button 
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                {showFilters ? <X className="w-4 h-4" /> : null}
                Filters
              </Button>
            </div>
            
            {/* Results info and view toggle */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-muted-foreground">
                {mockFonts.length} of {mockFonts.length} families
              </span>
              
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  About these results
                  <Info className="w-4 h-4" />
                </button>
                
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-muted' : 'hover:bg-muted/50'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-muted' : 'hover:bg-muted/50'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Fonts List */}
            <div className="space-y-0">
              {paginatedFonts.map((font) => (
                <div key={font.id} className="border-b border-border py-6">
                  {/* Font info */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-primary hover:underline cursor-pointer">
                      {font.name}
                    </span>
                    <span className="text-sm text-muted-foreground">{font.category}</span>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-sm text-muted-foreground">{font.author}</span>
                  </div>
                  
                  {/* Font preview */}
                  <div 
                    className="text-foreground"
                    style={{ 
                      fontFamily: font.fontFamily,
                      fontSize: `${fontSize}px`,
                      lineHeight: 1.2
                    }}
                  >
                    {previewText || font.name}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-8">
              <FontPagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(items) => {
                  setItemsPerPage(items);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          
          {/* Footer */}
          <footer className="bg-muted/30 py-6 mt-auto">
            <div className="px-6 text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <a href="#" className="text-xs text-muted-foreground hover:text-primary">Ajuda e suporte</a>
                <span className="text-muted-foreground">|</span>
                <a href="#" className="text-xs text-muted-foreground hover:text-primary">Privacidade e cookies</a>
                <span className="text-muted-foreground">|</span>
                <a href="#" className="text-xs text-muted-foreground hover:text-primary">Contate-nos</a>
              </div>
              <p className="text-xs text-muted-foreground">
                © 2006-2025 Zip Fontes. Todos os direitos reservados.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
