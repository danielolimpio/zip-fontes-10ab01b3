import { useState, useMemo } from "react";
import { IconSidebar } from "@/components/IconSidebar";
import { IconFilterPanel } from "@/components/IconFilterPanel";
import { IconDetailPanel } from "@/components/IconDetailPanel";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Get all available icons from lucide-react - método mais robusto
const getIconList = (): { name: string; Icon: LucideIcon }[] => {
  const excludeList = new Set([
    'createLucideIcon',
    'default',
    'icons',
    'createElement',
    'LucideIcon',
    'dynamicIconImports',
    'Icon',
  ]);
  
  const iconList: { name: string; Icon: LucideIcon }[] = [];
  
  for (const [name, component] of Object.entries(LucideIcons)) {
    // Pular itens da lista de exclusão
    if (excludeList.has(name)) continue;
    
    // Verificar se é um componente React válido (começa com letra maiúscula e é uma função ou objeto com $$typeof)
    if (!/^[A-Z]/.test(name)) continue;
    
    // Verificar se é um componente válido
    if (typeof component === 'function' || 
        (typeof component === 'object' && component !== null && '$$typeof' in component)) {
      iconList.push({
        name: name.replace(/([A-Z])/g, ' $1').trim(),
        Icon: component as LucideIcon,
      });
    }
  }
  
  return iconList;
};

// Inicializar lista de ícones
let allIcons: { name: string; Icon: LucideIcon }[] = [];
try {
  allIcons = getIconList();
  console.log(`Loaded ${allIcons.length} icons`);
} catch (error) {
  console.error('Error loading icons:', error);
  allIcons = [];
}

// Categorias em português
const categories = [
  "Todos",
  "Ações de UI",
  "Navegação",
  "Mídia",
  "Comunicação",
  "Arquivos",
  "Gráficos",
  "Dispositivos",
  "Clima",
  "Social",
];

const IconsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState<{ name: string; Icon: LucideIcon } | null>(null);
  const [iconSize, setIconSize] = useState(24);
  const [iconColor, setIconColor] = useState("#1F1F1F");
  const [iconWeight, setIconWeight] = useState(400);
  const [iconGrade, setIconGrade] = useState(0);
  const [opticalSize, setOpticalSize] = useState(24);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [iconStyle, setIconStyle] = useState<"outlined" | "filled">("outlined");
  const [iconFill, setIconFill] = useState(false);
  const [sortBy, setSortBy] = useState("Mais populares");

  // Filter icons based on search - TODOS os ícones disponíveis (1500+)
  const filteredIcons = useMemo(() => {
    let icons = allIcons;
    
    if (searchQuery) {
      icons = icons.filter(icon => 
        icon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrar por categoria
    if (selectedCategory !== "Todos") {
      const categoryKeywords: Record<string, string[]> = {
        "Ações de UI": ["plus", "minus", "check", "x", "edit", "delete", "add", "remove", "copy", "paste", "cut", "undo", "redo", "save", "close", "open", "expand", "collapse", "zoom", "refresh", "rotate", "flip", "move", "drag", "drop", "select", "click", "tap", "toggle", "switch", "button"],
        "Navegação": ["arrow", "chevron", "menu", "home", "back", "forward", "up", "down", "left", "right", "navigation", "compass", "map", "location", "pin", "route", "direction", "path", "corner", "move"],
        "Mídia": ["play", "pause", "stop", "record", "video", "audio", "music", "camera", "image", "photo", "picture", "gallery", "album", "film", "movie", "tv", "screen", "volume", "speaker", "mic", "headphone", "radio", "podcast"],
        "Comunicação": ["mail", "message", "chat", "comment", "phone", "call", "contact", "send", "inbox", "outbox", "reply", "forward", "share", "bell", "notification", "alert", "megaphone", "announce"],
        "Arquivos": ["file", "folder", "document", "archive", "zip", "download", "upload", "cloud", "storage", "drive", "disk", "paper", "clipboard", "attachment", "link"],
        "Gráficos": ["chart", "graph", "bar", "line", "pie", "analytics", "stats", "trending", "activity", "pulse", "signal", "data", "report"],
        "Dispositivos": ["laptop", "computer", "desktop", "mobile", "tablet", "phone", "watch", "printer", "keyboard", "mouse", "monitor", "display", "cpu", "server", "hardware", "usb", "bluetooth", "wifi"],
        "Clima": ["sun", "moon", "cloud", "rain", "snow", "wind", "storm", "thunder", "fog", "temperature", "thermometer", "weather", "umbrella", "droplet"],
        "Social": ["user", "users", "group", "team", "people", "person", "profile", "avatar", "account", "heart", "like", "star", "bookmark", "follow", "friend", "community"],
      };

      const keywords = categoryKeywords[selectedCategory] || [];
      icons = icons.filter(icon => 
        keywords.some(keyword => 
          icon.name.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
    
    return icons; // Retornar TODOS os ícones filtrados
  }, [searchQuery, selectedCategory]);

  // Calcular strokeWidth baseado no weight (100-700 -> 0.5-3)
  const calculateStrokeWidth = () => {
    const normalized = (iconWeight - 100) / 600;
    return 0.5 + normalized * 2.5;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Icon Sidebar (narrow left) */}
      <IconSidebar activeItem="Icons" />
      
      {/* Main Layout */}
      <div className="ml-20 flex min-h-screen">
        {/* Filter Panel - w-72 padronizado */}
        {showFilters && (
          <IconFilterPanel
            iconWeight={iconWeight}
            onIconWeightChange={setIconWeight}
            iconGrade={iconGrade}
            onIconGradeChange={setIconGrade}
            opticalSize={opticalSize}
            onOpticalSizeChange={setOpticalSize}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            iconStyle={iconStyle}
            onIconStyleChange={setIconStyle}
            iconFill={iconFill}
            onIconFillChange={setIconFill}
            categories={categories}
          />
        )}
        
        {/* Main Content Area */}
        <main className="flex-1 min-h-screen bg-background flex flex-col">
          {/* Header padronizado */}
          <PageHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Buscar ícones..."
            rightContent={
              <>
                <span className="text-sm text-muted-foreground">Ordenar por</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm font-medium bg-transparent border-0 focus:outline-none cursor-pointer"
                >
                  <option value="Mais populares">Mais populares</option>
                  <option value="Nome">Nome</option>
                  <option value="Mais recentes">Mais recentes</option>
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
            
            {/* Info Cards */}
            <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
              <div className="flex items-center gap-3 p-4 border border-border rounded-lg min-w-[200px] hover:bg-muted/50 cursor-pointer">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <LucideIcons.BookOpen className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Guia de ícones</p>
                  <p className="text-xs text-muted-foreground">Melhores práticas</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border border-border rounded-lg min-w-[200px] hover:bg-muted/50 cursor-pointer">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <LucideIcons.Figma className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Plugin Figma</p>
                  <p className="text-xs text-muted-foreground">Use no Figma</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border border-border rounded-lg min-w-[200px] hover:bg-muted/50 cursor-pointer">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <LucideIcons.Github className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Repositório GitHub</p>
                  <p className="text-xs text-muted-foreground">Código fonte</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border border-border rounded-lg min-w-[200px] hover:bg-muted/50 cursor-pointer">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <LucideIcons.FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Licença Apache</p>
                  <p className="text-xs text-muted-foreground">Uso comercial livre</p>
                </div>
              </div>
            </div>
            
            {/* Category Label */}
            <h2 className="text-sm font-medium text-muted-foreground mb-4">
              {selectedCategory === "Todos" ? "Todos os ícones" : selectedCategory} 
              <span className="ml-2 text-xs">({filteredIcons.length} ícones)</span>
            </h2>
            
            {/* Icons Grid - grid mais denso para mais ícones */}
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-14 2xl:grid-cols-16 gap-1">
              {filteredIcons.map((icon, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIcon(icon)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all hover:bg-muted group ${
                    selectedIcon?.name === icon.name ? 'bg-primary/10 ring-2 ring-primary' : ''
                  }`}
                >
                  <icon.Icon 
                    size={opticalSize}
                    className="mb-1 text-foreground" 
                    strokeWidth={calculateStrokeWidth()}
                    fill={iconFill ? "currentColor" : "none"}
                  />
                  <span className="text-[9px] text-muted-foreground text-center leading-tight line-clamp-1 group-hover:text-foreground max-w-full truncate">
                    {icon.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Footer padronizado */}
          <PageFooter />
        </main>
        
        {/* Icon Detail Panel */}
        {selectedIcon && (
          <IconDetailPanel
            icon={selectedIcon}
            iconSize={iconSize}
            onIconSizeChange={setIconSize}
            iconColor={iconColor}
            onIconColorChange={setIconColor}
            onClose={() => setSelectedIcon(null)}
          />
        )}
      </div>
    </div>
  );
};

export default IconsPage;
