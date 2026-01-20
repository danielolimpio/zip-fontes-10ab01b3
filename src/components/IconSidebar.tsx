import { Type, Grid3X3, HelpCircle, Moon, Sun, Instagram, Smile } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const menuItems = [
  { icon: Type, label: "Fonts", href: "/" },
  { icon: Grid3X3, label: "Icons", href: "/icons" },
  { icon: Smile, label: "Emojis", href: "/emojis" },
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
    <aside className="fixed left-0 top-0 bottom-0 w-16 bg-background border-r border-border flex flex-col items-center py-4 z-50">
      {/* Logo */}
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl mb-6">
        A
      </div>
      
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-2 flex-1">
          {menuItems.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => navigate(item.href)}
                  className={`w-10 h-10 flex flex-col items-center justify-center rounded-lg transition-colors ${
                    isActive(item) 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <item.icon className={'largeIcon' in item && item.largeIcon ? "w-6 h-6" : "w-5 h-5"} />
                  <span className="text-[10px] mt-0.5">{item.label}</span>
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
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                darkMode 
                  ? 'text-yellow-400 bg-yellow-400/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
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
