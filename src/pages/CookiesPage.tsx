import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { Badge } from "@/components/ui/badge";
import { Cookie, Settings, BarChart3, Shield, Clock, ToggleLeft } from "lucide-react";

const cookieTypes = [
  {
    icon: Shield,
    title: "Cookies Essenciais",
    badge: "Obrigatório",
    badgeVariant: "default" as const,
    description: "Necessários para o funcionamento básico do site. Sem eles, o site não funciona corretamente.",
    cookies: [
      { name: "session_id", purpose: "Manter sua sessão de navegação ativa", duration: "Sessão", type: "Funcional" },
      { name: "dark_mode", purpose: "Salvar sua preferência de tema claro/escuro", duration: "1 ano", type: "Preferência" },
      { name: "cookie_consent", purpose: "Registrar sua escolha sobre cookies", duration: "1 ano", type: "Funcional" },
    ]
  },
  {
    icon: BarChart3,
    title: "Cookies de Análise",
    badge: "Opcional",
    badgeVariant: "secondary" as const,
    description: "Nos ajudam a entender como os visitantes interagem com o site, coletando informações anônimas.",
    cookies: [
      { name: "_ga", purpose: "Distinguir usuários no Google Analytics", duration: "2 anos", type: "Análise" },
      { name: "_ga_*", purpose: "Manter o estado da sessão", duration: "2 anos", type: "Análise" },
      { name: "_gid", purpose: "Distinguir usuários no Google Analytics", duration: "24 horas", type: "Análise" },
    ]
  },
  {
    icon: Settings,
    title: "Cookies de Funcionalidade",
    badge: "Opcional",
    badgeVariant: "secondary" as const,
    description: "Permitem funcionalidades avançadas e personalização, como idioma preferido e região.",
    cookies: [
      { name: "font_preferences", purpose: "Salvar filtros e preferências de fontes", duration: "6 meses", type: "Personalização" },
      { name: "recent_downloads", purpose: "Registrar itens baixados recentemente", duration: "30 dias", type: "Personalização" },
    ]
  },
];

const CookiesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Helmet>
        <title>Cookies - Zip Fontes</title>
        <meta name="description" content="Política de cookies do Zip Fontes. Saiba quais cookies usamos e como gerenciar suas preferências." />
        <link rel="canonical" href="https://zip-fontes.lovable.app/cookies" />
      </Helmet>
      <AppLayout>
      <div className="flex-1 flex flex-col min-h-screen">
        <PageHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Buscar..." />

        <main className="flex-1 p-8 max-w-4xl mx-auto w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <Cookie className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Política de Cookies</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Utilizamos cookies para melhorar sua experiência. Saiba quais cookies usamos e como você pode gerenciá-los.
            </p>
            <Badge variant="secondary" className="mt-3 text-xs">Última atualização: Abril 2025</Badge>
          </div>

          {/* What are cookies */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm mb-8">
            <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <Cookie className="w-5 h-5 text-primary" /> O que são cookies?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cookies são pequenos arquivos de texto armazenados no seu navegador quando você visita um site. 
              Eles permitem que o site se lembre de suas preferências, melhore o desempenho e forneça uma experiência personalizada. 
              Os cookies não contêm vírus e não acessam informações do seu computador.
            </p>
          </div>

          {/* Cookie Types */}
          <div className="space-y-6">
            {cookieTypes.map((type, i) => (
              <div key={i} className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 bg-muted/30 border-b border-border">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <type.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-semibold text-foreground">{type.title}</h2>
                      <Badge variant={type.badgeVariant} className="text-[10px] px-2 py-0">{type.badge}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{type.description}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 text-xs font-medium text-muted-foreground">Cookie</th>
                          <th className="text-left py-2 text-xs font-medium text-muted-foreground">Finalidade</th>
                          <th className="text-left py-2 text-xs font-medium text-muted-foreground">Duração</th>
                          <th className="text-left py-2 text-xs font-medium text-muted-foreground">Tipo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {type.cookies.map((cookie, j) => (
                          <tr key={j} className="border-b border-border/50 last:border-0">
                            <td className="py-3 font-mono text-xs text-foreground">{cookie.name}</td>
                            <td className="py-3 text-xs text-muted-foreground">{cookie.purpose}</td>
                            <td className="py-3"><Badge variant="outline" className="text-[10px]">{cookie.duration}</Badge></td>
                            <td className="py-3"><Badge variant="secondary" className="text-[10px]">{cookie.type}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How to manage */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm mt-8">
            <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <ToggleLeft className="w-5 h-5 text-primary" /> Como gerenciar cookies
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Você pode controlar e/ou excluir cookies conforme desejar. A maioria dos navegadores permite:
            </p>
            <ul className="space-y-2">
              {[
                "Visualizar os cookies armazenados e excluí-los individualmente.",
                "Bloquear cookies de terceiros.",
                "Bloquear cookies de sites específicos.",
                "Bloquear todos os cookies.",
                "Excluir todos os cookies ao fechar o navegador."
              ].map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </main>

        <PageFooter />
      </div>
    </AppLayout>
    </>
  );
};

export default CookiesPage;
