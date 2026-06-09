/**
 * Pós-build: gera um index.html estático para cada rota do SPA,
 * injetando <title>, description, canonical e og:* específicos.
 *
 * O React continua hidratando normalmente — o visual NÃO muda.
 * O ganho é puramente para crawlers (Google, Bing, redes sociais)
 * que precisam de meta tags por rota para indexar corretamente.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";

const BASE_URL = "https://zipfontes.com.br";
const OG_IMAGE = `${BASE_URL}/favicon.png`;

interface RouteMeta {
  path: string;
  title: string;
  description: string;
}

const routes: RouteMeta[] = [
  {
    path: "/",
    title: "Zip Fontes - Fontes Gratuitas para Download",
    description:
      "Explore e baixe milhares de fontes gratuitas 100% livres de direitos autorais. Catálogo completo com preview em tempo real.",
  },
  {
    path: "/icons",
    title: "Ícones - Zip Fontes",
    description:
      "Biblioteca completa de ícones SVG e PNG gratuitos para download. Personalize tamanho, cor e espessura de traço.",
  },
  {
    path: "/emojis",
    title: "Emojis - Zip Fontes",
    description:
      "Catálogo de emojis com nomes oficiais. Copie e use em qualquer lugar — redes sociais, documentos e mensagens.",
  },
  {
    path: "/insta-fonts",
    title: "Insta Fonts - Zip Fontes",
    description:
      "Gere textos com fontes estilizadas para Instagram, TikTok, WhatsApp e bio. Mais de 50 estilos unicode prontos para copiar.",
  },
  {
    path: "/colors",
    title: "Cores - Zip Fontes",
    description:
      "Paletas de cores Material Design com códigos HEX prontos para copiar. Ferramenta gratuita para designers e devs.",
  },
  {
    path: "/faq",
    title: "FAQ - Zip Fontes",
    description:
      "Perguntas frequentes sobre o Zip Fontes: licenças, downloads, formatos e uso comercial das fontes.",
  },
  {
    path: "/contato",
    title: "Contato - Zip Fontes",
    description: "Fale com a equipe Zip Fontes. Sugestões, dúvidas e parcerias.",
  },
  {
    path: "/ajuda",
    title: "Ajuda - Zip Fontes",
    description: "Central de ajuda do Zip Fontes — guias e tutoriais de uso.",
  },
  {
    path: "/privacidade",
    title: "Privacidade - Zip Fontes",
    description: "Política de privacidade do Zip Fontes.",
  },
  {
    path: "/cookies",
    title: "Cookies - Zip Fontes",
    description: "Política de cookies do Zip Fontes.",
  },
  {
    path: "/termos",
    title: "Termos de Uso - Zip Fontes",
    description: "Termos de uso do Zip Fontes.",
  },
];

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function buildHead(route: RouteMeta): string {
  const url = `${BASE_URL}${route.path}`;
  const title = escape(route.title);
  const desc = escape(route.description);
  return `
    <title>${title}</title>
    <meta name="description" content="${desc}" />
    <meta name="author" content="Zip Fontes" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:site_name" content="Zip Fontes" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@ZipFontes" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />`;
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

    // Remove tags existentes que vamos sobrescrever (title, description,
    // canonical, og:*, twitter:*) e injeta as específicas da rota.
    let html = template
      .replace(/<title>[\s\S]*?<\/title>/i, "")
      .replace(/<meta\s+name=["']description["'][^>]*>/gi, "")
      .replace(/<meta\s+name=["']author["'][^>]*>/gi, "")
      .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "")
      .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, "")
      .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, "")
      .replace(/<\/head>/i, `${head}\n  </head>`);

    const outPath =
      route.path === "/"
        ? resolve(distDir, "index.html")
        : resolve(distDir, route.path.replace(/^\//, ""), "index.html");

    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf-8");
    count++;
  }
  console.log(`[prerender] ${count} HTMLs por rota gerados em ${distDir}/`);
}
