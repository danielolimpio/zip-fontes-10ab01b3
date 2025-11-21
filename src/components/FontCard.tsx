import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface FontCardProps {
  name: string;
  category: string;
  downloads: number;
  previewText: string;
  fontFamily: string;
}

export const FontCard = ({ name, category, downloads, previewText, fontFamily }: FontCardProps) => {
  return (
    <Card className="p-6 hover:shadow-card-hover transition-all duration-200 bg-card border-border">
      <div className="space-y-4">
        <div 
          className="text-4xl text-foreground truncate"
          style={{ fontFamily: fontFamily }}
        >
          {previewText}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{category}</p>
          </div>
          
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Download className="w-4 h-4 mr-2" />
            Baixar
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground">
          {downloads.toLocaleString('pt-BR')} downloads
        </div>
      </div>
    </Card>
  );
};
