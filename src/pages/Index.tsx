import { useState } from "react";
import { Header } from "@/components/Header";
import { LeftSidebar } from "@/components/LeftSidebar";
import { FontCard } from "@/components/FontCard";
import { FilterBar } from "@/components/FilterBar";
import { FontPagination } from "@/components/FontPagination";
import { Button } from "@/components/ui/button";

// Mock data - fontes livres de direitos autorais
const mockFonts = [
  { id: 1, name: "Tradepar Script", category: "Script", author: "Ajith R", fontFamily: "cursive" },
  { id: 2, name: "Tradepar Serif", category: "Serif", author: "João Silva", fontFamily: "serif" },
  { id: 3, name: "Tradepar Sans", category: "Sans Serif", author: "Maria Santos", fontFamily: "system-ui" },
  { id: 4, name: "Tradepar Display", category: "Display", author: "Pedro Costa", fontFamily: "fantasy" },
  { id: 5, name: "Tradepar Mono", category: "Monospace", author: "Ana Lima", fontFamily: "monospace" },
  { id: 6, name: "Tradepar Bold", category: "Sans Serif", author: "Carlos Rocha", fontFamily: "system-ui" },
  { id: 7, name: "Tradepar Light", category: "Sans Serif", author: "Sofia Martins", fontFamily: "system-ui" },
  { id: 8, name: "Tradepar Handwriting", category: "Handwriting", author: "Lucas Pinto", fontFamily: "cursive" },
  { id: 9, name: "Tradepar Classic", category: "Serif", author: "Rita Ferreira", fontFamily: "serif" },
  { id: 10, name: "Tradepar Modern", category: "Sans Serif", author: "Miguel Alves", fontFamily: "system-ui" },
];

const Index = () => {
  const [previewText, setPreviewText] = useState("TRADEPAR");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Pagination
  const totalPages = Math.ceil(mockFonts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFonts = mockFonts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Layout: Espaço AdSense | Menu Lateral | Conteúdo | Espaço AdSense */}
      <div className="flex">
        {/* Espaço vazio para AdSense vertical esquerdo */}
        <div className="w-[140px] flex-shrink-0"></div>
        
        {/* Left Sidebar */}
        <LeftSidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 pt-[60px] min-h-screen">
          <div className="px-8 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Hero Section */}
              <div className="mb-8">
                <h1 className="text-[32px] font-bold text-primary mb-2">
                  Explore a arte da tipografia.
                </h1>
                <p className="text-base text-gray-600 leading-relaxed text-justify">
                  Descubra milhares de fontes gratuitas e de alta qualidade para seus projetos. 
                  Todas as fontes são 100% livres de direitos autorais e podem ser usadas em 
                  projetos pessoais e comerciais sem restrições.
                </p>
              </div>
              
              {/* Filter Bar */}
              <FilterBar
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                searchText={previewText}
                onSearchChange={setPreviewText}
              />
              
              {/* Fonts Grid */}
              <div className="space-y-6 mb-8">
                {paginatedFonts.map((font) => (
                  <FontCard
                    key={font.id}
                    name={font.name}
                    category={font.category}
                    author={font.author}
                    previewText={previewText}
                    fontFamily={font.fontFamily}
                  />
                ))}
              </div>
              
              {/* Recently Added Section */}
              <div className="my-12">
                <h2 className="text-2xl font-bold text-primary mb-2">
                  Fontes adicionadas recentemente.
                </h2>
                <p className="text-base text-gray-600 mb-6">
                  Confira as últimas adições à nossa coleção de fontes gratuitas.
                </p>
              </div>
              
              {/* Pagination */}
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
              
              {/* All New Fonts Button */}
              <div className="flex justify-center mt-8 mb-12">
                <Button 
                  className="bg-gradient-primary text-white font-bold text-base px-6 py-3 rounded-lg hover-scale shadow-sm"
                >
                  Todas as novas fontes
                </Button>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="bg-gray-100 py-6">
            <div className="max-w-4xl mx-auto px-8 text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <a href="#" className="text-xs text-gray-600 hover:text-primary">Ajuda e suporte</a>
                <span className="text-gray-400">|</span>
                <a href="#" className="text-xs text-gray-600 hover:text-primary">Privacidade e cookies</a>
                <span className="text-gray-400">|</span>
                <a href="#" className="text-xs text-gray-600 hover:text-primary">Contate-nos</a>
              </div>
              <p className="text-xs text-gray-600">
                © 2006-2025 Zip Fontes. Todos os direitos reservados.
              </p>
            </div>
          </footer>
        </main>
        
        {/* Espaço vazio para AdSense vertical direito */}
        <div className="w-[140px] flex-shrink-0"></div>
      </div>
    </div>
  );
};

export default Index;
