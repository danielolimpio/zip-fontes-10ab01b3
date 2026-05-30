import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { AppLayout } from "@/components/AppLayout";
import { FilterPanel } from "@/components/FilterPanel";
import { FontPagination } from "@/components/FontPagination";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { StatsCards } from "@/components/StatsCards";
import { getStatsData } from "@/lib/statsData";
import { Button } from "@/components/ui/button";
import { Grid, List, Info, X, Loader2, Download } from "lucide-react";
import { useStorageFonts } from "@/hooks/useStorageFonts";

// Sanitize a font file name into a valid CSS family identifier
const toFamilyId = (fileName: string) =>
  `zf_${fileName.replace(/\.(ttf|otf)$/i, "").replace(/[^a-zA-Z0-9_-]/g, "_")}`;

const Index = () => {
  const [previewText, setPreviewText] = useState("TRADER");
  const [fontSize, setFontSize] = useState(40);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const stats = useMemo(() => getStatsData(), []);

  const { data, isLoading, error } = useStorageFonts({
    page: currentPage,
    limit: itemsPerPage,
    search: searchQuery,
  });

  const fonts = data?.fonts || [];
  const totalPages = data?.pagination.totalPages || 1;
  const totalFonts = data?.pagination.totalFonts || 0;
  const catalogUnavailable = Boolean(error || data?.unavailable);

  // Inject @font-face for each visible font
  useEffect(() => {
    if (!fonts.length) return;
    const styleId = "zipfontes-dynamic-faces";
    let style = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      document.head.appendChild(style);
    }
    const css = fonts
      .map((f) => {
        const ext = f.fileName.toLowerCase().endsWith(".otf") ? "opentype" : "truetype";
        return `@font-face{font-family:"${toFamilyId(f.fileName)}";src:url("${f.url}") format("${ext}");font-display:swap;}`;
      })
      .join("\n");
    style.textContent = css;
  }, [fonts]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleDownload = async (url: string, fileName: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      window.open(url, "_blank");
    }
  };

  const formatSize = (b: number) => {
    if (!b) return "";
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
    return `${(b / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <>
      <Helmet>
        <title>Zip Fontes - Fontes Gratuitas para Download</title>
        <meta name="description" content="Explore e baixe milhares de fontes gratuitas 100% livres de direitos autorais. Catálogo completo com preview em tempo real." />
        <link rel="canonical" href="https://zip-fontes.lovable.app/" />
        <meta property="og:title" content="Zip Fontes - Fontes Gratuitas para Download" />
        <meta property="og:description" content="Explore e baixe milhares de fontes gratuitas 100% livres de direitos autorais. Catálogo completo com preview em tempo real." />
        <meta property="og:url" content="https://zip-fontes.lovable.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://zip-fontes.lovable.app/favicon.png" />
      </Helmet>
      <AppLayout activeItem="Fonts">
      {showFilters && (
        <FilterPanel
          previewText={previewText}
          onPreviewTextChange={setPreviewText}
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
        />
      )}

      <main className="flex-1 min-h-screen bg-background flex flex-col">
        <PageHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Buscar fontes..."
        />

        <div className="px-6 py-6 flex-1">
          <h1 className="sr-only">Zip Fontes — Catálogo de Fontes Gratuitas</h1>

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

          <StatsCards stats={stats} />

          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-muted-foreground">
              {isLoading ? "Carregando..." : `${fonts.length} de ${totalFonts} fontes`}
            </span>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                Sobre os resultados
                <Info className="w-4 h-4" />
              </button>

              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  aria-label="Visualização em grade"
                  className={`p-2 ${viewMode === "grid" ? "bg-muted" : "hover:bg-muted/50"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  aria-label="Visualização em lista"
                  className={`p-2 ${viewMode === "list" ? "bg-muted" : "hover:bg-muted/50"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Carregando fontes...</span>
            </div>
          )}

          {catalogUnavailable && (
            <div className="flex flex-col items-center justify-center py-20 text-center max-w-xl mx-auto">
              <span className="text-destructive font-medium mb-2">
                Catálogo de fontes temporariamente indisponível
              </span>
              <span className="text-sm text-muted-foreground">
                Nosso armazenamento está em manutenção. Tente novamente em alguns minutos.
              </span>
            </div>
          )}

          {!isLoading && !catalogUnavailable && (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                  : "space-y-0"
              }
            >
              {fonts.map((font) => {
                const family = toFamilyId(font.fileName);
                const cardBase =
                  viewMode === "grid"
                    ? "border border-border rounded-lg p-5 bg-card hover:shadow-md transition-shadow"
                    : "border-b border-border py-6";
                return (
                  <div key={font.fileName} className={cardBase}>
                    <div className="flex items-center justify-between mb-2 gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm font-medium text-primary truncate">
                          {font.name}
                        </span>
                        {font.size > 0 && (
                          <>
                            <span className="text-muted-foreground">|</span>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {formatSize(font.size)}
                            </span>
                          </>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 shrink-0"
                        onClick={() => handleDownload(font.url, font.fileName)}
                      >
                        <Download className="w-4 h-4" />
                        Baixar
                      </Button>
                    </div>

                    <div
                      className="text-foreground break-words"
                      style={{
                        fontFamily: `"${family}", sans-serif`,
                        fontSize: `${fontSize}px`,
                        lineHeight: 1.2,
                      }}
                    >
                      {previewText || font.name}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

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

        <PageFooter />
      </main>
    </AppLayout>
    </>
  );
};

export default Index;
