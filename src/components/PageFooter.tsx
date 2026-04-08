import { Link } from "react-router-dom";
import zipFontesLogo from "@/assets/zip-fontes-logo.png";

export const PageFooter = () => {
  return (
    <footer className="bg-muted/30 border-t border-border py-8 mt-auto">
      <div className="px-6 text-center">
        {/* Logo centralizada */}
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img src={zipFontesLogo} alt="Zip Fontes" className="h-10" />
          </Link>
        </div>
        
        {/* Links institucionais */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-3">
          <Link to="/faq" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            FAQ
          </Link>
          <span className="text-muted-foreground">|</span>
          <Link to="/ajuda" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Ajuda e Suporte
          </Link>
          <span className="text-muted-foreground">|</span>
          <Link to="/contato" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Contato
          </Link>
          <span className="text-muted-foreground">|</span>
          <Link to="/privacidade" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Política de Privacidade
          </Link>
          <span className="text-muted-foreground">|</span>
          <Link to="/cookies" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Política de Cookies
          </Link>
          <span className="text-muted-foreground">|</span>
          <Link to="/termos" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Termos de Uso
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2006-2025 Zip Fontes. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
