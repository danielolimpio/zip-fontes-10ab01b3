import { useState } from "react";
import { ChevronDown, ChevronUp, Globe, Smile, RotateCcw, X, Shirt, Type, Calendar, Settings2 } from "lucide-react";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Button } from "./ui/button";

const feelingTags = [
  { label: "Business", style: "normal" },
  { label: "Fancy", style: "italic" },
  { label: "Calm", style: "normal" },
  { label: "Playful", style: "bold" },
  { label: "Cute", style: "italic" },
  { label: "Artistic", style: "bold" },
  { label: "Vintage", style: "italic" },
  { label: "Loud", style: "bold" },
  { label: "Sophisticated", style: "italic" },
  { label: "Futuristic", style: "normal" },
  { label: "Active", style: "bold" },
  { label: "Stiff", style: "normal" },
  { label: "Innovative", style: "bold" },
  { label: "Happy", style: "italic" },
  { label: "Childlike", style: "normal" },
  { label: "Rugged", style: "normal" },
  { label: "Awkward", style: "italic" },
  { label: "Excited", style: "uppercase" },
];

const appearanceTags = [
  { label: "Valentine's", style: "italic" },
  { label: "Techno", style: "normal" },
  { label: "Monospaced", style: "normal" },
  { label: "Blobby", style: "bold" },
  { label: "Marker", style: "normal" },
  { label: "Art Deco", style: "normal" },
  { label: "Art Nouveau", style: "normal" },
  { label: "Distressed", style: "normal" },
  { label: "Stencil", style: "bold" },
  { label: "Wood type", style: "normal" },
  { label: "Medieval", style: "italic" },
  { label: "Blackletter", style: "bold" },
  { label: "Pixel", style: "normal" },
  { label: "Not text", style: "normal" },
  { label: "Tuscan", style: "italic" },
  { label: "Wacky", style: "uppercase" },
  { label: "Shaded", style: "bold" },
  { label: "Inline", style: "italic" },
];

const calligraphyTags = [
  { label: "All", style: "normal" },
  { label: "Handwritten", style: "italic" },
  { label: "Formal", style: "italic" },
  { label: "Informal", style: "underline" },
  { label: "Upright", style: "normal" },
];

const serifTags = [
  { label: "All", style: "normal" },
  { label: "Transitional", style: "normal" },
  { label: "Slab", style: "normal" },
  { label: "Old Style", style: "normal" },
  { label: "Modern", style: "normal" },
  { label: "Humanist", style: "bold" },
  { label: "Scotch", style: "normal" },
  { label: "Fatface", style: "bold" },
  { label: "Didone", style: "normal" },
];

const sansSerifTags = [
  { label: "All", style: "normal" },
  { label: "Humanist", style: "bold" },
  { label: "Geometric", style: "normal" },
  { label: "Neo Grotesque", style: "normal" },
  { label: "Rounded", style: "normal" },
  { label: "Superellipse", style: "normal" },
  { label: "Grotesque", style: "bold" },
  { label: "Glyphic", style: "normal" },
];

const technologyTags = [
  { label: "Variable", style: "normal" },
  { label: "Color", style: "color" },
  { label: "None", style: "normal" },
];

const seasonalTags = [
  { label: "Lunar New Year", style: "normal" },
  { label: "Valentine's", style: "italic" },
  { label: "Holi", style: "colorful" },
  { label: "Halloween", style: "uppercase" },
  { label: "Diwali", style: "normal" },
  { label: "Christmas", style: "bold" },
  { label: "Hanukkah", style: "italic" },
  { label: "Kwanzaa", style: "bold" },
];

interface FilterPanelProps {
  previewText: string;
  onPreviewTextChange: (text: string) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

const getTagStyle = (style: string) => {
  switch (style) {
    case "italic": return "italic";
    case "bold": return "font-semibold";
    case "uppercase": return "uppercase tracking-wider";
    case "underline": return "underline";
    case "color": return "text-blue-500";
    case "colorful": return "bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 bg-clip-text text-transparent font-semibold";
    default: return "";
  }
};

const FilterSection = ({ 
  title, 
  icon: Icon, 
  tags, 
  selectedTags, 
  onToggle, 
  defaultOpen = true 
}: { 
  title: string; 
  icon: React.ElementType; 
  tags: { label: string; style: string }[]; 
  selectedTags: string[];
  onToggle: (tag: string) => void;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-4">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          {title}
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.label}
              onClick={() => onToggle(tag.label)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                selectedTags.includes(tag.label)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted border-border text-foreground hover:border-primary'
              } ${getTagStyle(tag.style)}`}
            >
              {selectedTags.includes(tag.label) && "✓ "}
              {tag.label}
            </button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export const FilterPanel = ({
  previewText,
  onPreviewTextChange,
  fontSize,
  onFontSizeChange,
}: FilterPanelProps) => {
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [selectedAppearance, setSelectedAppearance] = useState<string[]>([]);
  const [selectedCalligraphy, setSelectedCalligraphy] = useState<string[]>([]);
  const [selectedSerif, setSelectedSerif] = useState<string[]>([]);
  const [selectedSansSerif, setSelectedSansSerif] = useState<string[]>([]);
  const [selectedTechnology, setSelectedTechnology] = useState<string[]>([]);
  const [selectedSeasonal, setSelectedSeasonal] = useState<string[]>([]);
  const [numberOfStyles, setNumberOfStyles] = useState([5]);

  const toggleTag = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (tag: string) => {
    setter(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const resetAll = () => {
    setSelectedFeelings([]);
    setSelectedAppearance([]);
    setSelectedCalligraphy([]);
    setSelectedSerif([]);
    setSelectedSansSerif([]);
    setSelectedTechnology([]);
    setSelectedSeasonal([]);
    setNumberOfStyles([5]);
  };

  return (
    <aside className="w-[280px] border-r border-border bg-background overflow-y-auto h-[calc(100vh-60px)] flex-shrink-0">
      <div className="p-4">
        {/* Reset & Close */}
        <div className="flex items-center gap-2 mb-6">
          <button 
            onClick={resetAll}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
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

        {/* Filter Section Header */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-foreground mb-4">Filter</h3>
        </div>

        {/* Language Collapsible */}
        <Collapsible defaultOpen className="mb-4">
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Language
            </div>
            <ChevronUp className="w-4 h-4" />
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

        {/* Feeling */}
        <FilterSection
          title="Feeling"
          icon={Smile}
          tags={feelingTags}
          selectedTags={selectedFeelings}
          onToggle={toggleTag(setSelectedFeelings)}
        />

        {/* Appearance */}
        <FilterSection
          title="Appearance"
          icon={Shirt}
          tags={appearanceTags}
          selectedTags={selectedAppearance}
          onToggle={toggleTag(setSelectedAppearance)}
        />

        {/* Calligraphy */}
        <FilterSection
          title="Calligraphy"
          icon={Type}
          tags={calligraphyTags}
          selectedTags={selectedCalligraphy}
          onToggle={toggleTag(setSelectedCalligraphy)}
        />

        {/* Serif */}
        <FilterSection
          title="Serif"
          icon={Type}
          tags={serifTags}
          selectedTags={selectedSerif}
          onToggle={toggleTag(setSelectedSerif)}
        />

        {/* Sans Serif */}
        <FilterSection
          title="Sans Serif"
          icon={Type}
          tags={sansSerifTags}
          selectedTags={selectedSansSerif}
          onToggle={toggleTag(setSelectedSansSerif)}
        />

        {/* Technology */}
        <FilterSection
          title="Technology"
          icon={Type}
          tags={technologyTags}
          selectedTags={selectedTechnology}
          onToggle={toggleTag(setSelectedTechnology)}
        />

        {/* Seasonal */}
        <FilterSection
          title="Seasonal"
          icon={Calendar}
          tags={seasonalTags}
          selectedTags={selectedSeasonal}
          onToggle={toggleTag(setSelectedSeasonal)}
        />

        {/* Properties */}
        <Collapsible defaultOpen className="mb-4">
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary">
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              Properties
            </div>
            <ChevronUp className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            <div className="space-y-2">
              <span className="text-xs text-muted-foreground">Number of styles</span>
              <Slider
                value={numberOfStyles}
                onValueChange={setNumberOfStyles}
                min={1}
                max={20}
                step={1}
                className="flex-1"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </aside>
  );
};
