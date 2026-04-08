import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IconsPage from "./pages/IconsPage";
import EmojisPage from "./pages/EmojisPage";
import InstaFontsPage from "./pages/InstaFontsPage";
import ColorsPage from "./pages/ColorsPage";
import FaqPage from "./pages/FaqPage";
import ContatoPage from "./pages/ContatoPage";
import PrivacidadePage from "./pages/PrivacidadePage";
import CookiesPage from "./pages/CookiesPage";
import TermosPage from "./pages/TermosPage";
import AjudaPage from "./pages/AjudaPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/icons" element={<IconsPage />} />
          <Route path="/emojis" element={<EmojisPage />} />
          <Route path="/insta-fonts" element={<InstaFontsPage />} />
          <Route path="/colors" element={<ColorsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/privacidade" element={<PrivacidadePage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/termos" element={<TermosPage />} />
          <Route path="/ajuda" element={<AjudaPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
