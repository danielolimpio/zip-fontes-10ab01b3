import { useState } from "react";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Search, RotateCcw, Grid3X3, LayoutGrid, Maximize2 } from "lucide-react";
import { emojiCategories, EmojiCategory } from "@/lib/emojiData";

interface EmojisConfigPanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  emojiSize: number;
  onEmojiSizeChange: (size: number) => void;
  showLabels: boolean;
  onShowLabelsChange: (show: boolean) => void;
  compactMode: boolean;
  onCompactModeChange: (compact: boolean) => void;
}

export const EmojisConfigPanel = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  emojiSize,
  onEmojiSizeChange,
  showLabels,
  onShowLabelsChange,
  compactMode,
  onCompactModeChange
}: EmojisConfigPanelProps) => {
  const resetFilters = () => {
    onSearchChange("");
    onCategoryChange(null);
    onEmojiSizeChange(32);
    onShowLabelsChange(false);
    onCompactModeChange(false);
  };

  return (
    <div className="w-[280px] min-w-[280px] bg-background border-r border-border flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Resetar tudo
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <span className="text-muted-foreground">×</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Search */}
        <div className="p-4 border-b border-border">
          <label className="text-sm font-medium text-foreground mb-2 block">Buscar</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar emojis..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Emoji Size */}
        <div className="p-4 border-b border-border">
          <label className="text-sm font-medium text-foreground mb-3 block">
            Tamanho: {emojiSize}px
          </label>
          <Slider
            value={[emojiSize]}
            onValueChange={(value) => onEmojiSizeChange(value[0])}
            min={20}
            max={64}
            step={4}
            className="w-full"
          />
        </div>

        {/* Display Options */}
        <div className="p-4 border-b border-border space-y-4">
          <label className="text-sm font-medium text-foreground block">Exibição</label>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Mostrar nomes</span>
            </div>
            <Switch 
              checked={showLabels} 
              onCheckedChange={onShowLabelsChange} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Grid3X3 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Modo compacto</span>
            </div>
            <Switch 
              checked={compactMode} 
              onCheckedChange={onCompactModeChange} 
            />
          </div>
        </div>

        {/* Categories */}
        <div className="p-4">
          <label className="text-sm font-medium text-foreground mb-3 block">Categorias</label>
          <div className="space-y-1">
            <button
              onClick={() => onCategoryChange(null)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === null 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <span className="text-lg">🌐</span>
              <span>Todos os Emojis</span>
            </button>
            
            {emojiCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
