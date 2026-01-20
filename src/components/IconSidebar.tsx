import { Type, Globe, Grid3X3, BookOpen, HelpCircle, Moon } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const menuItems = [
  { icon: Type, label: "Fonts", href: "#fonts", active: true },
  { icon: Globe, label: "Noto", href: "#noto" },
  { icon: Grid3X3, label: "Icons", href: "#icons" },
  { icon: BookOpen, label: "Knowledge", href: "#knowledge" },
  { icon: HelpCircle, label: "FAQ", href: "#faq" },
];

export const IconSidebar = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-16 bg-white border-r border-border flex flex-col items-center py-4 z-50">
      {/* Logo */}
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl mb-6">
        A
      </div>
      
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-2 flex-1">
          {menuItems.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <a
                  href={item.href}
                  className={`w-10 h-10 flex flex-col items-center justify-center rounded-lg transition-colors ${
                    item.active 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5">{item.label}</span>
                </a>
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
              className="w-10 h-10 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Moon className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            Modo escuro
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </aside>
  );
};
