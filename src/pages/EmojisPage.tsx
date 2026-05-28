import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { AppLayout } from "@/components/AppLayout";
import { EmojisConfigPanel } from "@/components/EmojisConfigPanel";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { StatsCards } from "@/components/StatsCards";
import { getStatsData } from "@/lib/statsData";
import { Button } from "@/components/ui/button";
import { Copy, Check, X } from "lucide-react";
import { emojiCategories } from "@/lib/emojiData";
import { emojiToTwemojiUrl } from "@/lib/emojiUtils";
import { getEmojiName } from "@/lib/emojiNames";
import { useToast } from "@/hooks/use-toast";

const EmojisPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [emojiSize, setEmojiSize] = useState(32);
  const [showLabels, setShowLabels] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const { toast } = useToast();

  const stats = useMemo(() => getStatsData(), []);

  const filteredCategories = useMemo(() => {
    let categories = emojiCategories;

    if (selectedCategory) {
      categories = categories.filter(cat => cat.id === selectedCategory);
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      categories = categories.map(cat => ({
        ...cat,
        emojis: cat.emojis.filter(emoji => 
          cat.name.toLowerCase().includes(lowerQuery) || 
          emoji.includes(searchQuery)
        )
      })).filter(cat => cat.emojis.length > 0);
    }

    return categories;
  }, [selectedCategory, searchQuery]);

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
    <>
      <Helmet>
        <title>Emojis - Zip Fontes</title>
        <meta name="description" content="Explore milhares de emojis organizados por categoria. Copie e cole em redes sociais, mensagens e documentos." />
        <link rel="canonical" href="https://zip-fontes.lovable.app/emojis" />
      </Helmet>
      <AppLayout activeItem="Emojis">
      {/* Config Panel - largura padronizada */}
      {showFilters && (
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
      )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen bg-background flex flex-col">
          {/* Header padronizado */}
          <PageHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Buscar emojis..."
            rightContent={
              <span className="text-sm text-muted-foreground">
                {totalEmojis} emojis
              </span>
            }
          />

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <h1 className="sr-only">Zip Fontes — Catálogo de Emojis</h1>

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

            <div className="max-w-6xl mx-auto space-y-8">
              {filteredCategories.map((category) => (
                <section key={category.id} className="bg-background rounded-xl border border-border overflow-hidden">
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
                  {category.emojis.map((emoji, index) => {
                      const emojiName = getEmojiName(emoji);
                      
                      return (
                        <button
                          key={`${category.id}-${index}`}
                          onClick={() => handleCopyEmoji(emoji)}
                          className={`group relative flex flex-col items-center justify-center rounded-lg border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-200 ${
                            compactMode ? 'p-1 pb-2' : 'p-3 pb-5'
                          } ${copiedEmoji === emoji ? 'bg-green-50 border-green-200' : ''}`}
                          title={emojiName}
                        >
                          <img 
                            src={emojiToTwemojiUrl(emoji)}
                            alt={emojiName}
                            style={{ width: `${emojiSize}px`, height: `${emojiSize}px` }}
                            className="select-none"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.parentElement?.insertAdjacentHTML('afterbegin', 
                                `<span style="font-size: ${emojiSize}px" class="leading-none select-none">${emoji}</span>`
                              );
                            }}
                          />
                        
                        {/* Name badge - appears on hover */}
                        {!compactMode && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-muted-foreground bg-muted/80 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap max-w-[90%] truncate pointer-events-none">
                            {emojiName}
                          </span>
                        )}

                        {showLabels && !compactMode && (
                          <span className="text-[10px] text-muted-foreground mt-1 truncate max-w-full">
                            {emojiName}
                          </span>
                        )}

                        {/* Copy indicator */}
                        <div className={`absolute inset-0 flex items-center justify-center bg-background/90 rounded-lg transition-opacity ${
                          copiedEmoji === emoji ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}>
                          {copiedEmoji === emoji ? (
                            <Check className="w-5 h-5 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        </button>
                      );
                    })}
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
          </div>

          {/* Footer padronizado */}
          <PageFooter />
        </main>
    </AppLayout>
    </>
  );
};

export default EmojisPage;
