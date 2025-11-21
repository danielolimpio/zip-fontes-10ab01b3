import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";

const categories = [
  "Serif",
  "Sans Serif",
  "Script",
  "Display",
  "Handwriting",
  "Monospace",
];

const styles = [
  "Regular",
  "Bold",
  "Italic",
  "Light",
  "Thin",
  "Black",
];

interface FilterSidebarProps {
  selectedCategories: string[];
  selectedStyles: string[];
  onCategoryChange: (category: string) => void;
  onStyleChange: (style: string) => void;
}

export const FilterSidebar = ({
  selectedCategories,
  selectedStyles,
  onCategoryChange,
  onStyleChange,
}: FilterSidebarProps) => {
  return (
    <Card className="p-6 bg-card border-border sticky top-6">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-foreground mb-4">Categorias</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => onCategoryChange(category)}
                />
                <Label
                  htmlFor={category}
                  className="text-sm cursor-pointer text-foreground"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border" />

        <div>
          <h3 className="font-semibold text-foreground mb-4">Estilos</h3>
          <div className="space-y-3">
            {styles.map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox
                  id={style}
                  checked={selectedStyles.includes(style)}
                  onCheckedChange={() => onStyleChange(style)}
                />
                <Label
                  htmlFor={style}
                  className="text-sm cursor-pointer text-foreground"
                >
                  {style}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
