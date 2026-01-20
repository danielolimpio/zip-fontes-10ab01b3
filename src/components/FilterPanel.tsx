import { useState } from "react";
import { ChevronDown, ChevronUp, Smile, RotateCcw, X, Shirt, Type, Calendar, Settings2 } from "lucide-react";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Button } from "./ui/button";

const feelingTags = [
  { label: "Business", style: "normal", fontFamily: "Arial, sans-serif" },
  { label: "Fancy", style: "italic", fontFamily: "'Brush Script MT', cursive" },
  { label: "Calm", style: "normal", fontFamily: "'Georgia', serif" },
  { label: "Playful", style: "bold", fontFamily: "'Comic Sans MS', cursive" },
  { label: "Cute", style: "italic", fontFamily: "'Segoe Script', cursive" },
  { label: "Artistic", style: "bold", fontFamily: "'Papyrus', fantasy" },
  { label: "Vintage", style: "italic", fontFamily: "'Times New Roman', serif" },
  { label: "Loud", style: "bold", fontFamily: "'Impact', sans-serif" },
  { label: "Sophisticated", style: "italic", fontFamily: "'Palatino Linotype', serif" },
  { label: "Futuristic", style: "normal", fontFamily: "'Trebuchet MS', sans-serif" },
  { label: "Active", style: "bold", fontFamily: "'Arial Black', sans-serif" },
  { label: "Stiff", style: "normal", fontFamily: "'Courier New', monospace" },
  { label: "Innovative", style: "bold", fontFamily: "'Century Gothic', sans-serif" },
  { label: "Happy", style: "italic", fontFamily: "'Segoe Script', cursive" },
  { label: "Childlike", style: "normal", fontFamily: "'Comic Sans MS', cursive" },
  { label: "Rugged", style: "normal", fontFamily: "'Rockwell', serif" },
  { label: "Awkward", style: "italic", fontFamily: "'Courier New', monospace" },
  { label: "Excited", style: "uppercase", fontFamily: "'Impact', sans-serif" },
];

const appearanceTags = [
  { label: "Valentine's", style: "italic", fontFamily: "'Segoe Script', cursive" },
  { label: "Techno", style: "normal", fontFamily: "'Orbitron', sans-serif" },
  { label: "Monospaced", style: "normal", fontFamily: "'Courier New', monospace" },
  { label: "Blobby", style: "bold", fontFamily: "'Comic Sans MS', cursive" },
  { label: "Marker", style: "normal", fontFamily: "'Marker Felt', fantasy" },
  { label: "Art Deco", style: "normal", fontFamily: "'Copperplate', serif" },
  { label: "Art Nouveau", style: "normal", fontFamily: "'Palatino Linotype', serif" },
  { label: "Distressed", style: "normal", fontFamily: "'Courier New', monospace" },
  { label: "Stencil", style: "bold", fontFamily: "'Stencil', fantasy" },
  { label: "Wood type", style: "normal", fontFamily: "'Rockwell', serif" },
  { label: "Medieval", style: "italic", fontFamily: "'Old English Text MT', fantasy" },
  { label: "Blackletter", style: "bold", fontFamily: "'Old English Text MT', fantasy" },
  { label: "Pixel", style: "normal", fontFamily: "'Courier New', monospace" },
  { label: "Not text", style: "normal", fontFamily: "'Wingdings', fantasy" },
  { label: "Tuscan", style: "italic", fontFamily: "'Playfair Display', serif" },
  { label: "Wacky", style: "uppercase", fontFamily: "'Comic Sans MS', cursive" },
  { label: "Shaded", style: "bold", fontFamily: "'Copperplate', serif" },
  { label: "Inline", style: "italic", fontFamily: "'Copperplate', serif" },
];

const calligraphyTags = [
  { label: "All", style: "normal", fontFamily: "'Georgia', serif" },
  { label: "Handwritten", style: "italic", fontFamily: "'Brush Script MT', cursive" },
  { label: "Formal", style: "italic", fontFamily: "'Edwardian Script ITC', cursive" },
  { label: "Informal", style: "underline", fontFamily: "'Segoe Script', cursive" },
  { label: "Upright", style: "normal", fontFamily: "'Lucida Calligraphy', cursive" },
];

const serifTags = [
  { label: "All", style: "normal", fontFamily: "'Georgia', serif" },
  { label: "Transitional", style: "normal", fontFamily: "'Times New Roman', serif" },
  { label: "Slab", style: "normal", fontFamily: "'Rockwell', serif" },
  { label: "Old Style", style: "normal", fontFamily: "'Palatino Linotype', serif" },
  { label: "Modern", style: "normal", fontFamily: "'Didot', serif" },
  { label: "Humanist", style: "bold", fontFamily: "'Palatino Linotype', serif" },
  { label: "Scotch", style: "normal", fontFamily: "'Georgia', serif" },
  { label: "Fatface", style: "bold", fontFamily: "'Bodoni MT Black', serif" },
  { label: "Didone", style: "normal", fontFamily: "'Didot', serif" },
];

const sansSerifTags = [
  { label: "All", style: "normal", fontFamily: "'Arial', sans-serif" },
  { label: "Humanist", style: "bold", fontFamily: "'Verdana', sans-serif" },
  { label: "Geometric", style: "normal", fontFamily: "'Futura', sans-serif" },
  { label: "Neo Grotesque", style: "normal", fontFamily: "'Helvetica', sans-serif" },
  { label: "Rounded", style: "normal", fontFamily: "'Arial Rounded MT Bold', sans-serif" },
  { label: "Superellipse", style: "normal", fontFamily: "'Segoe UI', sans-serif" },
  { label: "Grotesque", style: "bold", fontFamily: "'Franklin Gothic', sans-serif" },
  { label: "Glyphic", style: "normal", fontFamily: "'Optima', sans-serif" },
];

const technologyTags = [
  { label: "Variable", style: "normal", fontFamily: "'Segoe UI', sans-serif" },
  { label: "Color", style: "color", fontFamily: "'Segoe UI Emoji', sans-serif" },
  { label: "None", style: "normal", fontFamily: "'Arial', sans-serif" },
];

const seasonalTags = [
  { label: "Lunar New Year", style: "normal", fontFamily: "'SimSun', serif" },
  { label: "Valentine's", style: "italic", fontFamily: "'Brush Script MT', cursive" },
  { label: "Holi", style: "colorful", fontFamily: "'Arial Black', sans-serif" },
  { label: "Halloween", style: "uppercase", fontFamily: "'Chiller', fantasy" },
  { label: "Diwali", style: "normal", fontFamily: "'Devanagari MT', serif" },
  { label: "Christmas", style: "bold", fontFamily: "'Brush Script MT', cursive" },
  { label: "Hanukkah", style: "italic", fontFamily: "'Times New Roman', serif" },
  { label: "Kwanzaa", style: "bold", fontFamily: "'Impact', sans-serif" },
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
  tags: { label: string; style: string; fontFamily: string }[]; 
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
        <div className="grid grid-cols-2 gap-2">
          {tags.map((tag) => (
            <button
              key={tag.label}
              onClick={() => onToggle(tag.label)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors text-center ${
                selectedTags.includes(tag.label)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted border-border text-foreground hover:border-primary'
              }`}
              style={{ fontFamily: tag.fontFamily }}
            >
              {selectedTags.includes(tag.label) && "✓ "}
              <span className={getTagStyle(tag.style)}>{tag.label}</span>
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
