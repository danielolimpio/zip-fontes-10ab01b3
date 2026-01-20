import { useState, useMemo } from "react";
import { IconSidebar } from "@/components/IconSidebar";
import { EmojisConfigPanel } from "@/components/EmojisConfigPanel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Copy, Check } from "lucide-react";
import { emojiCategories, EmojiCategory } from "@/lib/emojiData";
import { useToast } from "@/hooks/use-toast";

const EmojisPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [headerSearchQuery, setHeaderSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [emojiSize, setEmojiSize] = useState(32);
  const [showLabels, setShowLabels] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);
  const { toast } = useToast();

  const combinedSearch = searchQuery || headerSearchQuery;

  const filteredCategories = useMemo(() => {
    let categories = emojiCategories;

    if (selectedCategory) {
      categories = categories.filter(cat => cat.id === selectedCategory);
    }

    if (combinedSearch.trim()) {
      const lowerQuery = combinedSearch.toLowerCase();
      categories = categories.map(cat => ({
        ...cat,
        emojis: cat.emojis.filter(emoji => 
          cat.name.toLowerCase().includes(lowerQuery) || 
          emoji.includes(combinedSearch)
        )
      })).filter(cat => cat.emojis.length > 0);
    }

    return categories;
  }, [selectedCategory, combinedSearch]);

  const handleCopyEmoji = async (emoji: string) => {
    try {
      await navigator.clipboard.writeText(emoji);
      setCopiedEmoji(emoji);
      toast({
        title: "Emoji copiado!",
        description: `${emoji} foi copiado para a área de transferência.`,
      });
      setTimeout(() => setCopiedEmoji(null), 2000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o emoji.",
        variant: "destructive",
      });
    }
  };

  const totalEmojis = filteredCategories.reduce((acc, cat) => acc + cat.emojis.length, 0);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Icon Sidebar */}
      <IconSidebar activeItem="Emojis" />
      
      {/* Config Panel */}
      <div className="ml-16">
        <EmojisConfigPanel
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          emojiSize={emojiSize}
          onEmojiSizeChange={setEmojiSize}
          showLabels={showLabels}
          onShowLabelsChange={setShowLabels}
          compactMode={compactMode}
          onCompactModeChange={setCompactMode}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-[60px] bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <span className="text-xl font-semibold text-foreground tracking-tight">Zip Fontes</span>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search emojis" 
                className="pl-10 bg-muted/50 border-0"
                value={headerSearchQuery}
                onChange={(e) => setHeaderSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {totalEmojis} emojis
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            {filteredCategories.map((category) => (
              <section key={category.id} className="bg-white rounded-xl border border-border overflow-hidden">
                {/* Category Header */}
                <div className="px-6 py-4 bg-muted/30 border-b border-border flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-lg font-semibold text-foreground">{category.name}</h2>
                  <span className="text-sm text-muted-foreground ml-auto">
                    {category.emojis.length} emojis
                  </span>
                </div>

                {/* Emoji Grid */}
                <div 
                  className={`p-4 grid ${
                    compactMode 
                      ? 'grid-cols-[repeat(auto-fill,minmax(40px,1fr))] gap-1' 
                      : 'grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-3'
                  }`}
                >
                  {category.emojis.map((emoji, index) => (
                    <button
                      key={`${category.id}-${index}`}
                      onClick={() => handleCopyEmoji(emoji)}
                      className={`group relative flex flex-col items-center justify-center rounded-lg border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-200 ${
                        compactMode ? 'p-1' : 'p-3'
                      } ${copiedEmoji === emoji ? 'bg-green-50 border-green-200' : ''}`}
                      title="Clique para copiar"
                    >
                      <span 
                        style={{ fontSize: `${emojiSize}px` }}
                        className="leading-none select-none"
                      >
                        {emoji}
                      </span>
                      
                      {showLabels && !compactMode && (
                        <span className="text-[10px] text-muted-foreground mt-1 truncate max-w-full">
                          Emoji
                        </span>
                      )}

                      {/* Copy indicator */}
                      <div className={`absolute inset-0 flex items-center justify-center bg-white/90 rounded-lg transition-opacity ${
                        copiedEmoji === emoji ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        {copiedEmoji === emoji ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            ))}

            {filteredCategories.length === 0 && (
              <div className="text-center py-16">
                <span className="text-6xl mb-4 block">🔍</span>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Nenhum emoji encontrado
                </h3>
                <p className="text-muted-foreground">
                  Tente buscar por outra categoria ou termo.
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-muted/30 border-t border-border py-6">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Ajuda e suporte</a>
              <span className="text-border">|</span>
              <a href="#" className="hover:text-foreground transition-colors">Privacidade e cookies</a>
              <span className="text-border">|</span>
              <a href="#" className="hover:text-foreground transition-colors">Contate-nos</a>
            </div>
            <span>© 2006-2025 Zip Fontes. Todos os direitos reservados.</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default EmojisPage;
