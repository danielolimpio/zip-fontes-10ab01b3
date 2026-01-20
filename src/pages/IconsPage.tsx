import { useState, useMemo } from "react";
import { IconSidebar } from "@/components/IconSidebar";
import { IconFilterPanel } from "@/components/IconFilterPanel";
import { IconDetailPanel } from "@/components/IconDetailPanel";
import { Button } from "@/components/ui/button";
import { X, Search } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Get all available icons from lucide-react
const getIconList = (): { name: string; Icon: LucideIcon }[] => {
  const excludeList = [
    'createLucideIcon',
    'default',
    'icons',
    'createElement',
    'LucideIcon',
    'dynamicIconImports',
  ];
  
  return Object.entries(LucideIcons)
    .filter(([name, component]) => {
      return !excludeList.includes(name) && 
             typeof component === 'object' && 
             component !== null &&
             '$$typeof' in component;
    })
    .map(([name, Icon]) => ({
      name: name.replace(/([A-Z])/g, ' $1').trim(),
      Icon: Icon as LucideIcon,
    }));
};

const allIcons = getIconList();

// Categories
const categories = [
  "All",
  "UI Actions",
  "Navigation",
  "Media",
  "Communication",
  "Files",
  "Charts",
  "Devices",
  "Weather",
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [iconStyle, setIconStyle] = useState<"outlined" | "filled">("outlined");
  const [sortBy, setSortBy] = useState("Most popular");

  // Filter icons based on search
  const filteredIcons = useMemo(() => {
    let icons = allIcons;
    
    if (searchQuery) {
      icons = icons.filter(icon => 
        icon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return icons.slice(0, 200); // Limit for performance
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Icon Sidebar (narrow left) */}
      <IconSidebar activeItem="Icons" />
      
      {/* Main Layout */}
      <div className="ml-16 flex min-h-screen">
        {/* Filter Panel */}
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
            categories={categories}
          />
        )}
        
        {/* Main Content Area */}
        <main className="flex-1 min-h-screen bg-white">
          {/* Header */}
          <div className="sticky top-0 z-40 bg-white border-b border-border">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">⋮⋮</span>
                  <span className="text-xl font-bold text-foreground">Zip Fontes</span>
                </div>
                
                {/* Search */}
                <div className="relative ml-6">
                  <input
                    type="text"
                    placeholder="Search icons"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[300px] px-4 py-2 pl-10 bg-muted rounded-full text-sm border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              
              {/* Right side */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Sort by</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm font-medium bg-transparent border-0 focus:outline-none cursor-pointer"
                >
                  <option>Most popular</option>
                  <option>Name</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="px-6 py-6">
            {/* Filters Button */}
            <div className="mb-6">
              <Button 
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                {showFilters ? <X className="w-4 h-4" /> : null}
                Filters
              </Button>
            </div>
            
            {/* Info Cards */}
            <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
              <div className="flex items-center gap-3 p-4 border border-border rounded-lg min-w-[200px] hover:bg-muted/50 cursor-pointer">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <LucideIcons.BookOpen className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Icon guidelines</p>
                  <p className="text-xs text-muted-foreground">Learn best practices</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border border-border rounded-lg min-w-[200px] hover:bg-muted/50 cursor-pointer">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <LucideIcons.Figma className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Figma plugin</p>
                  <p className="text-xs text-muted-foreground">Use icons in Figma</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border border-border rounded-lg min-w-[200px] hover:bg-muted/50 cursor-pointer">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <LucideIcons.Github className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">GitHub repo</p>
                  <p className="text-xs text-muted-foreground">View source code</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border border-border rounded-lg min-w-[200px] hover:bg-muted/50 cursor-pointer">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <LucideIcons.FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Apache license</p>
                  <p className="text-xs text-muted-foreground">Free for commercial use</p>
                </div>
              </div>
            </div>
            
            {/* Category Label */}
            <h2 className="text-sm font-medium text-muted-foreground mb-4">
              {selectedCategory === "All" ? "All icons" : selectedCategory} 
              <span className="ml-2 text-xs">({filteredIcons.length} icons)</span>
            </h2>
            
            {/* Icons Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1">
              {filteredIcons.map((icon, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIcon(icon)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all hover:bg-muted group ${
                    selectedIcon?.name === icon.name ? 'bg-primary/10 ring-2 ring-primary' : ''
                  }`}
                >
                  <icon.Icon 
                    className="w-6 h-6 mb-2 text-foreground" 
                    strokeWidth={iconStyle === "filled" ? 2.5 : 1.5}
                  />
                  <span className="text-[10px] text-muted-foreground text-center leading-tight line-clamp-2 group-hover:text-foreground">
                    {icon.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
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
