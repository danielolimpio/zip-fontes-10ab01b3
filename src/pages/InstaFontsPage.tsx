import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Copy, Check, Sparkles, Info, Heart, X } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { InstaFontsConfigPanel } from "@/components/InstaFontsConfigPanel";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { StatsCards } from "@/components/StatsCards";
import { getStatsData } from "@/lib/statsData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fontStyles } from "@/lib/unicodeFonts";
import { toast } from "sonner";

const InstaFontsPage = () => {
  const [inputText, setInputText] = useState("Your text here");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);

  const stats = useMemo(() => getStatsData(), []);

  const filteredStyles = useMemo(() => {
    let styles = fontStyles;
    
    if (selectedCategory) {
      styles = styles.filter(style => style.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      styles = styles.filter(style => 
        style.name.toLowerCase().includes(query) ||
        style.category.toLowerCase().includes(query)
      );
    }
    
    return styles;
  }, [selectedCategory, searchQuery]);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success("Copiado para a área de transferência!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error("Erro ao copiar texto");
    }
  };

  const handleCopyAll = async () => {
    const allTexts = filteredStyles
      .map(style => `${style.name}: ${style.transform(inputText)}`)
      .join('\n');
    
    try {
      await navigator.clipboard.writeText(allTexts);
      toast.success("Todos os estilos copiados!");
    } catch (err) {
      toast.error("Erro ao copiar textos");
    }
  };

  return (
    <>
      <Helmet>
        <title>Insta Fonts - Zip Fontes</title>
        <meta name="description" content="Transforme seu texto em estilos decorativos para Instagram, Twitter e TikTok. Cursivo, negrito, duplo e muito mais." />
        <link rel="canonical" href="https://zip-fontes.lovable.app/insta-fonts" />
      </Helmet>
      <AppLayout activeItem="Insta">
      {/* Config Panel - largura padronizada */}
      {showFilters && (
        <InstaFontsConfigPanel
          inputText={inputText}
          onInputTextChange={setInputText}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />
      )}
        
        {/* Main Content Area */}
        <main className="flex-1 min-h-screen bg-background flex flex-col">
          {/* Header padronizado */}
          <PageHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Buscar estilos..."
            rightContent={
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Insta Fonts</span>
              </div>
            }
          />
          
          {/* Content */}
          <div className="px-6 py-6 flex-1">
            <h1 className="sr-only">Zip Fontes — Insta Fonts</h1>

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

            {/* Results info and actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {filteredStyles.length} estilos disponíveis
                </span>
                {selectedCategory && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedCategory}
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      aria-label="Remover filtro de categoria"
                      className="ml-1 hover:text-foreground"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  Sobre os resultados
                  <Info className="w-4 h-4" />
                </button>
                
                <Button variant="outline" size="sm" onClick={handleCopyAll}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar todos
                </Button>
              </div>
            </div>
            
            {/* Font Styles List */}
            <div className="space-y-0">
              {filteredStyles.map((style, index) => {
                const transformedText = style.transform(inputText);
                const isCopied = copiedIndex === index;
                
                return (
                  <div 
                    key={index} 
                    className="border-b border-border py-4 hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        {/* Style info */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-primary hover:underline cursor-pointer">
                            {style.name}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {style.category}
                          </Badge>
                        </div>
                        
                        {/* Transformed text preview */}
                        <p 
                          className="text-xl text-foreground/90 truncate" 
                          title={transformedText}
                        >
                          {transformedText}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Favoritar estilo"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          variant={isCopied ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleCopy(transformedText, index)}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-4 h-4 mr-1" />
                              Copiado
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-1" />
                              Copiar
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredStyles.length === 0 && (
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Nenhum estilo encontrado
                </h3>
                <p className="text-muted-foreground">
                  Tente buscar por outro termo ou remova os filtros
                </p>
              </div>
            )}
          </div>
          
          {/* Footer padronizado */}
          <PageFooter />
        </main>
    </AppLayout>
    </>
  );
};

export default InstaFontsPage;
