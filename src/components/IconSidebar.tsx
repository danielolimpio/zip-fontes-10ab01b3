import { Type, Grid3X3, HelpCircle, Moon, Sun, Instagram, Smile, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import faviconImg from "@/assets/favicon.png";

const menuItems = [
  { icon: Type, label: "Fonts", href: "/" },
  { icon: Grid3X3, label: "Icons", href: "/icons" },
  { icon: Smile, label: "Emojis", href: "/emojis" },
  { icon: Palette, label: "Cores", href: "/colors", colorful: true },
  { icon: Instagram, label: "Insta", href: "/insta-fonts", largeIcon: true },
  { icon: HelpCircle, label: "FAQ", href: "/faq" },
];

interface IconSidebarProps {
  activeItem?: string;
}

export const IconSidebar = ({ activeItem }: IconSidebarProps) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('darkMode');
      if (stored !== null) return stored === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);
  
  const isActive = (item: typeof menuItems[0]) => {
    if (activeItem) return item.label === activeItem;
    return location.pathname === item.href;
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-20 bg-background border-r border-border flex flex-col items-center py-6 z-50">
      {/* Logo */}
      <div className="w-12 h-12 flex items-center justify-center mb-8">
        <img src={faviconImg} alt="Zip Fontes" className="w-full h-full object-contain" />
      </div>
      
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-3 flex-1">
          {menuItems.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => navigate(item.href)}
                  className={`w-16 h-16 flex flex-col items-center justify-center rounded-xl transition-colors ${
                    isActive(item) 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {'colorful' in item && item.colorful ? (
                    <item.icon className="w-6 h-6" style={{ color: isActive(item) ? undefined : '#E91E63' }} />
                  ) : (
                    <item.icon className={'largeIcon' in item && item.largeIcon ? "w-7 h-7" : "w-6 h-6"} />
                  )}
                  <span className="text-xs mt-1.5 font-medium">{item.label}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {item.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
        
        {/* Dark Mode Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${
                darkMode 
                  ? 'text-yellow-400 bg-yellow-400/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            {darkMode ? 'Modo claro' : 'Modo escuro'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </aside>
  );
};
