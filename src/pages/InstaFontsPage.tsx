import { useState, useMemo } from "react";
import { Copy, Check, Search, Sparkles } from "lucide-react";
import { IconSidebar } from "@/components/IconSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fontStyles, getCategories } from "@/lib/unicodeFonts";
import { toast } from "sonner";

const InstaFontsPage = () => {
  const [inputText, setInputText] = useState("Your text here");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => getCategories(), []);

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
    <div className="min-h-screen bg-background">
      <IconSidebar activeItem="Insta Fonts" />
      
      <main className="ml-16 p-6">
        {/* Header */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Insta Fonts</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Transforme seu texto em estilos únicos para usar no Instagram, Twitter, Facebook e outras redes sociais. 
            Basta digitar, copiar e colar!
          </p>

          {/* Input Section */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <label className="block text-sm font-medium text-foreground mb-2">
              Digite seu texto
            </label>
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite aqui..."
              className="text-lg h-14 mb-4"
            />
            
            {/* Search and Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar estilos..."
                  className="pl-9"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/90 transition-colors"
                  onClick={() => setSelectedCategory(null)}
                >
                  Todos ({fontStyles.length})
                </Badge>
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/90 transition-colors"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Copy All Button */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredStyles.length} estilos disponíveis
            </p>
            <Button variant="outline" onClick={handleCopyAll}>
              <Copy className="w-4 h-4 mr-2" />
              Copiar todos
            </Button>
          </div>

          {/* Font Styles Grid */}
          <div className="grid gap-3">
            {filteredStyles.map((style, index) => {
              const transformedText = style.transform(inputText);
              const isCopied = copiedIndex === index;
              
              return (
                <div
                  key={index}
                  className="group bg-card rounded-lg border border-border p-4 hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">
                          {style.name}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {style.category}
                        </Badge>
                      </div>
                      <p className="text-xl truncate text-foreground/90" title={transformedText}>
                        {transformedText}
                      </p>
                    </div>
                    
                    <Button
                      variant={isCopied ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCopy(transformedText, index)}
                      className="shrink-0"
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

          {/* Footer Info */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>
              💡 Dica: Esses caracteres Unicode especiais funcionam na maioria das plataformas, 
              mas alguns apps podem não exibir corretamente todos os estilos.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstaFontsPage;
