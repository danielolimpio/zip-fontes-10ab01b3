import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { IconSidebar } from "@/components/IconSidebar";
import { FilterPanel } from "@/components/FilterPanel";
import { FontCard } from "@/components/FontCard";
import { FontPagination } from "@/components/FontPagination";
import { Button } from "@/components/ui/button";
import { Grid, List, Info, X, Loader2 } from "lucide-react";
import zipFontesLogo from "@/assets/zip-fontes-logo.png";
import { useGoogleFonts } from "@/hooks/useGoogleFonts";

const Index = () => {
  const [previewText, setPreviewText] = useState("TRADER");
  const [fontSize, setFontSize] = useState(40);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState<'popularity' | 'alpha' | 'date' | 'trending'>('popularity');
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());

  // Fetch fonts from Google Fonts API
  const { data, isLoading, error } = useGoogleFonts({
    page: currentPage,
    limit: itemsPerPage,
    sort: sortBy,
    category: selectedCategory,
    search: searchQuery,
  });

  const fonts = data?.fonts || [];
  const totalPages = data?.pagination.totalPages || 1;
  const totalFonts = data?.pagination.totalFonts || 0;

  // Load Google Fonts dynamically
  useEffect(() => {
    fonts.forEach((font) => {
      if (!loadedFonts.has(font.name)) {
        const link = document.createElement('link');
        link.href = font.googleFontUrl;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        setLoadedFonts(prev => new Set(prev).add(font.name));
      }
    });
  }, [fonts, loadedFonts]);

  return (
    <div className="min-h-screen bg-background">
      {/* Icon Sidebar (narrow left) */}
      <IconSidebar />
      
      {/* Main Layout */}
      <div className="ml-20 flex min-h-screen">
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
        <main className="flex-1 min-h-screen bg-background">
          {/* Header dentro do conteúdo */}
          <div className="sticky top-0 z-40 bg-background border-b border-border">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                {/* Logo */}
                <a href="/" className="flex items-center">
                  <img src={zipFontesLogo} alt="Zip Fontes" className="h-8" />
                </a>
                
                {/* Search */}
                <div className="relative ml-6">
                  <input
                    type="text"
                    placeholder="Search fonts"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
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
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="text-sm font-medium bg-transparent border-0 focus:outline-none cursor-pointer"
                >
                  <option value="popularity">Popularity</option>
                  <option value="trending">Trending</option>
                  <option value="alpha">Name</option>
                  <option value="date">Newest</option>
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
                {isLoading ? "Loading..." : `${fonts.length} of ${totalFonts} families`}
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
            
            {/* Loading state */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading fonts from Google...</span>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="flex items-center justify-center py-20 text-destructive">
                <span>Error loading fonts. Please try again.</span>
              </div>
            )}
            
            {/* Fonts List */}
            {!isLoading && !error && (
              <div className="space-y-0">
                {fonts.map((font) => (
                  <div key={font.id} className="border-b border-border py-6">
                    {/* Font info */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-primary hover:underline cursor-pointer">
                        {font.name}
                      </span>
                      <span className="text-sm text-muted-foreground capitalize">{font.category}</span>
                      <span className="text-muted-foreground">|</span>
                      <span className="text-sm text-muted-foreground">{font.variantsCount} styles</span>
                    </div>
                    
                    {/* Font preview */}
                    <div 
                      className="text-foreground"
                      style={{ 
                        fontFamily: `"${font.name}", sans-serif`,
                        fontSize: `${fontSize}px`,
                        lineHeight: 1.2
                      }}
                    >
                      {previewText || font.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
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
          <footer className="bg-muted/30 py-8 mt-auto">
            <div className="px-6 text-center">
              {/* Logo centralizada */}
              <div className="flex justify-center mb-6">
                <a href="/">
                  <img src={zipFontesLogo} alt="Zip Fontes" className="h-10" />
                </a>
              </div>
              
              {/* Políticas legais */}
              <div className="flex items-center justify-center gap-4 mb-3">
                <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Ajuda e suporte</a>
                <span className="text-muted-foreground">|</span>
                <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacidade e cookies</a>
                <span className="text-muted-foreground">|</span>
                <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Contate-nos</a>
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
