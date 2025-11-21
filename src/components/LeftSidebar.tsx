import { Heart, Zap, Gem, Dices, Folder, ChevronDown, Globe, Moon } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { icon: Heart, label: "Minhas fontes favoritas", href: "#favorites" },
  { icon: Zap, label: "Novas fontes", href: "#new" },
  { icon: Gem, label: "Fontes populares", href: "#popular" },
  { icon: Dices, label: "Fontes aleatórias", href: "#random" },
];

const categories = [
  "Alfabética",
  "Estilos de fontes",
  "Tipo de funções",
];

export const LeftSidebar = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <aside className="fixed left-0 top-[60px] bottom-0 w-[250px] bg-sidebar-dark text-white overflow-y-auto">
      <nav className="py-4">
        {/* Main Menu Items */}
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center gap-3 px-5 py-3 hover:bg-sidebar-dark-hover transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </a>
        ))}
        
        {/* Divider */}
        <div className="my-2 mx-5 border-t border-sidebar-dark-hover" />
        
        {/* Categories */}
        <div>
          <button
            onClick={() => setCategoriesOpen(!categoriesOpen)}
            className="flex items-center justify-between w-full px-5 py-3 hover:bg-sidebar-dark-hover transition-colors"
          >
            <div className="flex items-center gap-3">
              <Folder className="w-5 h-5" />
              <span className="text-sm">Categorias</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {categoriesOpen && (
            <div className="bg-sidebar-dark-hover/50">
              {categories.map((category, index) => (
                <a
                  key={index}
                  href="#"
                  className="block px-12 py-2 text-sm hover:bg-sidebar-dark-hover transition-colors"
                >
                  {category}
                </a>
              ))}
            </div>
          )}
        </div>
        
        {/* Divider */}
        <div className="my-2 mx-5 border-t border-sidebar-dark-hover" />
        
        {/* Language */}
        <a
          href="#"
          className="flex items-center gap-3 px-5 py-3 hover:bg-sidebar-dark-hover transition-colors"
        >
          <Globe className="w-5 h-5" />
          <span className="text-sm">Idioma</span>
        </a>
        
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center justify-between w-full px-5 py-3 hover:bg-sidebar-dark-hover transition-colors"
        >
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5" />
            <span className="text-sm">Modo escuro</span>
          </div>
          <div className={`w-10 h-5 rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-gray-600'}`}>
            <div className={`w-4 h-4 bg-white rounded-full transition-transform mt-0.5 ${darkMode ? 'translate-x-5 ml-0.5' : 'translate-x-0.5'}`} />
          </div>
        </button>
      </nav>
    </aside>
  );
};
