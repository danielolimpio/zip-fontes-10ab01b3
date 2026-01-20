import { useState } from "react";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown, Type, Palette, Sparkles, History, Heart, RefreshCw } from "lucide-react";
import { getCategories } from "@/lib/unicodeFonts";

interface InstaFontsConfigPanelProps {
  inputText: string;
  onInputTextChange: (text: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

const presetTexts = [
  "Your text here",
  "Hello World",
  "Follow Me",
  "Link in Bio",
  "New Post",
  "Check This Out",
];

export const InstaFontsConfigPanel = ({
  inputText,
  onInputTextChange,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchQueryChange,
}: InstaFontsConfigPanelProps) => {
  const [showPreview, setShowPreview] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  
  const categories = getCategories();

  return (
    <aside className="w-[280px] bg-card border-r border-border flex-shrink-0 overflow-y-auto h-screen sticky top-0">
      <div className="p-4 space-y-6">
        {/* Input Text Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Type className="w-4 h-4" />
            <span>Texto para transformar</span>
          </div>
          <Input
            value={inputText}
            onChange={(e) => onInputTextChange(e.target.value)}
            placeholder="Digite seu texto..."
            className="text-base"
          />
          
          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5">
            {presetTexts.slice(0, 4).map((text) => (
              <Button
                key={text}
                variant="outline"
                size="sm"
                className="text-xs h-7 px-2"
                onClick={() => onInputTextChange(text)}
              >
                {text}
              </Button>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span>Categorias</span>
            </div>
            <ChevronDown className="w-4 h-4 transition-transform duration-200" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="flex flex-wrap gap-1.5">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/90 transition-colors text-xs"
                onClick={() => onCategoryChange(null)}
              >
                Todos
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/90 transition-colors text-xs"
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Display Options */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Opções de exibição</span>
            </div>
            <ChevronDown className="w-4 h-4 transition-transform duration-200" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-preview" className="text-sm text-muted-foreground">
                Mostrar preview
              </Label>
              <Switch
                id="show-preview"
                checked={showPreview}
                onCheckedChange={setShowPreview}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-scroll" className="text-sm text-muted-foreground">
                Auto-scroll ao copiar
              </Label>
              <Switch
                id="auto-scroll"
                checked={autoScroll}
                onCheckedChange={setAutoScroll}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="compact-mode" className="text-sm text-muted-foreground">
                Modo compacto
              </Label>
              <Switch
                id="compact-mode"
                checked={compactMode}
                onCheckedChange={setCompactMode}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Recent/Favorites - Placeholder */}
        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Favoritos</span>
            </div>
            <ChevronDown className="w-4 h-4 transition-transform duration-200" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <p className="text-xs text-muted-foreground">
              Clique no ❤️ em um estilo para salvá-lo aqui.
            </p>
          </CollapsibleContent>
        </Collapsible>

        {/* History - Placeholder */}
        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4" />
              <span>Histórico</span>
            </div>
            <ChevronDown className="w-4 h-4 transition-transform duration-200" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <p className="text-xs text-muted-foreground">
              Seus textos recentes aparecerão aqui.
            </p>
          </CollapsibleContent>
        </Collapsible>

        {/* Tips Section */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Dica
          </h4>
          <p className="text-xs text-muted-foreground">
            Esses caracteres Unicode especiais funcionam na maioria das plataformas, 
            mas alguns apps podem não exibir corretamente todos os estilos.
          </p>
        </div>

        {/* Reset Button */}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full gap-2"
          onClick={() => {
            onInputTextChange("Your text here");
            onCategoryChange(null);
            onSearchQueryChange("");
          }}
        >
          <RefreshCw className="w-4 h-4" />
          Resetar tudo
        </Button>
      </div>
    </aside>
  );
};
