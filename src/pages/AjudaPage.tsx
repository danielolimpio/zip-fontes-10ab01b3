import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LifeBuoy, Download, Type, Palette, Smile, Grid3X3, Instagram, Monitor, Mail, BookOpen, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const guides = [
  {
    icon: Type,
    title: "Como usar as Fontes",
    badge: "Guia",
    steps: [
      "Acesse a página Fonts no menu lateral esquerdo.",
      "Use o campo de busca para encontrar uma fonte pelo nome ou use os filtros de categoria.",
      "Visualize a prévia da fonte digitando seu texto personalizado no campo de pré-visualização.",
      "Ajuste tamanho, peso e estilo usando o painel de configurações à direita.",
      "Clique no botão de download para baixar a fonte no formato desejado."
    ]
  },
  {
    icon: Grid3X3,
    title: "Como usar os Ícones",
    badge: "Guia",
    steps: [
      "Acesse a página Icons no menu lateral esquerdo.",
      "Navegue pelas categorias ou use a busca para encontrar o ícone desejado.",
      "Clique no ícone para ver os detalhes e opções de personalização.",
      "Ajuste tamanho, cor e espessura do traço no painel de configurações.",
      "Baixe o ícone em formato PNG ou SVG usando os botões de download."
    ]
  },
  {
    icon: Smile,
    title: "Como usar os Emojis",
    badge: "Guia",
    steps: [
      "Acesse a página Emojis no menu lateral esquerdo.",
      "Navegue pelas categorias (rostos, animais, comidas, etc.) ou busque pelo nome.",
      "Clique em qualquer emoji para copiá-lo automaticamente para a área de transferência.",
      "Cole o emoji em qualquer aplicativo, rede social ou documento."
    ]
  },
  {
    icon: Palette,
    title: "Como usar as Cores",
    badge: "Guia",
    steps: [
      "Acesse a página Cores no menu lateral esquerdo.",
      "Explore as paletas de cores organizadas por tonalidade e estilo.",
      "Clique em uma cor para copiar seu código HEX, RGB ou HSL.",
      "Use as cores copiadas em seus projetos de design, CSS ou qualquer editor."
    ]
  },
  {
    icon: Instagram,
    title: "Como usar as Insta Fonts",
    badge: "Guia",
    steps: [
      "Acesse a página Insta no menu lateral esquerdo.",
      "Digite o texto que deseja estilizar no campo de entrada.",
      "Escolha entre os diversos estilos disponíveis (cursivo, negrito, duplo, etc.).",
      "Clique no estilo desejado para copiar o texto transformado.",
      "Cole em biografias, legendas e comentários de redes sociais."
    ]
  },
];

const troubleshooting = [
  { q: "O site está lento ou não carrega", a: "Tente limpar o cache do navegador (Ctrl+Shift+Delete), desabilitar extensões que possam interferir, ou utilizar outro navegador. Verifique também sua conexão com a internet." },
  { q: "Não consigo baixar uma fonte ou ícone", a: "Verifique se seu navegador não está bloqueando downloads. Tente desabilitar o bloqueador de pop-ups temporariamente. Se o problema persistir, tente outro navegador." },
  { q: "Os emojis não aparecem corretamente", a: "A aparência dos emojis depende do seu sistema operacional e navegador. Atualize seu navegador para a versão mais recente para melhor compatibilidade Unicode." },
  { q: "O modo escuro não está funcionando", a: "Clique no ícone de lua/sol na barra lateral esquerda. Se a preferência não for salva, verifique se seu navegador permite localStorage." },
];

const AjudaPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Ajuda - Zip Fontes</title>
        <meta name="description" content="Guias passo a passo, solução de problemas e tudo que você precisa para aproveitar o Zip Fontes." />
        <link rel="canonical" href="https://zipfontes.com.br/ajuda" />
        <meta property="og:title" content="Ajuda - Zip Fontes" />
        <meta property="og:description" content="Guias passo a passo, solução de problemas e tudo que você precisa para aproveitar o Zip Fontes." />
        <meta property="og:url" content="https://zipfontes.com.br/ajuda" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://zipfontes.com.br/favicon.png" />
      </Helmet>
      <AppLayout>
      <div className="flex-1 flex flex-col min-h-screen">
        <PageHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Buscar ajuda..." />

        <main className="flex-1 p-8 max-w-4xl mx-auto w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <LifeBuoy className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Ajuda e Suporte</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Guias passo a passo, solução de problemas e tudo que você precisa para aproveitar ao máximo o Zip Fontes.
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <Badge variant="secondary" className="text-xs">{guides.length} guias</Badge>
              <Badge variant="secondary" className="text-xs">{troubleshooting.length} soluções</Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: BookOpen, label: "FAQ", desc: "Perguntas frequentes", href: "/faq" },
              { icon: Mail, label: "Contato", desc: "Fale conosco", href: "/contato" },
              { icon: Zap, label: "Novidades", desc: "Recursos recentes", href: "/" },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => navigate(item.href)}
                className="rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </button>
            ))}
          </div>

          {/* Guides */}
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-primary" /> Guias de Uso
          </h2>
          <div className="space-y-4 mb-10">
            {guides.map((guide, i) => (
              <div key={i} className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 bg-muted/30 border-b border-border">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <guide.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{guide.title}</h3>
                  <Badge className="text-[10px] px-2 py-0">{guide.badge}</Badge>
                </div>
                <div className="p-6">
                  <ol className="space-y-3">
                    {guide.steps.map((step, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {j + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>

          {/* Troubleshooting */}
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <LifeBuoy className="w-5 h-5 text-primary" /> Solução de Problemas
          </h2>
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden mb-10">
            <Accordion type="multiple" className="px-6">
              {troubleshooting.map((item, i) => (
                <AccordionItem key={i} value={`ts-${i}`}>
                  <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline hover:text-primary">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* CTA */}
          <div className="rounded-xl border border-border bg-primary/5 p-8 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Não encontrou o que procurava?</h3>
            <p className="text-sm text-muted-foreground mb-4">Entre em contato conosco e teremos prazer em ajudar.</p>
            <Button onClick={() => navigate("/contato")}>
              <Mail className="w-4 h-4 mr-2" /> Entrar em contato
            </Button>
          </div>
        </main>

        <PageFooter />
      </div>
    </AppLayout>
    </>
  );
};

export default AjudaPage;
