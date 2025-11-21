import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FontCard } from "@/components/FontCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { FontPagination } from "@/components/FontPagination";

// Mock data - fontes livres de direitos autorais
const mockFonts = [
  { id: 1, name: "Roboto", category: "Sans Serif", downloads: 45000, fontFamily: "system-ui" },
  { id: 2, name: "Open Sans", category: "Sans Serif", downloads: 38000, fontFamily: "system-ui" },
  { id: 3, name: "Lato", category: "Sans Serif", downloads: 32000, fontFamily: "system-ui" },
  { id: 4, name: "Montserrat", category: "Sans Serif", downloads: 29000, fontFamily: "system-ui" },
  { id: 5, name: "Raleway", category: "Sans Serif", downloads: 25000, fontFamily: "system-ui" },
  { id: 6, name: "Ubuntu", category: "Sans Serif", downloads: 22000, fontFamily: "system-ui" },
  { id: 7, name: "Poppins", category: "Sans Serif", downloads: 21000, fontFamily: "system-ui" },
  { id: 8, name: "Noto Sans", category: "Sans Serif", downloads: 19000, fontFamily: "system-ui" },
  { id: 9, name: "Merriweather", category: "Serif", downloads: 18000, fontFamily: "serif" },
  { id: 10, name: "PT Sans", category: "Sans Serif", downloads: 17000, fontFamily: "system-ui" },
  { id: 11, name: "Playfair Display", category: "Serif", downloads: 16000, fontFamily: "serif" },
  { id: 12, name: "Source Sans Pro", category: "Sans Serif", downloads: 15000, fontFamily: "system-ui" },
];

const Index = () => {
  const [previewText, setPreviewText] = useState("Zip Fontes");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleStyleChange = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
    setCurrentPage(1);
  };

  // Filter fonts
  let filteredFonts = mockFonts;
  if (selectedCategories.length > 0) {
    filteredFonts = filteredFonts.filter((font) =>
      selectedCategories.includes(font.category)
    );
  }

  // Pagination
  const totalPages = Math.ceil(filteredFonts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFonts = filteredFonts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-primary">Zip Fontes</h1>
              <span className="text-xs text-muted-foreground">.com.br</span>
            </div>
            
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Digite uma palavra para preview das fontes..."
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value || "Zip Fontes")}
                  className="pl-10 bg-background border-border text-foreground"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - AdSense Space */}
          <aside className="w-40 flex-shrink-0">
            <div className="sticky top-24 bg-muted/30 border-2 border-dashed border-border rounded-lg p-4 h-[600px] flex items-center justify-center">
              <span className="text-xs text-muted-foreground text-center">
                Espaço para<br />AdSense<br />Vertical
              </span>
            </div>
          </aside>

          {/* Filters Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <FilterSidebar
              selectedCategories={selectedCategories}
              selectedStyles={selectedStyles}
              onCategoryChange={handleCategoryChange}
              onStyleChange={handleStyleChange}
            />
          </aside>

          {/* Fonts Grid */}
          <main className="flex-1">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Fontes Gratuitas ({filteredFonts.length})
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                100% livres de direitos autorais
              </p>
            </div>

            <div className="grid gap-6">
              {paginatedFonts.map((font) => (
                <FontCard
                  key={font.id}
                  name={font.name}
                  category={font.category}
                  downloads={font.downloads}
                  previewText={previewText}
                  fontFamily={font.fontFamily}
                />
              ))}
            </div>

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
          </main>

          {/* Right Sidebar - AdSense Space */}
          <aside className="w-40 flex-shrink-0">
            <div className="sticky top-24 bg-muted/30 border-2 border-dashed border-border rounded-lg p-4 h-[600px] flex items-center justify-center">
              <span className="text-xs text-muted-foreground text-center">
                Espaço para<br />AdSense<br />Vertical
              </span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Index;
