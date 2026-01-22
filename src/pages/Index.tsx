import { useState, useEffect, useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { FilterPanel } from "@/components/FilterPanel";
import { FontPagination } from "@/components/FontPagination";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { StatsCards } from "@/components/StatsCards";
import { getStatsData } from "@/lib/statsData";
import { Button } from "@/components/ui/button";
import { Grid, List, Info, X, Loader2 } from "lucide-react";
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

  const stats = useMemo(() => getStatsData(), []);

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

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <AppLayout activeItem="Fonts">
      {/* Filter Panel - largura padronizada */}
      {showFilters && (
        <FilterPanel
          previewText={previewText}
          onPreviewTextChange={setPreviewText}
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
        />
      )}
      
        {/* Main Content Area - full width */}
        <main className="flex-1 min-h-screen bg-background flex flex-col">
          {/* Header padronizado */}
          <PageHeader
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            searchPlaceholder="Buscar fontes..."
            rightContent={
              <>
                <span className="text-sm text-muted-foreground">Ordenar por</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="text-sm font-medium bg-transparent border-0 focus:outline-none cursor-pointer"
                >
                  <option value="popularity">Popularidade</option>
                  <option value="trending">Tendências</option>
                  <option value="alpha">Nome</option>
                  <option value="date">Mais recentes</option>
                </select>
              </>
            }
          />
          
          {/* Content */}
          <div className="px-6 py-6 flex-1">
            {/* Filters Button */}
            <div className="mb-6">
              <Button 
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                {showFilters ? <X className="w-4 h-4" /> : null}
                Filtros
              </Button>
            </div>

            {/* Stats Cards */}
            <StatsCards stats={stats} />
            
            {/* Results info and view toggle */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-muted-foreground">
                {isLoading ? "Carregando..." : `${fonts.length} de ${totalFonts} famílias`}
              </span>
              
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  Sobre os resultados
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
                <span className="ml-3 text-muted-foreground">Carregando fontes do Google...</span>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="flex items-center justify-center py-20 text-destructive">
                <span>Erro ao carregar fontes. Tente novamente.</span>
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
                      <span className="text-sm text-muted-foreground">{font.variantsCount} estilos</span>
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
          
          {/* Footer padronizado */}
          <PageFooter />
        </main>
    </AppLayout>
  );
};

export default Index;
