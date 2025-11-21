import { Grid, List, Palette, Type, Copy, Share2, Heart } from "lucide-react";
import { Input } from "./ui/input";

interface FilterBarProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  searchText: string;
  onSearchChange: (text: string) => void;
}

export const FilterBar = ({ viewMode, onViewModeChange, searchText, onSearchChange }: FilterBarProps) => {
  return (
    <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-between gap-4 mb-6">
      {/* View Mode */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2 rounded transition-colors ${
            viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Grid className="w-4 h-4" />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-2 rounded transition-colors ${
            viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          <List className="w-4 h-4" />
        </button>
      </div>
      
      {/* Search Input */}
      <div className="flex-1 max-w-xs">
        <Input
          type="text"
          placeholder="TRADEPAR"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-white border-gray-200 text-sm"
        />
      </div>
      
      {/* Tool Buttons */}
      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors" title="Cor">
          <Palette className="w-4 h-4" />
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors" title="Tamanho">
          <Type className="w-4 h-4" />
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors" title="Copiar">
          <Copy className="w-4 h-4" />
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors" title="Compartilhar">
          <Share2 className="w-4 h-4" />
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors" title="Favoritar">
          <Heart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
