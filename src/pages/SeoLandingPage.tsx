import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, Search } from "lucide-react";
import { BASE_URL, findSeoRoute, relatedSeoRoutes, slugifyKeyword } from "@/lib/seoData";

interface SeoLandingPageProps {
  legacyFontPath?: boolean;
}

const labelFromSlug = (slug: string) =>
  slug.split("-").filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");

const SeoLandingPage = ({ legacyFontPath = false }: SeoLandingPageProps) => {
  const { slug = "" } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const canonicalSlug = slugifyKeyword(slug || "fontes-gratis");
  const path = `/fontes/${canonicalSlug}`;
  const related = useMemo(() => relatedSeoRoutes(path, 12), [path]);

  if (legacyFontPath) return <Navigate to={`/fontes/${canonicalSlug}`} replace />;

  const page = findSeoRoute(path);
  const fallbackTitle = labelFromSlug(canonicalSlug);
  const meta = page ?? {
    path,
    title: `${fallbackTitle} — Fontes Grátis para Download`,
    description: `Encontre informações sobre ${fallbackTitle.toLowerCase()}, fontes grátis, download de fontes TTF e OTF, uso comercial e recursos do Zip Fontes.`,
    keywords: [fallbackTitle.toLowerCase(), `baixar ${fallbackTitle.toLowerCase()}`, `${fallbackTitle.toLowerCase()} grátis`],
    h1: fallbackTitle,
    intro: `Página de descoberta para ${fallbackTitle.toLowerCase()} no Zip Fontes, com acesso ao catálogo de fontes gratuitas, gerador de letras, ícones, emojis e paletas.`,
    sections: [{ h2: `Pesquisar ${fallbackTitle.toLowerCase()}`, p: "Use o catálogo principal para buscar fontes por nome, estilo ou aplicação e visualizar cada opção com seu próprio texto." }],
  };
  const canonical = `${BASE_URL}${meta.path}`;

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords.join(", ")} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE_URL}/favicon.png`} />
      </Helmet>
      <AppLayout activeItem="Fonts">
        <main className="flex-1 min-h-screen bg-background flex flex-col">
          <PageHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Buscar fontes..." />
          <div className="px-6 py-8 flex-1">
            <div className="max-w-5xl">
              <Badge variant="secondary" className="mb-4">Guia de fontes</Badge>
              <h1 className="text-3xl font-semibold text-foreground tracking-normal mb-4">{meta.h1}</h1>
              <p className="text-base text-muted-foreground leading-7 max-w-3xl">{meta.intro}</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Button asChild><Link to="/"><Download className="w-4 h-4 mr-2" />Ver catálogo de fontes</Link></Button>
                <Button variant="outline" asChild><Link to="/insta-fonts"><Search className="w-4 h-4 mr-2" />Gerar letras estilizadas</Link></Button>
              </div>
              <div className="grid gap-6 mt-10 md:grid-cols-2">
                {meta.sections.map((section) => (
                  <section key={section.h2} className="border-b border-border pb-6">
                    <h2 className="text-lg font-semibold text-foreground mb-2">{section.h2}</h2>
                    <p className="text-sm text-muted-foreground leading-6">{section.p}</p>
                    {section.list ? <ul className="mt-3 space-y-1 text-sm text-muted-foreground">{section.list.map((item) => <li key={item}>• {item}</li>)}</ul> : null}
                  </section>
                ))}
              </div>
              <section className="mt-10">
                <h2 className="text-lg font-semibold text-foreground mb-4">Termos relacionados</h2>
                <div className="flex flex-wrap gap-2">
                  {related.map((route) => (
                    <Link key={route.path} to={route.path} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                      {route.h1}<ArrowRight className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
          <PageFooter />
        </main>
      </AppLayout>
    </>
  );
};

export default SeoLandingPage;
