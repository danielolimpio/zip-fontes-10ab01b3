import { Type, Package, Smile, Palette, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export interface StatsData {
  fonts: number;
  icons: number;
  emojis: number;
  colors: number;
  instaStyles: number;
}

interface StatsCardsProps {
  stats: StatsData;
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const cards = [
    {
      icon: Type,
      title: "Fontes",
      count: stats.fonts,
      subtitle: "Google Fonts",
      href: "/",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Package,
      title: "Ícones",
      count: stats.icons,
      subtitle: "Lucide Icons",
      href: "/icons",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: Smile,
      title: "Emojis",
      count: stats.emojis,
      subtitle: "Unicode Emojis",
      href: "/emojis",
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      icon: Palette,
      title: "Cores",
      count: stats.colors,
      subtitle: "Material Design",
      href: "/colors",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Sparkles,
      title: "Estilos Insta",
      count: stats.instaStyles,
      subtitle: "Unicode Styles",
      href: "/insta-fonts",
      color: "text-pink-500",
      bgColor: "bg-pink-50",
    },
  ];

  return (
    <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
      {cards.map((card) => (
        <Link
          key={card.title}
          to={card.href}
          className="flex items-center gap-3 p-4 border border-border rounded-xl min-w-[180px] hover:bg-muted/50 cursor-pointer transition-all hover:border-primary/30 hover:shadow-sm group"
        >
          <div className={`w-10 h-10 ${card.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <card.icon className={`w-5 h-5 ${card.color}`} />
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">{card.count.toLocaleString('pt-BR')}</p>
            <p className="text-xs text-muted-foreground">{card.subtitle}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
