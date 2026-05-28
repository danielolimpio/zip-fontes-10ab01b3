import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock, Database, UserCheck, Bell, FileText, Globe, Server, Trash2 } from "lucide-react";

const sections = [
  {
    icon: Eye,
    title: "Informações que Coletamos",
    badge: "Transparência",
    items: [
      "Dados de navegação: páginas visitadas, tempo de permanência, cliques e interações com os recursos do site.",
      "Informações técnicas: endereço IP, tipo de navegador, sistema operacional, resolução de tela e idioma.",
      "Dados de uso: fontes baixadas, ícones visualizados, emojis copiados e paletas de cores acessadas.",
      "Cookies e tecnologias similares: utilizamos cookies para melhorar sua experiência (veja nossa Política de Cookies).",
      "Informações fornecidas voluntariamente: nome, e-mail e mensagem quando você usa o formulário de contato."
    ]
  },
  {
    icon: Database,
    title: "Como Usamos seus Dados",
    badge: "",
    items: [
      "Melhorar e otimizar a experiência de navegação e funcionalidades do site.",
      "Analisar padrões de uso para desenvolver novos recursos e melhorias.",
      "Gerar estatísticas anônimas e agregadas sobre o uso da plataforma.",
      "Responder a mensagens e solicitações enviadas pelo formulário de contato.",
      "Garantir a segurança e prevenir uso indevido da plataforma."
    ]
  },
  {
    icon: Lock,
    title: "Proteção dos Dados",
    badge: "Segurança",
    items: [
      "Utilizamos protocolo HTTPS para criptografar todas as comunicações entre seu navegador e nossos servidores.",
      "Implementamos medidas técnicas e organizacionais para proteger contra acesso não autorizado.",
      "Realizamos backups regulares e monitoramento de segurança contínuo.",
      "Limitamos o acesso aos dados pessoais apenas a funcionários que necessitam para suas funções."
    ]
  },
  {
    icon: UserCheck,
    title: "Seus Direitos (LGPD)",
    badge: "LGPD",
    items: [
      "Confirmação e acesso: solicitar informações sobre o tratamento dos seus dados pessoais.",
      "Correção: solicitar a correção de dados incompletos, inexatos ou desatualizados.",
      "Anonimização ou eliminação: solicitar a anonimização ou exclusão de dados desnecessários.",
      "Portabilidade: solicitar a transferência dos seus dados a outro fornecedor de serviço.",
      "Revogação do consentimento: revogar seu consentimento a qualquer momento."
    ]
  },
  {
    icon: Globe,
    title: "Compartilhamento de Dados",
    badge: "",
    items: [
      "Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais.",
      "Podemos compartilhar dados com provedores de serviço que nos auxiliam na operação do site (hospedagem, analytics).",
      "Podemos divulgar informações quando exigido por lei ou ordem judicial."
    ]
  },
  {
    icon: Trash2,
    title: "Retenção e Exclusão",
    badge: "",
    items: [
      "Mantemos dados de navegação por até 26 meses para fins analíticos.",
      "Dados de contato são mantidos pelo tempo necessário para responder à sua solicitação.",
      "Você pode solicitar a exclusão dos seus dados a qualquer momento através da página de Contato."
    ]
  },
  {
    icon: Bell,
    title: "Atualizações desta Política",
    badge: "",
    items: [
      "Esta política pode ser atualizada periodicamente para refletir mudanças em nossas práticas.",
      "Recomendamos que você revise esta página regularmente para se manter informado.",
      "A data da última atualização está sempre indicada ao final desta página."
    ]
  }
];

const PrivacidadePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Helmet>
        <title>Privacidade - Zip Fontes</title>
        <meta name="description" content="Política de privacidade do Zip Fontes. Saiba como coletamos, usamos e protegemos suas informações." />
        <link rel="canonical" href="https://zip-fontes.lovable.app/privacidade" />
      </Helmet>
      <AppLayout>
      <div className="flex-1 flex flex-col min-h-screen">
        <PageHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Buscar..." />

        <main className="flex-1 p-8 max-w-4xl mx-auto w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Política de Privacidade</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sua privacidade é importante para nós. Esta política descreve como coletamos, usamos e protegemos suas informações.
            </p>
            <Badge variant="secondary" className="mt-3 text-xs">Última atualização: Abril 2025</Badge>
          </div>

          <div className="space-y-6">
            {sections.map((section, i) => (
              <div key={i} className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 bg-muted/30 border-b border-border">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-base font-semibold text-foreground">{section.title}</h2>
                  {section.badge && <Badge className="text-[10px] px-2 py-0">{section.badge}</Badge>}
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </main>

        <PageFooter />
      </div>
    </AppLayout>
    </>
  );
};

export default PrivacidadePage;
