import { useState } from "react";
import { IconSidebar } from "@/components/IconSidebar";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

// Paletas de cores organizadas
const colorPalettes = [
  {
    name: "Vermelho",
    colors: [
      { name: "Red 50", hex: "#FFEBEE", textDark: true },
      { name: "Red 100", hex: "#FFCDD2", textDark: true },
      { name: "Red 200", hex: "#EF9A9A", textDark: true },
      { name: "Red 300", hex: "#E57373", textDark: true },
      { name: "Red 400", hex: "#EF5350", textDark: false },
      { name: "Red 500", hex: "#F44336", textDark: false },
      { name: "Red 600", hex: "#E53935", textDark: false },
      { name: "Red 700", hex: "#D32F2F", textDark: false },
      { name: "Red 800", hex: "#C62828", textDark: false },
      { name: "Red 900", hex: "#B71C1C", textDark: false },
    ]
  },
  {
    name: "Rosa",
    colors: [
      { name: "Pink 50", hex: "#FCE4EC", textDark: true },
      { name: "Pink 100", hex: "#F8BBD9", textDark: true },
      { name: "Pink 200", hex: "#F48FB1", textDark: true },
      { name: "Pink 300", hex: "#F06292", textDark: true },
      { name: "Pink 400", hex: "#EC407A", textDark: false },
      { name: "Pink 500", hex: "#E91E63", textDark: false },
      { name: "Pink 600", hex: "#D81B60", textDark: false },
      { name: "Pink 700", hex: "#C2185B", textDark: false },
      { name: "Pink 800", hex: "#AD1457", textDark: false },
      { name: "Pink 900", hex: "#880E4F", textDark: false },
    ]
  },
  {
    name: "Roxo",
    colors: [
      { name: "Purple 50", hex: "#F3E5F5", textDark: true },
      { name: "Purple 100", hex: "#E1BEE7", textDark: true },
      { name: "Purple 200", hex: "#CE93D8", textDark: true },
      { name: "Purple 300", hex: "#BA68C8", textDark: true },
      { name: "Purple 400", hex: "#AB47BC", textDark: false },
      { name: "Purple 500", hex: "#9C27B0", textDark: false },
      { name: "Purple 600", hex: "#8E24AA", textDark: false },
      { name: "Purple 700", hex: "#7B1FA2", textDark: false },
      { name: "Purple 800", hex: "#6A1B9A", textDark: false },
      { name: "Purple 900", hex: "#4A148C", textDark: false },
    ]
  },
  {
    name: "Azul Profundo",
    colors: [
      { name: "Deep Purple 50", hex: "#EDE7F6", textDark: true },
      { name: "Deep Purple 100", hex: "#D1C4E9", textDark: true },
      { name: "Deep Purple 200", hex: "#B39DDB", textDark: true },
      { name: "Deep Purple 300", hex: "#9575CD", textDark: true },
      { name: "Deep Purple 400", hex: "#7E57C2", textDark: false },
      { name: "Deep Purple 500", hex: "#673AB7", textDark: false },
      { name: "Deep Purple 600", hex: "#5E35B1", textDark: false },
      { name: "Deep Purple 700", hex: "#512DA8", textDark: false },
      { name: "Deep Purple 800", hex: "#4527A0", textDark: false },
      { name: "Deep Purple 900", hex: "#311B92", textDark: false },
    ]
  },
  {
    name: "Índigo",
    colors: [
      { name: "Indigo 50", hex: "#E8EAF6", textDark: true },
      { name: "Indigo 100", hex: "#C5CAE9", textDark: true },
      { name: "Indigo 200", hex: "#9FA8DA", textDark: true },
      { name: "Indigo 300", hex: "#7986CB", textDark: true },
      { name: "Indigo 400", hex: "#5C6BC0", textDark: false },
      { name: "Indigo 500", hex: "#3F51B5", textDark: false },
      { name: "Indigo 600", hex: "#3949AB", textDark: false },
      { name: "Indigo 700", hex: "#303F9F", textDark: false },
      { name: "Indigo 800", hex: "#283593", textDark: false },
      { name: "Indigo 900", hex: "#1A237E", textDark: false },
    ]
  },
  {
    name: "Azul",
    colors: [
      { name: "Blue 50", hex: "#E3F2FD", textDark: true },
      { name: "Blue 100", hex: "#BBDEFB", textDark: true },
      { name: "Blue 200", hex: "#90CAF9", textDark: true },
      { name: "Blue 300", hex: "#64B5F6", textDark: true },
      { name: "Blue 400", hex: "#42A5F5", textDark: true },
      { name: "Blue 500", hex: "#2196F3", textDark: false },
      { name: "Blue 600", hex: "#1E88E5", textDark: false },
      { name: "Blue 700", hex: "#1976D2", textDark: false },
      { name: "Blue 800", hex: "#1565C0", textDark: false },
      { name: "Blue 900", hex: "#0D47A1", textDark: false },
    ]
  },
  {
    name: "Azul Claro",
    colors: [
      { name: "Light Blue 50", hex: "#E1F5FE", textDark: true },
      { name: "Light Blue 100", hex: "#B3E5FC", textDark: true },
      { name: "Light Blue 200", hex: "#81D4FA", textDark: true },
      { name: "Light Blue 300", hex: "#4FC3F7", textDark: true },
      { name: "Light Blue 400", hex: "#29B6F6", textDark: true },
      { name: "Light Blue 500", hex: "#03A9F4", textDark: true },
      { name: "Light Blue 600", hex: "#039BE5", textDark: false },
      { name: "Light Blue 700", hex: "#0288D1", textDark: false },
      { name: "Light Blue 800", hex: "#0277BD", textDark: false },
      { name: "Light Blue 900", hex: "#01579B", textDark: false },
    ]
  },
  {
    name: "Ciano",
    colors: [
      { name: "Cyan 50", hex: "#E0F7FA", textDark: true },
      { name: "Cyan 100", hex: "#B2EBF2", textDark: true },
      { name: "Cyan 200", hex: "#80DEEA", textDark: true },
      { name: "Cyan 300", hex: "#4DD0E1", textDark: true },
      { name: "Cyan 400", hex: "#26C6DA", textDark: true },
      { name: "Cyan 500", hex: "#00BCD4", textDark: true },
      { name: "Cyan 600", hex: "#00ACC1", textDark: false },
      { name: "Cyan 700", hex: "#0097A7", textDark: false },
      { name: "Cyan 800", hex: "#00838F", textDark: false },
      { name: "Cyan 900", hex: "#006064", textDark: false },
    ]
  },
  {
    name: "Teal",
    colors: [
      { name: "Teal 50", hex: "#E0F2F1", textDark: true },
      { name: "Teal 100", hex: "#B2DFDB", textDark: true },
      { name: "Teal 200", hex: "#80CBC4", textDark: true },
      { name: "Teal 300", hex: "#4DB6AC", textDark: true },
      { name: "Teal 400", hex: "#26A69A", textDark: true },
      { name: "Teal 500", hex: "#009688", textDark: false },
      { name: "Teal 600", hex: "#00897B", textDark: false },
      { name: "Teal 700", hex: "#00796B", textDark: false },
      { name: "Teal 800", hex: "#00695C", textDark: false },
      { name: "Teal 900", hex: "#004D40", textDark: false },
    ]
  },
  {
    name: "Verde",
    colors: [
      { name: "Green 50", hex: "#E8F5E9", textDark: true },
      { name: "Green 100", hex: "#C8E6C9", textDark: true },
      { name: "Green 200", hex: "#A5D6A7", textDark: true },
      { name: "Green 300", hex: "#81C784", textDark: true },
      { name: "Green 400", hex: "#66BB6A", textDark: true },
      { name: "Green 500", hex: "#4CAF50", textDark: true },
      { name: "Green 600", hex: "#43A047", textDark: false },
      { name: "Green 700", hex: "#388E3C", textDark: false },
      { name: "Green 800", hex: "#2E7D32", textDark: false },
      { name: "Green 900", hex: "#1B5E20", textDark: false },
    ]
  },
  {
    name: "Verde Claro",
    colors: [
      { name: "Light Green 50", hex: "#F1F8E9", textDark: true },
      { name: "Light Green 100", hex: "#DCEDC8", textDark: true },
      { name: "Light Green 200", hex: "#C5E1A5", textDark: true },
      { name: "Light Green 300", hex: "#AED581", textDark: true },
      { name: "Light Green 400", hex: "#9CCC65", textDark: true },
      { name: "Light Green 500", hex: "#8BC34A", textDark: true },
      { name: "Light Green 600", hex: "#7CB342", textDark: true },
      { name: "Light Green 700", hex: "#689F38", textDark: false },
      { name: "Light Green 800", hex: "#558B2F", textDark: false },
      { name: "Light Green 900", hex: "#33691E", textDark: false },
    ]
  },
  {
    name: "Lima",
    colors: [
      { name: "Lime 50", hex: "#F9FBE7", textDark: true },
      { name: "Lime 100", hex: "#F0F4C3", textDark: true },
      { name: "Lime 200", hex: "#E6EE9C", textDark: true },
      { name: "Lime 300", hex: "#DCE775", textDark: true },
      { name: "Lime 400", hex: "#D4E157", textDark: true },
      { name: "Lime 500", hex: "#CDDC39", textDark: true },
      { name: "Lime 600", hex: "#C0CA33", textDark: true },
      { name: "Lime 700", hex: "#AFB42B", textDark: true },
      { name: "Lime 800", hex: "#9E9D24", textDark: true },
      { name: "Lime 900", hex: "#827717", textDark: false },
    ]
  },
  {
    name: "Amarelo",
    colors: [
      { name: "Yellow 50", hex: "#FFFDE7", textDark: true },
      { name: "Yellow 100", hex: "#FFF9C4", textDark: true },
      { name: "Yellow 200", hex: "#FFF59D", textDark: true },
      { name: "Yellow 300", hex: "#FFF176", textDark: true },
      { name: "Yellow 400", hex: "#FFEE58", textDark: true },
      { name: "Yellow 500", hex: "#FFEB3B", textDark: true },
      { name: "Yellow 600", hex: "#FDD835", textDark: true },
      { name: "Yellow 700", hex: "#FBC02D", textDark: true },
      { name: "Yellow 800", hex: "#F9A825", textDark: true },
      { name: "Yellow 900", hex: "#F57F17", textDark: true },
    ]
  },
  {
    name: "Âmbar",
    colors: [
      { name: "Amber 50", hex: "#FFF8E1", textDark: true },
      { name: "Amber 100", hex: "#FFECB3", textDark: true },
      { name: "Amber 200", hex: "#FFE082", textDark: true },
      { name: "Amber 300", hex: "#FFD54F", textDark: true },
      { name: "Amber 400", hex: "#FFCA28", textDark: true },
      { name: "Amber 500", hex: "#FFC107", textDark: true },
      { name: "Amber 600", hex: "#FFB300", textDark: true },
      { name: "Amber 700", hex: "#FFA000", textDark: true },
      { name: "Amber 800", hex: "#FF8F00", textDark: true },
      { name: "Amber 900", hex: "#FF6F00", textDark: true },
    ]
  },
  {
    name: "Laranja",
    colors: [
      { name: "Orange 50", hex: "#FFF3E0", textDark: true },
      { name: "Orange 100", hex: "#FFE0B2", textDark: true },
      { name: "Orange 200", hex: "#FFCC80", textDark: true },
      { name: "Orange 300", hex: "#FFB74D", textDark: true },
      { name: "Orange 400", hex: "#FFA726", textDark: true },
      { name: "Orange 500", hex: "#FF9800", textDark: true },
      { name: "Orange 600", hex: "#FB8C00", textDark: true },
      { name: "Orange 700", hex: "#F57C00", textDark: true },
      { name: "Orange 800", hex: "#EF6C00", textDark: false },
      { name: "Orange 900", hex: "#E65100", textDark: false },
    ]
  },
  {
    name: "Laranja Escuro",
    colors: [
      { name: "Deep Orange 50", hex: "#FBE9E7", textDark: true },
      { name: "Deep Orange 100", hex: "#FFCCBC", textDark: true },
      { name: "Deep Orange 200", hex: "#FFAB91", textDark: true },
      { name: "Deep Orange 300", hex: "#FF8A65", textDark: true },
      { name: "Deep Orange 400", hex: "#FF7043", textDark: true },
      { name: "Deep Orange 500", hex: "#FF5722", textDark: false },
      { name: "Deep Orange 600", hex: "#F4511E", textDark: false },
      { name: "Deep Orange 700", hex: "#E64A19", textDark: false },
      { name: "Deep Orange 800", hex: "#D84315", textDark: false },
      { name: "Deep Orange 900", hex: "#BF360C", textDark: false },
    ]
  },
  {
    name: "Marrom",
    colors: [
      { name: "Brown 50", hex: "#EFEBE9", textDark: true },
      { name: "Brown 100", hex: "#D7CCC8", textDark: true },
      { name: "Brown 200", hex: "#BCAAA4", textDark: true },
      { name: "Brown 300", hex: "#A1887F", textDark: true },
      { name: "Brown 400", hex: "#8D6E63", textDark: false },
      { name: "Brown 500", hex: "#795548", textDark: false },
      { name: "Brown 600", hex: "#6D4C41", textDark: false },
      { name: "Brown 700", hex: "#5D4037", textDark: false },
      { name: "Brown 800", hex: "#4E342E", textDark: false },
      { name: "Brown 900", hex: "#3E2723", textDark: false },
    ]
  },
  {
    name: "Cinza",
    colors: [
      { name: "Grey 50", hex: "#FAFAFA", textDark: true },
      { name: "Grey 100", hex: "#F5F5F5", textDark: true },
      { name: "Grey 200", hex: "#EEEEEE", textDark: true },
      { name: "Grey 300", hex: "#E0E0E0", textDark: true },
      { name: "Grey 400", hex: "#BDBDBD", textDark: true },
      { name: "Grey 500", hex: "#9E9E9E", textDark: true },
      { name: "Grey 600", hex: "#757575", textDark: false },
      { name: "Grey 700", hex: "#616161", textDark: false },
      { name: "Grey 800", hex: "#424242", textDark: false },
      { name: "Grey 900", hex: "#212121", textDark: false },
    ]
  },
  {
    name: "Cinza Azulado",
    colors: [
      { name: "Blue Grey 50", hex: "#ECEFF1", textDark: true },
      { name: "Blue Grey 100", hex: "#CFD8DC", textDark: true },
      { name: "Blue Grey 200", hex: "#B0BEC5", textDark: true },
      { name: "Blue Grey 300", hex: "#90A4AE", textDark: true },
      { name: "Blue Grey 400", hex: "#78909C", textDark: true },
      { name: "Blue Grey 500", hex: "#607D8B", textDark: false },
      { name: "Blue Grey 600", hex: "#546E7A", textDark: false },
      { name: "Blue Grey 700", hex: "#455A64", textDark: false },
      { name: "Blue Grey 800", hex: "#37474F", textDark: false },
      { name: "Blue Grey 900", hex: "#263238", textDark: false },
    ]
  },
];

const ColorsPage = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    toast.success(`Cor ${hex} copiada!`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const filteredPalettes = colorPalettes.filter(palette =>
    palette.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    palette.colors.some(color => 
      color.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      color.hex.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Icon Sidebar */}
      <IconSidebar />
      
      {/* Main Layout */}
      <div className="ml-20 flex min-h-screen">
        {/* Filter/Config Panel - w-72 padronizado */}
        <aside className="w-72 border-r border-border bg-background p-6 flex-shrink-0">
          <h2 className="text-sm font-semibold text-foreground mb-4">Configurações</h2>
          
          {/* Search dentro do painel */}
          <div className="mb-6">
            <label className="text-xs text-muted-foreground mb-2 block">Buscar cor</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nome ou código hex..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-muted rounded-lg text-sm border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-2">
              <strong className="text-foreground">{colorPalettes.length}</strong> paletas disponíveis
            </p>
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">{colorPalettes.reduce((acc, p) => acc + p.colors.length, 0)}</strong> cores no total
            </p>
          </div>
          
          <div className="mt-6 p-4 bg-primary/5 rounded-lg">
            <p className="text-xs text-muted-foreground">
              💡 Clique em qualquer cor para copiar o código hexadecimal
            </p>
          </div>
        </aside>
        
        {/* Main Content Area */}
        <main className="flex-1 min-h-screen bg-background flex flex-col">
          {/* Header padronizado */}
          <PageHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Buscar cores..."
            rightContent={
              <span className="text-sm text-muted-foreground">
                {filteredPalettes.length} paletas encontradas
              </span>
            }
          />
          
          {/* Color Palettes Grid */}
          <div className="p-6 flex-1">
            <div className="grid gap-8">
              {filteredPalettes.map((palette) => (
                <div key={palette.name} className="space-y-3">
                  <h2 className="text-lg font-medium text-foreground">{palette.name}</h2>
                  <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                    {palette.colors.map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => copyToClipboard(color.hex)}
                        className="group relative aspect-square rounded-lg transition-all hover:scale-105 hover:shadow-lg"
                        style={{ backgroundColor: color.hex }}
                        title={`${color.name}: ${color.hex}`}
                      >
                        {/* Copy indicator */}
                        <div className={`absolute inset-0 flex items-center justify-center rounded-lg transition-opacity ${
                          copiedColor === color.hex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}>
                          {copiedColor === color.hex ? (
                            <Check className={`w-5 h-5 ${color.textDark ? 'text-green-700' : 'text-green-300'}`} />
                          ) : (
                            <Copy className={`w-4 h-4 ${color.textDark ? 'text-gray-700' : 'text-white'}`} />
                          )}
                        </div>
                        
                        {/* Color info on hover */}
                        <div className={`absolute bottom-0 left-0 right-0 p-1.5 text-center opacity-0 group-hover:opacity-100 transition-opacity ${
                          color.textDark ? 'text-gray-800' : 'text-white'
                        }`}>
                          <p className="text-[8px] font-medium leading-tight">{color.hex}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {filteredPalettes.length === 0 && (
              <div className="text-center py-16">
                <span className="text-6xl mb-4 block">🎨</span>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Nenhuma paleta encontrada
                </h3>
                <p className="text-muted-foreground">
                  Tente buscar por outro nome ou código hex.
                </p>
              </div>
            )}
          </div>
          
          {/* Footer padronizado */}
          <PageFooter />
        </main>
      </div>
    </div>
  );
};

export default ColorsPage;
