import { ReactNode } from "react";
import { IconSidebar } from "./IconSidebar";

interface AppLayoutProps {
  children: ReactNode;
  activeItem?: string;
}

export const AppLayout = ({ children, activeItem }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Icon Sidebar - persiste entre páginas */}
      <IconSidebar activeItem={activeItem} />
      
      {/* Main Layout */}
      <div className="ml-20 flex min-h-screen">
        {children}
      </div>
    </div>
  );
};
