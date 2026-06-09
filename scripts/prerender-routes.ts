/**
 * Pós-build: gera um index.html estático para cada rota do SPA,
 * injetando meta tags, JSON-LD e conteúdo SEO visível por rota.
 *
 * IMPORTANTE: O conteúdo SEO é injetado DENTRO de <div id="root">.
 * Quando o React monta com createRoot, ele substitui completamente
 * o conteúdo do root — então usuários NÃO veem esse HTML, apenas
 * crawlers (Googlebot, Bingbot) que rastreiam HTML antes de executar
 * JS. O visual do app permanece IDÊNTICO.
 *
 * Curadoria de palavras-chave baseada em concorrentes do mercado:
 * dafont, 1001freefonts, fontmeme, fontriver, fonts.google.com,
 * fonts.adobe.com, canva, creativefabrica, invertexto, piliapp,
 * flikta, netfontes, designerd, magnific, envato.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";

const BASE_URL = "https://zipfontes.com.br";
const OG_IMAGE = `${BASE_URL}/favicon.png`;
const SITE_NAME = "Zip Fontes";

interface RouteMeta {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  intro: string;
  sections: { h2: string; p: string; list?: string[] }[];
  jsonLdExtra?: Record<string, unknown>[];
}

// ──────────────────────────────────────────────────────────────────
// Palavras-chave globais (curadoria de concorrentes)
// ──────────────────────────────────────────────────────────────────
const GLOBAL_KEYWORDS = [
  "zip fontes", "zipfontes", "fontes grátis", "fontes gratuitas",
  "download de fontes", "baixar fontes", "fontes para download",
  "fontes ttf", "fontes otf", "fontes royalty free", "fontes livres",
  "fontes sem direitos autorais", "fontes uso comercial",
  "fontes para photoshop", "fontes para canva", "fontes para word",
  "fontes para logotipo", "fontes para design", "fontes brasileiras",
  "tipografia gratuita", "google fonts", "fontes google",
];

// ──────────────────────────────────────────────────────────────────
// Rotas + conteúdo SEO
// ──────────────────────────────────────────────────────────────────
const routes: RouteMeta[] = [
  {
    path: "/",
    title: "Zip Fontes — Baixar Fontes Grátis para Download (TTF, OTF) em Português",
    description:
      "Catálogo com milhares de fontes gratuitas para baixar em TTF e OTF. 100% livres de direitos autorais, preview em tempo real, ideais para Photoshop, Canva, Word, Illustrator, design gráfico, logotipos, convites, redes sociais e Instagram.",
    keywords: [
      ...GLOBAL_KEYWORDS,
      "fontes para baixar", "fontes para baixar grátis", "fontes para baixar gratis",
      "fontes de letras", "fontes de letras download", "fontes de letras baixar",
      "fontes bonitas", "fontes elegantes", "fontes modernas", "fontes clássicas",
      "fontes manuscritas", "fontes cursivas", "fontes script", "fontes caligráficas",
      "fontes serif", "fontes sans serif", "fontes display", "fontes decorativas",
      "fontes vintage", "fontes retrô", "fontes minimalistas", "fontes futuristas",
      "fontes góticas", "fontes 3d", "fontes neon", "fontes graffiti",
      "fontes para tatuagem", "fontes para convites de casamento",
      "fontes para títulos", "fontes para banners", "fontes para camisetas",
      "dafont português", "1001 free fonts", "font meme", "font river",
      "fonte download", "fonte grátis", "font zip", "zip font", "fonts zip",
      "fonts grátis", "free fonts brasil", "tipos de letras para baixar",
    ],
    h1: "Zip Fontes — Fontes Grátis para Download em TTF e OTF",
    intro:
      "O Zip Fontes é o maior catálogo brasileiro de fontes gratuitas para download. Todas as fontes são 100% livres de direitos autorais, podem ser usadas em projetos pessoais e comerciais, e estão disponíveis nos formatos TTF e OTF compatíveis com Photoshop, Illustrator, Canva, Word, CorelDRAW, Figma e qualquer editor gráfico.",
    sections: [
      {
        h2: "Categorias de fontes disponíveis para download grátis",
        p: "Explore centenas de estilos tipográficos para todos os tipos de projeto:",
        list: [
          "Fontes manuscritas e caligráficas",
          "Fontes cursivas elegantes para convites",
          "Fontes serif clássicas para textos longos",
          "Fontes sans serif modernas e minimalistas",
          "Fontes display para títulos e logotipos",
          "Fontes decorativas, vintage e retrô",
          "Fontes góticas, 3D, neon e graffiti",
          "Fontes para tatuagem, camisetas e estampas",
          "Fontes para Instagram, TikTok e redes sociais",
          "Fontes para casamento, convites e papelaria",
        ],
      },
      {
        h2: "Como baixar fontes grátis no Zip Fontes",
        p: "Navegue pelo catálogo, use o preview em tempo real para visualizar a fonte com seu próprio texto, ajuste o tamanho e clique em Baixar. O arquivo TTF ou OTF será baixado instantaneamente, pronto para instalar no Windows, macOS, Linux, Android e iOS.",
      },
      {
        h2: "Fontes para uso comercial sem royalties",
        p: "Todas as fontes do Zip Fontes podem ser usadas livremente em projetos comerciais, freelas, agências, e-commerce, marketing digital, branding e design gráfico — sem precisar pagar licença ou royalties.",
      },
    ],
    jsonLdExtra: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: BASE_URL,
        inLanguage: "pt-BR",
        potentialAction: {
          "@type": "SearchAction",
          target: `${BASE_URL}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  },

  {
    path: "/icons",
    title: "Ícones Grátis para Download em SVG e PNG — Zip Fontes",
    description:
      "Biblioteca com milhares de ícones gratuitos em SVG e PNG. Personalize cor, tamanho (até 1024px) e espessura do traço. Ideais para sites, apps, apresentações, design de interface (UI), Figma, Canva e logotipos.",
    keywords: [
      "ícones grátis", "icones gratis", "icons grátis", "download de ícones",
      "ícones svg", "ícones png", "ícones vetoriais", "ícones para sites",
      "ícones para apps", "ícones para figma", "ícones para canva",
      "ícones lucide", "ícones flat", "ícones minimalistas", "ícones personalizáveis",
      "biblioteca de ícones", "pictogramas", "pacote de ícones",
      "ícones ui", "ícones ux", "ícones material", "ícones outline",
      "ícones pretos", "ícones brancos", "ícones coloridos",
      "free icons brasil", "ícones para apresentação", "ícones powerpoint",
    ],
    h1: "Ícones Grátis em SVG e PNG para Download",
    intro:
      "Acesse uma biblioteca completa de ícones vetoriais 100% gratuitos. Personalize cada ícone alterando cor, tamanho e espessura do traço. Exporte em SVG (vetorial, redimensiona sem perda) ou PNG em alta resolução até 1024 pixels.",
    sections: [
      {
        h2: "Recursos da biblioteca de ícones",
        p: "Mais de mil ícones organizados por categoria, todos personalizáveis em tempo real.",
        list: [
          "Exportação em SVG vetorial",
          "Exportação em PNG até 1024×1024 pixels",
          "Personalização de cor",
          "Ajuste de espessura do traço (stroke)",
          "Compatível com Figma, Adobe XD, Canva e Photoshop",
          "Ideal para UI/UX, apps mobile e sites responsivos",
        ],
      },
      {
        h2: "Onde usar os ícones gratuitos",
        p: "Use em landing pages, dashboards, apps mobile, apresentações em PowerPoint e Keynote, peças de marketing, infográficos, e-commerce, sistemas web e prototipagem.",
      },
    ],
  },

  {
    path: "/emojis",
    title: "Emojis para Copiar e Colar — Catálogo Completo em Português",
    description:
      "Catálogo com todos os emojis Unicode oficiais, organizados por categoria e com nomes em português. Copie e cole emojis no Instagram, WhatsApp, TikTok, Facebook, Twitter, Discord e qualquer aplicativo.",
    keywords: [
      "emojis", "emojis para copiar", "emoji copiar e colar", "emojis whatsapp",
      "emojis instagram", "emojis tiktok", "emojis facebook", "emojis discord",
      "emojis em português", "lista de emojis", "todos os emojis",
      "emoji significado", "emoji nome", "emoji unicode", "twemoji",
      "emoji coração", "emoji rosto", "emoji bandeira", "emoji animal",
      "emoji comida", "emoji símbolo", "emoji para bio", "emoji para nick",
      "emojis grátis", "biblioteca de emojis", "emojis fofos", "emojis aesthetic",
    ],
    h1: "Emojis para Copiar e Colar — Todos os Emojis em Português",
    intro:
      "Catálogo completo com todos os emojis Unicode renderizados via Twemoji. Encontre emojis por nome em português, navegue por categorias (rostos, animais, comida, símbolos, bandeiras, atividades) e copie com um clique para usar em qualquer rede social.",
    sections: [
      {
        h2: "Categorias de emojis",
        p: "Todos os emojis oficiais Unicode organizados:",
        list: [
          "Rostos e expressões (sorrisos, choro, raiva, amor)",
          "Pessoas e gestos (mãos, corpo, profissões)",
          "Animais e natureza (cães, gatos, plantas, clima)",
          "Comidas e bebidas (frutas, fast food, sobremesas)",
          "Atividades e esportes",
          "Viagens, locais e transportes",
          "Objetos do dia a dia",
          "Símbolos, setas e formas",
          "Bandeiras de todos os países",
        ],
      },
      {
        h2: "Como usar emojis no Instagram, WhatsApp e TikTok",
        p: "Clique no emoji para copiar automaticamente. Cole na bio do Instagram, em legendas, comentários, mensagens do WhatsApp, status, vídeos do TikTok ou em qualquer aplicativo que suporte Unicode.",
      },
    ],
  },

  {
    path: "/insta-fonts",
    title: "Fontes para Instagram — Gerador de Letras Estilizadas (Copiar e Colar)",
    description:
      "Gerador de fontes estilizadas para Instagram, TikTok, WhatsApp, Twitter e Facebook. Mais de 50 estilos: cursiva, negrito, itálico, gótico, pequeno, invertido, decorativo. Copie e cole na bio em segundos.",
    keywords: [
      "fontes para instagram", "fontes instagram", "letras para instagram",
      "gerador de fontes instagram", "fontes para bio instagram",
      "fontes diferentes para instagram", "fontes estilizadas",
      "fontes cursivas instagram", "fontes para nick", "fontes para nome",
      "fontes para tiktok", "fontes para whatsapp", "fontes para twitter",
      "fontes para facebook", "fontes para discord", "fontes aesthetic",
      "letras bonitas para copiar", "letras diferentes", "letras estilizadas",
      "texto estilizado", "gerador de letras", "gerador de texto",
      "fontes unicode", "letras cursivas para copiar", "letras pequenas",
      "letras grandes", "letras góticas", "letras invertidas",
      "fontes para bio", "fontes para perfil", "fontes copiar e colar",
      "piliapp fontes", "invertexto fontes", "flikta gerador de fontes",
      "fontes flikta", "letras flikta", "fontes pinterest",
    ],
    h1: "Fontes para Instagram — Gerador de Letras Estilizadas",
    intro:
      "Transforme qualquer texto em fontes estilizadas para Instagram, TikTok, WhatsApp, Twitter, Facebook e Discord. Mais de 50 estilos prontos para copiar e colar — desde cursiva elegante até gótico medieval, pequeno, invertido, sublinhado e aesthetic.",
    sections: [
      {
        h2: "Estilos de fontes disponíveis",
        p: "Digite seu texto uma vez e veja todas as variações instantaneamente:",
        list: [
          "Cursiva elegante para bio do Instagram",
          "Negrito serifado e sans-serif",
          "Itálico e itálico negrito",
          "Gótico medieval (Fraktur)",
          "Pequeno (superscript e subscript)",
          "Invertido e espelhado",
          "Sublinhado, riscado e cercado",
          "Decorativo aesthetic e fancy",
          "Monoespaçado e duplo traçado",
          "Caracteres japoneses estilizados",
        ],
      },
      {
        h2: "Como usar fontes estilizadas no Instagram",
        p: "Digite seu texto, escolha o estilo, clique em copiar e cole na bio do Instagram, legenda, story, comentário ou direct. Funciona também em TikTok, WhatsApp, Twitter, Facebook, Telegram, Discord e qualquer plataforma que aceite Unicode.",
      },
    ],
  },

  {
    path: "/colors",
    title: "Paletas de Cores Material Design — Códigos HEX para Copiar",
    description:
      "Paletas de cores Material Design completas com códigos HEX prontos para copiar. Ferramenta gratuita para designers, devs front-end, UI/UX, branding e identidade visual.",
    keywords: [
      "paletas de cores", "cores hex", "código hex", "material design cores",
      "cores para sites", "cores para design", "cores para branding",
      "paleta de cores grátis", "gerador de paletas", "cores ui",
      "cores css", "cores tailwind", "rgb hex", "color picker",
      "cores complementares", "harmonia de cores", "cores para logotipo",
      "tons pastel", "cores vibrantes", "cores neutras", "cores frias",
      "cores quentes", "paleta minimalista", "paleta moderna",
    ],
    h1: "Paletas de Cores Material Design com Códigos HEX",
    intro:
      "Explore todas as paletas oficiais do Material Design com tons variando de 50 a 900. Clique em qualquer cor para copiar o código HEX e usar imediatamente em CSS, Tailwind, Figma, Photoshop, Canva ou qualquer ferramenta de design.",
    sections: [
      {
        h2: "Recursos da ferramenta de cores",
        p: "Paletas profissionais prontas para qualquer projeto digital ou impresso.",
        list: [
          "Códigos HEX em um clique",
          "Todas as variações de tom (50, 100, 200... 900)",
          "Paletas Material Design oficiais",
          "Compatível com CSS, Tailwind, SCSS",
          "Ideal para UI, branding e logotipos",
        ],
      },
    ],
  },

  {
    path: "/faq",
    title: "Perguntas Frequentes (FAQ) — Zip Fontes",
    description:
      "Tire suas dúvidas sobre o Zip Fontes: como baixar fontes grátis, instalar em Windows, Mac e Linux, uso comercial, formatos TTF e OTF, e licenças royalty-free.",
    keywords: [
      "faq zip fontes", "como baixar fontes", "como instalar fontes",
      "instalar fonte windows", "instalar fonte mac", "instalar fonte linux",
      "uso comercial fontes", "licença de fonte", "fontes royalty free",
      "formato ttf", "formato otf", "diferença ttf otf",
    ],
    h1: "Perguntas Frequentes sobre o Zip Fontes",
    intro:
      "Reunimos as principais dúvidas dos usuários sobre download de fontes, instalação, uso comercial e licenciamento.",
    sections: [
      {
        h2: "As fontes são realmente grátis?",
        p: "Sim. Todas as fontes do Zip Fontes são 100% gratuitas e podem ser usadas em projetos pessoais e comerciais sem pagar royalties.",
      },
      {
        h2: "Como instalar uma fonte baixada?",
        p: "No Windows, clique duas vezes no arquivo .ttf/.otf e selecione Instalar. No macOS, abra o arquivo e clique em Instalar Fonte. No Linux, copie para ~/.fonts. No Android e iOS use apps como iFont ou AnyFont.",
      },
      {
        h2: "Posso usar as fontes em projetos comerciais?",
        p: "Sim. Trabalhamos exclusivamente com fontes 100% livres de direitos autorais, liberadas para uso pessoal e comercial.",
      },
      {
        h2: "Qual a diferença entre TTF e OTF?",
        p: "TTF (TrueType) e OTF (OpenType) são formatos compatíveis com praticamente todos os sistemas. OTF suporta recursos tipográficos avançados como ligaduras e alternâncias.",
      },
    ],
    jsonLdExtra: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "As fontes são realmente grátis?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim. Todas as fontes do Zip Fontes são 100% gratuitas e podem ser usadas em projetos pessoais e comerciais sem pagar royalties.",
            },
          },
          {
            "@type": "Question",
            name: "Como instalar uma fonte baixada?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No Windows, clique duas vezes no arquivo .ttf/.otf e selecione Instalar. No macOS, abra o arquivo e clique em Instalar Fonte. No Linux, copie para ~/.fonts.",
            },
          },
          {
            "@type": "Question",
            name: "Posso usar as fontes em projetos comerciais?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim. Trabalhamos exclusivamente com fontes 100% livres de direitos autorais, liberadas para uso pessoal e comercial.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a diferença entre TTF e OTF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "TTF (TrueType) e OTF (OpenType) são formatos compatíveis com praticamente todos os sistemas. OTF suporta recursos tipográficos avançados.",
            },
          },
        ],
      },
    ],
  },

  {
    path: "/contato",
    title: "Contato — Zip Fontes",
    description:
      "Entre em contato com a equipe Zip Fontes. Envie sugestões de fontes, dúvidas sobre licenciamento, parcerias ou reporte problemas.",
    keywords: ["contato zip fontes", "suporte fontes grátis", "fale conosco"],
    h1: "Fale com a equipe Zip Fontes",
    intro: "Sugestões, dúvidas, parcerias ou reportes de problemas — estamos disponíveis para ajudar.",
    sections: [],
  },

  {
    path: "/ajuda",
    title: "Central de Ajuda — Zip Fontes",
    description:
      "Central de ajuda do Zip Fontes com tutoriais de instalação de fontes em Windows, Mac, Linux, Android, iOS, Photoshop, Word e Canva.",
    keywords: [
      "ajuda zip fontes", "tutorial instalar fonte",
      "como instalar fonte no canva", "como instalar fonte no word",
      "como instalar fonte no photoshop", "tutorial fontes grátis",
    ],
    h1: "Central de Ajuda do Zip Fontes",
    intro: "Guias passo a passo para baixar, instalar e usar fontes em qualquer sistema operacional ou software de design.",
    sections: [],
  },

  {
    path: "/privacidade",
    title: "Política de Privacidade — Zip Fontes",
    description: "Política de privacidade do Zip Fontes. Saiba como coletamos, usamos e protegemos seus dados.",
    keywords: ["política de privacidade", "privacidade zip fontes", "lgpd"],
    h1: "Política de Privacidade",
    intro: "Esta política descreve como o Zip Fontes coleta, usa e protege as informações dos usuários.",
    sections: [],
  },

  {
    path: "/cookies",
    title: "Política de Cookies — Zip Fontes",
    description: "Política de cookies do Zip Fontes. Saiba quais cookies utilizamos e como gerenciá-los.",
    keywords: ["política de cookies", "cookies zip fontes"],
    h1: "Política de Cookies",
    intro: "Informações sobre os cookies utilizados pelo Zip Fontes e como você pode gerenciá-los.",
    sections: [],
  },

  {
    path: "/termos",
    title: "Termos de Uso — Zip Fontes",
    description: "Termos de uso do Zip Fontes. Leia as condições de utilização da plataforma.",
    keywords: ["termos de uso", "termos zip fontes"],
    h1: "Termos de Uso",
    intro: "Ao utilizar o Zip Fontes você concorda com os termos descritos nesta página.",
    sections: [],
  },
];

// ──────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────
const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function buildHead(route: RouteMeta): string {
  const url = `${BASE_URL}${route.path}`;
  const title = escape(route.title);
  const desc = escape(route.description);
  const kw = escape(route.keywords.join(", "));

  // JSON-LD base: Organization sitewide + WebPage + Breadcrumb
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: OG_IMAGE,
    sameAs: ["https://www.instagram.com/zipfontes"],
  };
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: route.title,
    description: route.description,
    url,
    inLanguage: "pt-BR",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: BASE_URL },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: BASE_URL },
      ...(route.path !== "/"
        ? [{ "@type": "ListItem", position: 2, name: route.h1, item: url }]
        : []),
    ],
  };

  const jsonLdBlocks = [orgJsonLd, webPageJsonLd, breadcrumbJsonLd, ...(route.jsonLdExtra ?? [])]
    .map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`)
    .join("\n    ");

  return `
    <title>${title}</title>
    <meta name="description" content="${desc}" />
    <meta name="keywords" content="${kw}" />
    <meta name="author" content="${SITE_NAME}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta name="googlebot" content="index, follow" />
    <meta name="language" content="Portuguese" />
    <meta http-equiv="content-language" content="pt-BR" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="pt-BR" href="${url}" />
    <link rel="alternate" hreflang="x-default" href="${url}" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@ZipFontes" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    ${jsonLdBlocks}`;
}

/**
 * Conteúdo SEO injetado DENTRO de <div id="root">.
 * O React.createRoot substitui esse HTML inteiro na hidratação,
 * portanto usuários NUNCA veem isso — apenas crawlers.
 */
function buildSeoBody(route: RouteMeta): string {
  const sectionsHtml = route.sections
    .map((s) => {
      const list = s.list
        ? `<ul>${s.list.map((i) => `<li>${escape(i)}</li>`).join("")}</ul>`
        : "";
      return `<section><h2>${escape(s.h2)}</h2><p>${escape(s.p)}</p>${list}</section>`;
    })
    .join("");

  const navLinks = routes
    .filter((r) => r.path !== route.path)
    .map((r) => `<li><a href="${r.path}">${escape(r.h1)}</a></li>`)
    .join("");

  return `<div id="seo-prerender" style="position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;">
    <header><a href="${BASE_URL}">${SITE_NAME}</a></header>
    <main>
      <h1>${escape(route.h1)}</h1>
      <p>${escape(route.intro)}</p>
      ${sectionsHtml}
      <nav aria-label="Navegação"><h2>Explore também</h2><ul>${navLinks}</ul></nav>
    </main>
    <footer><p>${SITE_NAME} — Fontes, ícones, emojis e cores grátis em português.</p></footer>
  </div>`;
}

export function prerenderRoutes(distDir = "dist") {
  const indexPath = resolve(distDir, "index.html");
  if (!existsSync(indexPath)) {
    console.warn(`[prerender] ${indexPath} não encontrado — pulando.`);
    return;
  }
  const template = readFileSync(indexPath, "utf-8");

  let count = 0;
  for (const route of routes) {
    const head = buildHead(route);
    const seoBody = buildSeoBody(route);

    let html = template
      // limpa tags que vamos sobrescrever
      .replace(/<title>[\s\S]*?<\/title>/i, "")
      .replace(/<meta\s+name=["'](description|keywords|author|robots|googlebot|language)["'][^>]*>/gi, "")
      .replace(/<meta\s+http-equiv=["']content-language["'][^>]*>/gi, "")
      .replace(/<link\s+rel=["'](canonical|alternate)["'][^>]*>/gi, "")
      .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, "")
      .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, "")
      .replace(/<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, "")
      .replace(/<\/head>/i, `${head}\n  </head>`)
      // injeta conteúdo SEO DENTRO do root (React substitui na hidratação)
      .replace(/<div id="root"><\/div>/i, `<div id="root">${seoBody}</div>`);

    const outPath =
      route.path === "/"
        ? resolve(distDir, "index.html")
        : resolve(distDir, route.path.replace(/^\//, ""), "index.html");

    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf-8");
    count++;
  }
  console.log(`[prerender] ${count} HTMLs por rota gerados em ${distDir}/ (com conteúdo SEO)`);
}
