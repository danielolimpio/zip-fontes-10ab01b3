import { Download, Heart } from "lucide-react";

interface FontCardProps {
  name: string;
  category: string;
  author: string;
  previewText: string;
  fontFamily: string;
}

export const FontCard = ({ name, category, author, previewText, fontFamily }: FontCardProps) => {
  return (
    <div className="bg-card border border-gray-200 rounded-lg p-5 hover:shadow-card-hover transition-all duration-200">
      {/* Font Preview */}
      <div 
        className="text-[64px] text-foreground mb-4 leading-tight overflow-hidden"
        style={{ fontFamily: fontFamily }}
      >
        {previewText}
      </div>
      
      {/* Font Info */}
      <div className="flex items-start justify-between">
        <div>
          <a href="#" className="text-sm font-bold text-primary hover:underline">
            {name}
          </a>
          <p className="text-xs text-gray-600 mt-1">
            por {author} em {category}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-foreground transition-colors">
            <Download className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-primary transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
