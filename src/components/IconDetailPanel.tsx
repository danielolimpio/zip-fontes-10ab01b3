import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Share2, RotateCcw, Minus, Plus, Download } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import type { LucideIcon } from "lucide-react";

interface IconDetailPanelProps {
  icon: { name: string; Icon: LucideIcon };
  iconSize: number;
  onIconSizeChange: (size: number) => void;
  iconColor: string;
  onIconColorChange: (color: string) => void;
  onClose: () => void;
}

export const IconDetailPanel = ({
  icon,
  iconSize,
  onIconSizeChange,
  iconColor,
  onIconColorChange,
  onClose,
}: IconDetailPanelProps) => {
  const [activeTab, setActiveTab] = useState<"web" | "android" | "apple">("web");
  const svgRef = useRef<HTMLDivElement>(null);

  // Generate keywords from icon name
  const keywords = icon.name.toLowerCase().split(' ').filter(word => word.length > 2);
  const additionalKeywords = ["icon", "symbol", "ui", "interface"];
  const allKeywords = [...keywords, ...additionalKeywords.slice(0, 3)];

  const handleDownloadSVG = useCallback(() => {
    const svgElement = svgRef.current?.querySelector('svg');
    if (!svgElement) return;

    // Clone the SVG and set attributes
    const clonedSvg = svgElement.cloneNode(true) as SVGElement;
    clonedSvg.setAttribute('width', String(iconSize));
    clonedSvg.setAttribute('height', String(iconSize));
    clonedSvg.setAttribute('stroke', iconColor);

    const svgData = new XMLSerializer().serializeToString(clonedSvg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${icon.name.replace(/\s+/g, '-').toLowerCase()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [icon.name, iconSize, iconColor]);

  const handleDownloadPNG = useCallback(() => {
    const svgElement = svgRef.current?.querySelector('svg');
    if (!svgElement) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (2x for better quality)
    const scale = 2;
    canvas.width = iconSize * scale;
    canvas.height = iconSize * scale;

    // Clone and prepare SVG
    const clonedSvg = svgElement.cloneNode(true) as SVGElement;
    clonedSvg.setAttribute('width', String(iconSize * scale));
    clonedSvg.setAttribute('height', String(iconSize * scale));
    clonedSvg.setAttribute('stroke', iconColor);

    const svgData = new XMLSerializer().serializeToString(clonedSvg);
    const img = new Image();
    
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${icon.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  }, [icon.name, iconSize, iconColor]);

  return (
    <aside className="w-[320px] min-w-[320px] border-l border-border bg-background h-screen overflow-y-auto sticky top-0">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
        </div>
        <X 
          className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground" 
          onClick={onClose}
        />
      </div>

      <div className="p-4">
        {/* Icon Name */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">{icon.name}</h2>
          <RotateCcw className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
        </div>

        {/* Size Control */}
        <div className="mb-4">
          <label className="text-sm text-muted-foreground mb-2 block">Size</label>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => onIconSizeChange(Math.max(12, iconSize - 4))}
            >
              <Minus className="w-3 h-3" />
            </Button>
            <Input
              type="number"
              value={iconSize}
              onChange={(e) => onIconSizeChange(Number(e.target.value))}
              className="w-16 h-8 text-center"
            />
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => onIconSizeChange(Math.min(200, iconSize + 4))}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Icon Preview */}
        <div 
          ref={svgRef}
          className="w-full aspect-square bg-muted/30 rounded-lg flex items-center justify-center mb-4 border border-border"
        >
          <icon.Icon 
            size={Math.min(iconSize * 2, 120)} 
            color={iconColor}
            strokeWidth={1.5}
          />
        </div>

        {/* Color Control */}
        <div className="mb-6">
          <label className="text-sm text-muted-foreground mb-2 block">Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={iconColor}
              onChange={(e) => onIconColorChange(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-0"
            />
            <Input
              type="text"
              value={iconColor}
              onChange={(e) => onIconColorChange(e.target.value)}
              className="flex-1 h-8 font-mono text-sm"
            />
          </div>
        </div>

        {/* Keywords */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground">
            {allKeywords.join(', ')}...
          </p>
          <button className="text-xs text-primary hover:underline mt-1">Show more</button>
        </div>

        {/* Download Buttons */}
        <div className="flex gap-2 mb-6">
          <Button 
            onClick={handleDownloadSVG}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Download className="w-4 h-4 mr-2" />
            SVG
          </Button>
          <Button 
            onClick={handleDownloadPNG}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Download className="w-4 h-4 mr-2" />
            PNG
          </Button>
        </div>

        {/* Platform Tabs */}
        <div className="flex border-b border-border mb-4">
          {(["web", "android", "apple"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-medium capitalize transition-colors ${
                activeTab === tab 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === "web" ? "Web" : tab === "android" ? "Android" : "Apple"}
            </button>
          ))}
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Instructions</h4>
            <p className="text-xs text-muted-foreground">
              Download the icon in your preferred format (SVG or PNG) and use it in your project.
            </p>
          </div>

          {activeTab === "web" && (
            <div>
              <h4 className="text-sm font-medium mb-2">Usage</h4>
              <div className="bg-muted p-3 rounded-md">
                <code className="text-xs text-foreground break-all">
                  {`import { ${icon.name.replace(/\s+/g, '')} } from 'lucide-react';`}
                </code>
              </div>
            </div>
          )}

          {activeTab === "android" && (
            <div>
              <h4 className="text-sm font-medium mb-2">Android</h4>
              <p className="text-xs text-muted-foreground">
                Place the SVG in your drawable folder or use Android Vector Drawable.
              </p>
            </div>
          )}

          {activeTab === "apple" && (
            <div>
              <h4 className="text-sm font-medium mb-2">iOS/macOS</h4>
              <p className="text-xs text-muted-foreground">
                Add the icon to your Asset Catalog as an Image Set.
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
