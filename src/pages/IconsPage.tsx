import { useState, useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { IconFilterPanel } from "@/components/IconFilterPanel";
import { IconDetailPanel } from "@/components/IconDetailPanel";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { StatsCards } from "@/components/StatsCards";
import { getStatsData } from "@/lib/statsData";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Categorias de ícones com mapeamento de palavras-chave
const iconCategories: { name: string; keywords: string[]; icon: string }[] = [
  { 
    name: "Ações de UI", 
    icon: "⚡",
    keywords: ["plus", "minus", "check", "x", "edit", "delete", "add", "remove", "copy", "paste", "cut", "undo", "redo", "save", "close", "open", "expand", "collapse", "zoom", "refresh", "rotate", "flip", "move", "drag", "drop", "select", "click", "tap", "toggle", "switch", "button", "trash", "pencil", "eraser"]
  },
  { 
    name: "Navegação", 
    icon: "🧭",
    keywords: ["arrow", "chevron", "menu", "home", "back", "forward", "up", "down", "left", "right", "navigation", "compass", "map", "location", "pin", "route", "direction", "path", "corner", "external", "link", "log", "sign", "door"]
  },
  { 
    name: "Mídia", 
    icon: "🎬",
    keywords: ["play", "pause", "stop", "record", "video", "audio", "music", "camera", "image", "photo", "picture", "gallery", "album", "film", "movie", "tv", "screen", "volume", "speaker", "mic", "headphone", "radio", "podcast", "youtube", "spotify"]
  },
  { 
    name: "Comunicação", 
    icon: "💬",
    keywords: ["mail", "message", "chat", "comment", "phone", "call", "contact", "send", "inbox", "outbox", "reply", "forward", "share", "bell", "notification", "alert", "megaphone", "announce", "at", "hash"]
  },
  { 
    name: "Arquivos", 
    icon: "📁",
    keywords: ["file", "folder", "document", "archive", "zip", "download", "upload", "cloud", "storage", "drive", "disk", "paper", "clipboard", "attachment", "link", "save", "export", "import"]
  },
  { 
    name: "Gráficos", 
    icon: "📊",
    keywords: ["chart", "graph", "bar", "line", "pie", "analytics", "stats", "trending", "activity", "pulse", "signal", "data", "report", "percent", "gauge"]
  },
  { 
    name: "Dispositivos", 
    icon: "💻",
    keywords: ["laptop", "computer", "desktop", "mobile", "tablet", "phone", "watch", "printer", "keyboard", "mouse", "monitor", "display", "cpu", "server", "hardware", "usb", "bluetooth", "wifi", "battery", "power", "plug"]
  },
  { 
    name: "Clima", 
    icon: "☀️",
    keywords: ["sun", "moon", "cloud", "rain", "snow", "wind", "storm", "thunder", "fog", "temperature", "thermometer", "weather", "umbrella", "droplet", "wave", "sunrise", "sunset"]
  },
  { 
    name: "Social", 
    icon: "👥",
    keywords: ["user", "users", "group", "team", "people", "person", "profile", "avatar", "account", "heart", "like", "star", "bookmark", "follow", "friend", "community", "thumb"]
  },
  { 
    name: "E-commerce", 
    icon: "🛒",
    keywords: ["cart", "shop", "store", "bag", "package", "box", "gift", "credit", "wallet", "money", "dollar", "coin", "receipt", "tag", "price", "sale", "percent", "truck", "shipping"]
  },
  { 
    name: "Segurança", 
    icon: "🔒",
    keywords: ["lock", "unlock", "key", "shield", "security", "eye", "hide", "show", "password", "fingerprint", "scan", "verify", "check", "alert", "warning"]
  },
  { 
    name: "Ferramentas", 
    icon: "🔧",
    keywords: ["tool", "wrench", "hammer", "screwdriver", "settings", "gear", "cog", "config", "option", "preference", "filter", "sort", "adjust", "tune", "calibrate"]
  },
  { 
    name: "Texto", 
    icon: "📝",
    keywords: ["text", "font", "type", "bold", "italic", "underline", "strike", "align", "list", "quote", "heading", "paragraph", "format", "edit", "write", "pen", "pencil", "highlight"]
  },
  { 
    name: "Formas", 
    icon: "⬡",
    keywords: ["circle", "square", "triangle", "rectangle", "diamond", "star", "heart", "hexagon", "octagon", "shape", "box", "frame", "grid", "layout"]
  },
  { 
    name: "Tempo", 
    icon: "⏰",
    keywords: ["clock", "time", "timer", "watch", "calendar", "date", "schedule", "alarm", "hour", "minute", "history", "past", "future"]
  },
  { 
    name: "Casa", 
    icon: "🏠",
    keywords: ["home", "house", "building", "door", "window", "bed", "sofa", "lamp", "light", "bulb", "fan", "air", "heater", "refrigerator", "microwave", "oven", "bath", "shower", "toilet", "sink", "faucet", "plug", "outlet"]
  },
  { 
    name: "Outros", 
    icon: "📦",
    keywords: []
  }
];

// Get all available icons from lucide-react
const getIconList = (): { name: string; Icon: LucideIcon; originalName: string }[] => {
  const excludeList = new Set([
    'createLucideIcon',
    'default',
    'icons',
    'createElement',
    'LucideIcon',
    'dynamicIconImports',
    'Icon',
  ]);
  
  const iconList: { name: string; Icon: LucideIcon; originalName: string }[] = [];
  
  for (const [name, component] of Object.entries(LucideIcons)) {
    if (excludeList.has(name)) continue;
    if (!/^[A-Z]/.test(name)) continue;
    
    if (typeof component === 'function' || 
        (typeof component === 'object' && component !== null && '$$typeof' in component)) {
      iconList.push({
        name: name.replace(/([A-Z])/g, ' $1').trim(),
        originalName: name,
        Icon: component as LucideIcon,
      });
    }
  }
  
  return iconList;
};

// Inicializar lista de ícones
let allIcons: { name: string; Icon: LucideIcon; originalName: string }[] = [];
try {
  allIcons = getIconList();
  console.log(`Loaded ${allIcons.length} icons`);
} catch (error) {
  console.error('Error loading icons:', error);
  allIcons = [];
}

// Categorias em português para o filtro lateral
const filterCategories = [
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
  "E-commerce",
  "Segurança",
  "Ferramentas",
  "Texto",
  "Formas",
  "Tempo",
  "Casa",
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

  const stats = useMemo(() => getStatsData(), []);

  // Função para categorizar um ícone
  const categorizeIcon = (iconName: string): string => {
    const lowerName = iconName.toLowerCase();
    
    for (const category of iconCategories) {
      if (category.keywords.length === 0) continue; // Pula "Outros"
      if (category.keywords.some(keyword => lowerName.includes(keyword.toLowerCase()))) {
        return category.name;
      }
    }
    
    return "Outros";
  };

  // Filtrar e organizar ícones por seção
  const { filteredIcons, iconsByCategory } = useMemo(() => {
    let icons = allIcons;
    
    // Filtrar por busca
    if (searchQuery) {
      icons = icons.filter(icon => 
        icon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Se uma categoria específica foi selecionada
    if (selectedCategory !== "Todos") {
      const category = iconCategories.find(c => c.name === selectedCategory);
      if (category && category.keywords.length > 0) {
        icons = icons.filter(icon => 
          category.keywords.some(keyword => 
            icon.name.toLowerCase().includes(keyword.toLowerCase())
          )
        );
      }
    }

    // Agrupar por categoria (apenas quando "Todos" está selecionado)
    const byCategory: Record<string, typeof icons> = {};
    
    if (selectedCategory === "Todos") {
      icons.forEach(icon => {
        const cat = categorizeIcon(icon.name);
        if (!byCategory[cat]) {
          byCategory[cat] = [];
        }
        byCategory[cat].push(icon);
      });
    }
    
    return { filteredIcons: icons, iconsByCategory: byCategory };
  }, [searchQuery, selectedCategory]);

  // Calcular strokeWidth baseado no weight (100-700 -> 0.5-3)
  const calculateStrokeWidth = () => {
    const normalized = (iconWeight - 100) / 600;
    return 0.5 + normalized * 2.5;
  };

  // Renderizar grid de ícones
  const renderIconGrid = (icons: typeof allIcons) => (
    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-14 2xl:grid-cols-16 gap-1">
      {icons.map((icon, index) => (
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
  );

  return (
    <AppLayout activeItem="Icons">
      {/* Filter Panel - largura padronizada */}
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
          categories={filterCategories}
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
                  aria-label="Ordenar ícones por"
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
            <h1 className="sr-only">Zip Fontes — Catálogo de Ícones</h1>

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
            
            {/* Category Label */}
            <h2 className="text-sm font-medium text-muted-foreground mb-4">
              {selectedCategory === "Todos" ? "Todos os ícones" : selectedCategory} 
              <span className="ml-2 text-xs">({filteredIcons.length} ícones)</span>
            </h2>
            
            {/* Icons organized by sections when "Todos" is selected */}
            {selectedCategory === "Todos" ? (
              <div className="space-y-8">
                {iconCategories
                  .filter(cat => iconsByCategory[cat.name]?.length > 0)
                  .map(category => (
                    <section key={category.name} className="bg-background">
                      {/* Section Header */}
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                        <span className="text-xl">{category.icon}</span>
                        <h3 className="text-base font-semibold text-foreground">{category.name}</h3>
                        <span className="text-xs text-muted-foreground">
                          ({iconsByCategory[category.name]?.length || 0} ícones)
                        </span>
                      </div>
                      
                      {/* Icons Grid */}
                      {renderIconGrid(iconsByCategory[category.name] || [])}
                    </section>
                  ))
                }
              </div>
            ) : (
              /* Single grid when specific category is selected */
              renderIconGrid(filteredIcons)
            )}
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
    </AppLayout>
  );
};

export default IconsPage;
