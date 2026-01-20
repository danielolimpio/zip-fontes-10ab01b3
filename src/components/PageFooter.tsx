import zipFontesLogo from "@/assets/zip-fontes-logo.png";

export const PageFooter = () => {
  return (
    <footer className="bg-muted/30 border-t border-border py-8 mt-auto">
      <div className="px-6 text-center">
        {/* Logo centralizada */}
        <div className="flex justify-center mb-6">
          <a href="/">
            <img src={zipFontesLogo} alt="Zip Fontes" className="h-10" />
          </a>
        </div>
        
        {/* Políticas legais */}
        <div className="flex items-center justify-center gap-4 mb-3">
          <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Ajuda e suporte
          </a>
          <span className="text-muted-foreground">|</span>
          <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Privacidade e cookies
          </a>
          <span className="text-muted-foreground">|</span>
          <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Contate-nos
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2006-2025 Zip Fontes. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
