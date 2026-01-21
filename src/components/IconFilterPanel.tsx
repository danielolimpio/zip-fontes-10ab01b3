import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, RotateCcw, X, Info } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface IconFilterPanelProps {
  iconWeight: number;
  onIconWeightChange: (value: number) => void;
  iconGrade: number;
  onIconGradeChange: (value: number) => void;
  opticalSize: number;
  onOpticalSizeChange: (value: number) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  iconStyle: "outlined" | "filled";
  onIconStyleChange: (value: "outlined" | "filled") => void;
  iconFill: boolean;
  onIconFillChange: (value: boolean) => void;
  categories: string[];
}

export const IconFilterPanel = ({
  iconWeight,
  onIconWeightChange,
  iconGrade,
  onIconGradeChange,
  opticalSize,
  onOpticalSizeChange,
  selectedCategory,
  onCategoryChange,
  iconStyle,
  onIconStyleChange,
  iconFill,
  onIconFillChange,
  categories,
}: IconFilterPanelProps) => {
  const [styleOpen, setStyleOpen] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);

  const handleReset = () => {
    onIconWeightChange(400);
    onIconGradeChange(0);
    onOpticalSizeChange(24);
    onIconFillChange(false);
  };

  return (
    <aside className="w-72 min-w-72 border-r border-border bg-background h-screen overflow-y-auto sticky top-0">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <RotateCcw 
            className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" 
            onClick={handleReset}
          />
          <span className="text-sm text-muted-foreground">Resetar tudo</span>
        </div>
        <X className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
      </div>

      <div className="p-4 space-y-6">
        {/* Customize Section */}
        <div>
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
            </svg>
            Personalizar
          </h3>
          
          {/* Fill Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm">Preenchimento</span>
              <Info className="w-3 h-3 text-muted-foreground" />
            </div>
            <Switch 
              checked={iconFill}
              onCheckedChange={onIconFillChange}
            />
          </div>

          {/* Weight Slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">Peso</span>
                <Info className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground font-mono">{iconWeight}</span>
            </div>
            <Slider
              value={[iconWeight]}
              onValueChange={(value) => onIconWeightChange(value[0])}
              min={100}
              max={700}
              step={100}
              className="my-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>100 (fino)</span>
              <span>700 (grosso)</span>
            </div>
          </div>

          {/* Grade Slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">Intensidade</span>
                <Info className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground font-mono">{iconGrade}</span>
            </div>
            <Slider
              value={[iconGrade]}
              onValueChange={(value) => onIconGradeChange(value[0])}
              min={-25}
              max={200}
              step={25}
              className="my-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>-25 (baixa)</span>
              <span>200 (alta)</span>
            </div>
          </div>

          {/* Optical Size Slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">Tamanho Óptico</span>
                <Info className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground font-mono">{opticalSize}px</span>
            </div>
            <Slider
              value={[opticalSize]}
              onValueChange={(value) => onOpticalSizeChange(value[0])}
              min={16}
              max={48}
              step={4}
              className="my-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>16px</span>
              <span>48px</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h3 className="text-sm font-medium mb-4">Filtros</h3>

          {/* Style Section */}
          <Collapsible open={styleOpen} onOpenChange={setStyleOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <span className="text-sm">Estilo</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${styleOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              <Select defaultValue="lucide">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecionar biblioteca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lucide">Lucide Icons</SelectItem>
                  <SelectItem value="material">Material Icons</SelectItem>
                </SelectContent>
              </Select>
              <Select 
                value={iconStyle} 
                onValueChange={(value: "outlined" | "filled") => onIconStyleChange(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecionar variante" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="outlined">Contorno</SelectItem>
                  <SelectItem value="filled">Preenchido</SelectItem>
                </SelectContent>
              </Select>
            </CollapsibleContent>
          </Collapsible>

          {/* Category Section */}
          <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 mt-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                <span className="text-sm">Categoria</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pt-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === category 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </aside>
  );
};
