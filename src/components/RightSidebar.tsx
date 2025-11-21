export const RightSidebar = () => {
  const fontSites = [
    "1001 Free Fonts",
    "Free Fonts",
    "The Free Site",
    "Urban Fonts",
  ];

  return (
    <aside className="fixed right-0 top-[60px] bottom-0 w-[300px] bg-gray-100 overflow-y-auto p-6">
      {/* Font Sites Section */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-foreground mb-3">Sites de fontes</h3>
        <div className="space-y-2">
          {fontSites.map((site, index) => (
            <a
              key={index}
              href="#"
              className="block text-sm text-primary hover:underline"
            >
              {site}
            </a>
          ))}
        </div>
      </div>
      
      {/* Copyright Information */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3">
          Informações sobre direitos de autor
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed text-justify">
          Todas as fontes são propriedade dos seus autores e são freeware, shareware, 
          versões de demonstração ou de domínio público. A licença mencionada acima do 
          botão de download é apenas uma indicação. Por favor, leia os arquivos "leia-me" 
          dentro dos arquivos ZIP antes de usar as fontes para uso comercial. Em caso de 
          dúvida, contacte o autor da fonte ou leia a licença detalhadamente.
        </p>
        <p className="text-xs text-gray-600 leading-relaxed text-justify mt-3">
          Algumas fontes fornecidas são versões trial de fontes comerciais completas. 
          Compre as fontes completas de seus designers se você gostou da versão trial.
        </p>
      </div>
    </aside>
  );
};
