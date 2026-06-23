/**
 * Pós-build: gera HTML estático por rota para tornar o SPA indexável.
 * O conteúdo é entregue dentro de #root para crawlers; o React hidrata depois,
 * preservando o layout visual atual do aplicativo.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { allSeoRoutes, BASE_URL, OG_IMAGE, SITE_NAME, type RouteMeta } from "../src/lib/seoData";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function buildHead(route: RouteMeta) {
  const url = `${BASE_URL}${route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const keywords = escapeHtml(route.keywords.join(", "));
  const schemas = [
    { "@context": "https://schema.org", "@type": "Organization", name: SITE_NAME, url: BASE_URL, logo: OG_IMAGE, sameAs: ["https://www.instagram.com/zipfontes"] },
    { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: BASE_URL, inLanguage: "pt-BR" },
    { "@context": "https://schema.org", "@type": "WebPage", name: route.title, description: route.description, url, inLanguage: "pt-BR", isPartOf: { "@type": "WebSite", name: SITE_NAME, url: BASE_URL } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Início", item: `${BASE_URL}/` }, ...(route.path === "/" ? [] : [{ "@type": "ListItem", position: 2, name: route.h1, item: url }])] },
    ...(route.jsonLdExtra ?? []),
  ];
  const jsonLdBlocks = schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join("\n    ");

  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${keywords}" />
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
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@ZipFontes" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    ${jsonLdBlocks}`;
}

function buildSeoBody(route: RouteMeta) {
  const sections = route.sections.map((section) => {
    const list = section.list?.length ? `<ul>${section.list.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : "";
    return `<section><h2>${escapeHtml(section.h2)}</h2><p>${escapeHtml(section.p)}</p>${list}</section>`;
  }).join("");
  const relatedLinks = allSeoRoutes.filter((item) => item.path !== route.path).slice(0, 36).map((item) => `<li><a href="${item.path}">${escapeHtml(item.h1)}</a></li>`).join("");
  const keywordList = route.keywords.slice(0, 36).map((keyword) => `<li>${escapeHtml(keyword)}</li>`).join("");

  return `<div id="seo-prerender">
    <header><a href="${BASE_URL}/">${SITE_NAME}</a></header>
    <main>
      <h1>${escapeHtml(route.h1)}</h1>
      <p>${escapeHtml(route.intro)}</p>
      ${sections}
      <section><h2>Palavras-chave relacionadas</h2><ul>${keywordList}</ul></section>
      <nav aria-label="Páginas relacionadas"><h2>Explore também</h2><ul>${relatedLinks}</ul></nav>
    </main>
    <footer><p>${SITE_NAME} — Fontes, ícones, emojis e cores grátis em português.</p></footer>
  </div>`;
}

export function buildSitemap(routes: RouteMeta[] = allSeoRoutes) {
  const urls = routes.map((route) => ["  <url>", `    <loc>${BASE_URL}${route.path}</loc>`, `    <changefreq>${route.changefreq ?? "monthly"}</changefreq>`, `    <priority>${route.priority ?? "0.7"}</priority>`, "  </url>"].join("\n"));
  return [`<?xml version="1.0" encoding="UTF-8"?>`, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`, ...urls, `</urlset>`, ""].join("\n");
}

function writeRouteHtml(template: string, route: RouteMeta, distDir: string) {
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name=["'](description|keywords|author|robots|googlebot|language)["'][^>]*>/gi, "")
    .replace(/<meta\s+http-equiv=["']content-language["'][^>]*>/gi, "")
    .replace(/<link\s+rel=["'](canonical|alternate)["'][^>]*>/gi, "")
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, "")
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, "")
    .replace(/<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, "")
    .replace(/<\/head>/i, `${buildHead(route)}\n  </head>`)
    .replace(/<div id="root"><\/div>/i, `<div id="root">${buildSeoBody(route)}</div>`);
  const outPath = route.path === "/" ? resolve(distDir, "index.html") : resolve(distDir, route.path.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, "utf-8");
}

export function prerenderRoutes(distDir = "dist") {
  const indexPath = resolve(distDir, "index.html");
  if (!existsSync(indexPath)) {
    console.warn(`[prerender] ${indexPath} não encontrado — pulando.`);
    return;
  }
  const template = readFileSync(indexPath, "utf-8");
  allSeoRoutes.forEach((route) => writeRouteHtml(template, route, distDir));
  writeFileSync(resolve(distDir, "sitemap.xml"), buildSitemap(allSeoRoutes), "utf-8");
  console.log(`[prerender] ${allSeoRoutes.length} HTMLs gerados + sitemap.xml expansivo`);
}
