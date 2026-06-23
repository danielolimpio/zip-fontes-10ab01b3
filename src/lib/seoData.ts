export const BASE_URL = "https://zipfontes.com.br";
export const SITE_NAME = "Zip Fontes";
export const OG_IMAGE = `${BASE_URL}/favicon.png`;

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  intro: string;
  sections: { h2: string; p: string; list?: string[] }[];
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: string;
  jsonLdExtra?: Record<string, unknown>[];
}

export const slugifyKeyword = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " e ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const GLOBAL_KEYWORDS = [
  "zip fontes", "zipfontes", "fontes grátis", "fontes gratis", "fontes gratuitas",
  "download de fontes", "baixar fontes", "fontes para download", "fontes para baixar",
  "fontes ttf", "fontes otf", "fontes royalty free", "fontes livres",
  "fontes sem direitos autorais", "fontes uso comercial", "tipografia gratuita",
  "google fonts", "fontes google", "fonte download", "fontes de letras",
];

export const appRoutes: RouteMeta[] = [
  {
    path: "/",
    title: "Zip Fontes — Baixar Fontes Grátis para Download (TTF, OTF)",
    description: "Catálogo com milhares de fontes gratuitas para baixar em TTF e OTF, livres para uso comercial, com preview para Canva, Photoshop, Word e design.",
    keywords: [...GLOBAL_KEYWORDS, "fontes bonitas", "fontes cursivas", "fontes modernas", "fontes para instagram", "fontes para logotipo", "fontes para canva", "fontes para photoshop"],
    h1: "Zip Fontes — Fontes Grátis para Download em TTF e OTF",
    intro: "O Zip Fontes reúne fontes gratuitas, ícones, emojis e paletas para criadores brasileiros que precisam baixar, copiar e aplicar recursos visuais com rapidez em projetos pessoais e comerciais.",
    changefreq: "daily",
    priority: "1.0",
    sections: [
      { h2: "Categorias de fontes", p: "Encontre fontes cursivas, manuscritas, serifadas, sans serif, display, decorativas, modernas, vintage, góticas, 3D, neon, graffiti e muitas outras.", list: ["fontes TTF e OTF", "fontes para Instagram", "fontes para logotipo", "fontes para Canva", "fontes para Photoshop", "fontes para convites"] },
      { h2: "Download com preview", p: "Pesquise uma fonte, visualize com seu próprio texto, ajuste o tamanho e baixe arquivos compatíveis com editores gráficos e sistemas operacionais modernos." },
      { h2: "Uso comercial", p: "A curadoria prioriza fontes livres, royalty-free e adequadas para branding, marketing, redes sociais, sites, aplicativos e materiais impressos." },
    ],
  },
  {
    path: "/icons",
    title: "Ícones Grátis SVG e PNG para Baixar — Zip Fontes",
    description: "Biblioteca de ícones gratuitos em SVG e PNG para sites, apps, apresentações, UI, Figma, Canva e design, com personalização de cor, tamanho e traço.",
    keywords: ["ícones grátis", "icones gratis", "icons grátis", "download de ícones", "ícones svg", "ícones png", "ícones vetoriais", "ícones para sites", "ícones para apps", "ícones para figma", "ícones para canva", "ícones lucide", "ícones minimalistas", "biblioteca de ícones"],
    h1: "Ícones Grátis em SVG e PNG para Download",
    intro: "Encontre ícones vetoriais gratuitos, personalize tamanho, cor e espessura do traço, e baixe em SVG ou PNG para interfaces, apresentações e peças digitais.",
    changefreq: "weekly",
    priority: "0.9",
    sections: [{ h2: "Ícones para UI, sites e aplicativos", p: "Use em landing pages, dashboards, apps, menus, cards, infográficos, slides, e-commerce e materiais de marketing." }],
  },
  {
    path: "/emojis",
    title: "Emojis para Copiar e Colar — Catálogo em Português",
    description: "Copie e cole emojis para Instagram, WhatsApp, TikTok, Facebook, Discord e documentos. Lista completa organizada por categorias e nomes em português.",
    keywords: ["emojis", "emojis para copiar", "emoji copiar e colar", "emojis whatsapp", "emojis instagram", "emojis tiktok", "emojis em português", "lista de emojis", "todos os emojis", "emoji significado", "emoji unicode", "emojis para bio"],
    h1: "Emojis para Copiar e Colar",
    intro: "Catálogo de emojis Unicode em português para copiar com um clique e usar em redes sociais, mensagens, documentos, bios e legendas.",
    changefreq: "weekly",
    priority: "0.9",
    sections: [{ h2: "Categorias de emojis", p: "Rostos, pessoas, animais, comida, atividades, objetos, símbolos, bandeiras, setas e formas organizados para busca rápida." }],
  },
  {
    path: "/insta-fonts",
    title: "Fontes para Instagram — Letras Estilizadas para Copiar",
    description: "Gerador de fontes para Instagram, TikTok, WhatsApp e bio. Letras cursivas, bonitas, góticas, negrito, itálico, pequenas e decorativas para copiar e colar.",
    keywords: ["fontes para instagram", "fontes instagram", "letras para instagram", "gerador de fontes instagram", "fontes para bio instagram", "fontes diferentes para instagram", "fontes estilizadas", "fontes para tiktok", "fontes para whatsapp", "fontes para nick", "letras bonitas para copiar", "letras diferentes", "letras estilizadas", "gerador de letras", "fontes copiar e colar"],
    h1: "Fontes para Instagram — Gerador de Letras Estilizadas",
    intro: "Transforme texto comum em letras estilizadas para Instagram, TikTok, WhatsApp, Facebook, Twitter/X e Discord com estilos Unicode prontos para copiar.",
    changefreq: "weekly",
    priority: "0.9",
    sections: [{ h2: "Estilos para bio e legenda", p: "Cursiva, negrito, itálico, gótico, pequeno, invertido, monoespaçado, duplo traçado, sublinhado, riscado e estilos aesthetic." }],
  },
  {
    path: "/colors",
    title: "Paletas de Cores Material Design — Códigos HEX",
    description: "Paletas Material Design com códigos HEX para copiar. Ferramenta grátis para UI, branding, CSS, Tailwind, Figma, Canva e identidade visual.",
    keywords: ["paletas de cores", "cores hex", "código hex", "material design cores", "cores para sites", "cores para design", "cores para branding", "paleta de cores grátis", "gerador de paletas", "cores ui", "cores css", "cores tailwind"],
    h1: "Paletas de Cores Material Design com Códigos HEX",
    intro: "Explore paletas Material Design, copie códigos HEX e encontre combinações úteis para interfaces, marcas, apresentações e peças gráficas.",
    changefreq: "weekly",
    priority: "0.85",
    sections: [{ h2: "Cores para design e desenvolvimento", p: "Tons organizados para CSS, Tailwind, Figma, Photoshop, Canva, UI/UX, branding e logotipos." }],
  },
  {
    path: "/faq",
    title: "FAQ Zip Fontes — Baixar, Instalar e Usar Fontes",
    description: "Perguntas frequentes sobre baixar fontes grátis, instalar TTF e OTF, usar fontes no Canva, Photoshop, Word, Windows, Mac, Linux e projetos comerciais.",
    keywords: ["faq zip fontes", "como baixar fontes", "como instalar fontes", "instalar fonte windows", "instalar fonte mac", "uso comercial fontes", "licença de fonte", "formato ttf", "formato otf"],
    h1: "Perguntas Frequentes sobre Fontes Grátis",
    intro: "Respostas para dúvidas comuns sobre download, instalação, licenciamento, uso comercial, formatos TTF/OTF e compatibilidade de fontes.",
    changefreq: "monthly",
    priority: "0.75",
    sections: [{ h2: "Dúvidas sobre fontes", p: "Guias rápidos para baixar, instalar e usar fontes em sistemas, softwares de design e projetos comerciais." }],
  },
  { path: "/contato", title: "Contato — Zip Fontes", description: "Entre em contato com a equipe Zip Fontes para dúvidas, sugestões de fontes, licenciamento, parcerias e suporte.", keywords: ["contato zip fontes", "suporte fontes grátis", "fale conosco"], h1: "Contato Zip Fontes", intro: "Canal para dúvidas, sugestões, parcerias e reportes relacionados ao catálogo Zip Fontes.", changefreq: "monthly", priority: "0.6", sections: [] },
  { path: "/ajuda", title: "Central de Ajuda — Instalar Fontes no Canva, Word e Photoshop", description: "Tutoriais para baixar e instalar fontes em Windows, macOS, Linux, Canva, Word, Photoshop, Illustrator, Figma, Android e iOS.", keywords: ["ajuda zip fontes", "tutorial instalar fonte", "como instalar fonte no canva", "como instalar fonte no word", "como instalar fonte no photoshop", "tutorial fontes grátis"], h1: "Central de Ajuda para Fontes", intro: "Guias para baixar, instalar e usar fontes em sistemas operacionais, redes sociais e softwares de design.", changefreq: "monthly", priority: "0.75", sections: [] },
  { path: "/privacidade", title: "Política de Privacidade — Zip Fontes", description: "Política de privacidade do Zip Fontes com informações sobre dados, cookies, segurança e LGPD.", keywords: ["política de privacidade", "privacidade zip fontes", "lgpd"], h1: "Política de Privacidade", intro: "Informações sobre coleta, uso, proteção de dados e privacidade no Zip Fontes.", changefreq: "yearly", priority: "0.45", sections: [] },
  { path: "/cookies", title: "Política de Cookies — Zip Fontes", description: "Política de cookies do Zip Fontes e informações sobre preferências, anúncios, análise e funcionamento do site.", keywords: ["política de cookies", "cookies zip fontes"], h1: "Política de Cookies", intro: "Informações sobre cookies usados para funcionamento, análise, anúncios e preferências de navegação.", changefreq: "yearly", priority: "0.45", sections: [] },
  { path: "/termos", title: "Termos de Uso — Zip Fontes", description: "Termos de uso do Zip Fontes para acesso ao catálogo de fontes, ícones, emojis, cores e ferramentas gratuitas.", keywords: ["termos de uso", "termos zip fontes"], h1: "Termos de Uso", intro: "Condições de uso da plataforma Zip Fontes e dos recursos disponibilizados no site.", changefreq: "yearly", priority: "0.45", sections: [] },
];

const coreFontTerms = ["fontes grátis", "fontes gratis", "fontes gratuitas", "baixar fontes", "download de fontes", "fontes para download", "fontes para baixar", "fonte download", "fontes de letras", "fontes de letras download", "fontes grátis download", "fontes download gratuito", "tipografia gratuita", "fontes livres", "fontes royalty free", "fontes sem direitos autorais", "fontes para uso comercial", "fontes brasileiras", "fontes google", "google fonts português"];
const styleTerms = ["fontes bonitas", "fontes elegantes", "fontes modernas", "fontes clássicas", "fontes minimalistas", "fontes cursivas", "fontes manuscritas", "fontes caligráficas", "fontes script", "fontes serifadas", "fontes sans serif", "fontes display", "fontes decorativas", "fontes vintage", "fontes retrô", "fontes góticas", "fontes medievais", "fontes 3d", "fontes neon", "fontes graffiti", "fontes stencil", "fontes brush", "fontes arredondadas", "fontes condensadas", "fontes bold", "fontes negrito", "fontes finas", "fontes light", "fontes monoespaçadas", "fontes futuristas", "fontes geométricas", "fontes quadradas", "fontes infantis", "fontes divertidas", "fontes fofas", "fontes românticas", "fontes de luxo", "fontes profissionais", "fontes criativas", "fontes artísticas", "fontes hand lettering", "fontes lettering", "fontes western", "fontes horror", "fontes halloween", "fontes natalinas", "fontes esportivas", "fontes tecnológicas", "fontes digitais", "fontes pixeladas", "fontes assinatura", "fontes wedding", "fontes aesthetic", "fontes outline", "fontes slab serif", "fontes blackletter", "fontes ornamentais", "fontes para títulos"];
const useCaseTerms = ["fontes para Instagram", "fontes para bio do Instagram", "fontes para TikTok", "fontes para WhatsApp", "fontes para Discord", "fontes para Twitter", "fontes para Facebook", "fontes para YouTube", "fontes para Pinterest", "fontes para logotipo", "fontes para logo", "fontes para marca", "fontes para branding", "fontes para design gráfico", "fontes para identidade visual", "fontes para convites", "fontes para convite de casamento", "fontes para casamento", "fontes para formatura", "fontes para aniversário", "fontes para festa", "fontes para tatuagem", "fontes para camisetas", "fontes para estampas", "fontes para adesivos", "fontes para cartazes", "fontes para banners", "fontes para posts", "fontes para stories", "fontes para reels", "fontes para apresentações", "fontes para slides", "fontes para currículo", "fontes para certificado", "fontes para cardápio", "fontes para embalagem", "fontes para etiqueta", "fontes para e-commerce", "fontes para loja virtual", "fontes para site", "fontes para blog", "fontes para landing page", "fontes para app", "fontes para interface", "fontes para UI", "fontes para UX", "fontes para anúncio", "fontes para propaganda", "fontes para flyer", "fontes para panfleto", "fontes para capa", "fontes para ebook", "fontes para livro", "fontes para jornal", "fontes para revista", "fontes para placa", "fontes para letreiro", "fontes para restaurante", "fontes para barbearia", "fontes para igreja", "fontes para escola", "fontes para fotografia", "fontes para moda", "fontes para games"];
const softwareTerms = ["fontes para Canva", "fontes para Photoshop", "fontes para Illustrator", "fontes para CorelDRAW", "fontes para Figma", "fontes para Word", "fontes para PowerPoint", "fontes para Google Docs", "fontes para CapCut", "fontes para After Effects", "fontes para Premiere", "fontes para InDesign", "fontes para Procreate", "fontes para Cricut", "fontes para Silhouette", "fontes para Windows", "fontes para Mac", "fontes para Linux", "fontes para Android", "fontes para iPhone", "fontes para CSS", "fontes para web"];
const formatTerms = ["fontes TTF", "fontes OTF", "baixar fontes TTF", "baixar fontes OTF", "download fontes TTF", "download fontes OTF", "fontes TrueType", "fontes OpenType", "fontes WOFF", "fontes WOFF2", "pacote de fontes", "coleção de fontes", "biblioteca de fontes", "catálogo de fontes", "arquivo de fonte", "instalar fontes", "como baixar fontes", "como instalar fontes", "fontes para copiar", "fontes com acentos", "fontes em português", "fontes para português", "fontes com cedilha", "fontes leves para site"];
const socialLetterTerms = ["letras para Instagram", "letras bonitas para Instagram", "letras para bio", "letras diferentes", "letras estilizadas", "letras cursivas para copiar", "letras bonitas para copiar", "letras pequenas para copiar", "letras góticas para copiar", "letras em negrito para copiar", "gerador de fontes", "gerador de letras", "gerador de texto estilizado", "fontes copiar e colar", "fontes para nick", "fontes para nome", "fontes para perfil", "fontes para legenda", "texto estilizado", "texto bonito para copiar"];
const competitorTerms = ["alternativa ao DaFont", "alternativa ao 1001 Free Fonts", "alternativa ao Font Meme", "alternativa ao Font River", "site para baixar fontes grátis", "melhores sites de fontes grátis", "fontes gratuitas brasileiras", "download fontes grátis português"];

type LandingKind = "core" | "style" | "use" | "software" | "format" | "social" | "market";

const makeLandingRoute = (term: string, kind: LandingKind): RouteMeta => {
  const slug = slugifyKeyword(term);
  const title = `${term} — ${kind === "social" ? "Copiar e Colar" : "Download e Guia"} | Zip Fontes`;
  const intro = `Página indexável sobre ${term.toLowerCase()} no Zip Fontes, criada para reunir variações de busca, termos relacionados, intenção de download, instalação, uso comercial e aplicações em design, redes sociais e softwares criativos.`;
  const keywords = Array.from(new Set([term, `${term} grátis`, `baixar ${term}`, `${term} download`, `${term} ttf`, `${term} otf`, `${term} para uso comercial`, `${term} canva`, `${term} photoshop`, ...GLOBAL_KEYWORDS.slice(0, 12)]));
  return {
    path: `/fontes/${slug}`,
    title,
    description: `${intro.slice(0, 150).replace(/\.$/, "")}.`,
    keywords,
    h1: term.charAt(0).toUpperCase() + term.slice(1),
    intro,
    changefreq: kind === "core" || kind === "style" || kind === "use" ? "weekly" : "monthly",
    priority: kind === "core" ? "0.88" : kind === "style" || kind === "use" ? "0.82" : "0.72",
    sections: [
      { h2: `Termos pesquisados sobre ${term.toLowerCase()}`, p: `Esta página cobre buscas relacionadas a ${term.toLowerCase()}, incluindo download, baixar, grátis, TTF, OTF, uso comercial, Canva, Photoshop, Word, Instagram e design gráfico.`, list: keywords.slice(0, 7) },
      { h2: `Como usar ${term.toLowerCase()}`, p: "Use o catálogo principal para visualizar fontes com seu texto, comparar estilos e baixar arquivos compatíveis. Para redes sociais, use o gerador de letras estilizadas e copie o resultado." },
      { h2: "Busca relacionada", p: "Também procure por fontes bonitas, fontes cursivas, fontes modernas, fontes para Instagram, fontes para logotipo, fontes para Canva e download de fontes grátis em português." },
    ],
  };
};

const dedupeRoutes = (routes: RouteMeta[]) => {
  const seen = new Set<string>();
  return routes.filter((route) => (seen.has(route.path) ? false : (seen.add(route.path), true)));
};

export const seoLandingRoutes: RouteMeta[] = dedupeRoutes([
  ...coreFontTerms.map((term) => makeLandingRoute(term, "core")),
  ...styleTerms.map((term) => makeLandingRoute(term, "style")),
  ...useCaseTerms.map((term) => makeLandingRoute(term, "use")),
  ...softwareTerms.map((term) => makeLandingRoute(term, "software")),
  ...formatTerms.map((term) => makeLandingRoute(term, "format")),
  ...socialLetterTerms.map((term) => makeLandingRoute(term, "social")),
  ...competitorTerms.map((term) => makeLandingRoute(term, "market")),
]);

export const allSeoRoutes: RouteMeta[] = [...appRoutes, ...seoLandingRoutes];
export const findSeoRoute = (path: string) => allSeoRoutes.find((route) => route.path === path);
export const relatedSeoRoutes = (currentPath: string, limit = 12) => seoLandingRoutes.filter((route) => route.path !== currentPath).slice(0, limit);
