import { useState } from "react";
import { ChevronDown, ChevronUp, Globe, Smile, RotateCcw, X } from "lucide-react";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Button } from "./ui/button";

const feelingTags = [
  { label: "Business", style: "normal" },
  { label: "Fancy", style: "italic" },
  { label: "Calm", style: "normal" },
  { label: "Playful", style: "normal" },
  { label: "Cute", style: "italic" },
  { label: "Artistic", style: "italic" },
  { label: "Vintage", style: "italic" },
  { label: "Loud", style: "normal" },
  { label: "Sophisticated", style: "italic" },
  { label: "Futuristic", style: "normal" },
  { label: "Active", style: "italic" },
  { label: "Stiff", style: "normal" },
];

interface FilterPanelProps {
  previewText: string;
  onPreviewTextChange: (text: string) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

export const FilterPanel = ({
  previewText,
  onPreviewTextChange,
  fontSize,
  onFontSizeChange,
}: FilterPanelProps) => {
  const [languageOpen, setLanguageOpen] = useState(true);
  const [feelingOpen, setFeelingOpen] = useState(true);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);

  const toggleFeeling = (feeling: string) => {
    setSelectedFeelings(prev => 
      prev.includes(feeling) 
        ? prev.filter(f => f !== feeling)
        : [...prev, feeling]
    );
  };

  return (
    <aside className="w-[280px] border-r border-border bg-white overflow-y-auto h-[calc(100vh-60px)] flex-shrink-0">
      <div className="p-4">
        {/* Reset & Close */}
        <div className="flex items-center gap-2 mb-6">
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <RotateCcw className="w-4 h-4" />
            Reset all
          </button>
          <X className="w-4 h-4 text-muted-foreground ml-auto cursor-pointer hover:text-foreground" />
        </div>

        {/* Preview Input */}
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-2 block">Preview</label>
          <Input
            value={previewText}
            onChange={(e) => onPreviewTextChange(e.target.value)}
            className="bg-muted border-0"
            placeholder="Digite para preview..."
          />
        </div>

        {/* Font Size Slider */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground w-12">{fontSize}px</span>
            <Slider
              value={[fontSize]}
              onValueChange={(value) => onFontSizeChange(value[0])}
              min={12}
              max={120}
              step={1}
              className="flex-1"
            />
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-foreground mb-4">Filter</h3>
        </div>

        {/* Language Collapsible */}
        <Collapsible open={languageOpen} onOpenChange={setLanguageOpen} className="mb-4">
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Language
            </div>
            {languageOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start text-sm font-normal">
              Writing system
              <ChevronDown className="w-4 h-4 ml-auto" />
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-sm font-normal">
              Language
              <ChevronDown className="w-4 h-4 ml-auto" />
            </Button>
          </CollapsibleContent>
        </Collapsible>

        {/* Feeling Collapsible */}
        <Collapsible open={feelingOpen} onOpenChange={setFeelingOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary">
            <div className="flex items-center gap-2">
              <Smile className="w-4 h-4" />
              Feeling
            </div>
            {feelingOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            <div className="flex flex-wrap gap-2">
              {feelingTags.map((tag) => (
                <button
                  key={tag.label}
                  onClick={() => toggleFeeling(tag.label)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                    selectedFeelings.includes(tag.label)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-muted border-border text-foreground hover:border-primary'
                  } ${tag.style === 'italic' ? 'italic' : ''}`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </aside>
  );
};
