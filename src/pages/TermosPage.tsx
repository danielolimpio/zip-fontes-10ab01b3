import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { Badge } from "@/components/ui/badge";
import { FileText, Scale, AlertTriangle, Copyright, Ban, RefreshCw, Gavel, CheckSquare } from "lucide-react";

const sections = [
  {
    icon: CheckSquare,
    title: "Aceitação dos Termos",
    badge: "Importante",
    content: "Ao acessar e utilizar o Zip Fontes, você concorda com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, solicitamos que não utilize nossos serviços. O uso continuado do site após a publicação de alterações constitui aceitação dos novos termos."
  },
  {
    icon: FileText,
    title: "Descrição dos Serviços",
    badge: "",
    content: "O Zip Fontes é uma plataforma gratuita que oferece acesso a fontes tipográficas (via Google Fonts API), ícones vetoriais (biblioteca Lucide), emojis Unicode, paletas de cores e gerador de fontes estilizadas para redes sociais. Todos os recursos são disponibilizados sem custo e sem necessidade de cadastro."
  },
  {
    icon: Copyright,
    title: "Propriedade Intelectual e Licenças",
    badge: "Licenças",
    items: [
      "As fontes disponíveis são do Google Fonts, licenciadas sob SIL Open Font License ou Apache License 2.0, permitindo uso pessoal e comercial.",
      "Os ícones são da biblioteca Lucide, licenciada sob ISC License, permitindo uso livre em projetos pessoais e comerciais.",
      "Os emojis seguem o padrão Unicode e são renderizados pelo sistema operacional do usuário.",
      "O layout, design e código-fonte do Zip Fontes são de propriedade exclusiva da plataforma e protegidos por leis de direitos autorais.",
      "As paletas de cores são de uso livre, pois cores não são passíveis de proteção por direitos autorais."
    ]
  },
  {
    icon: Ban,
    title: "Uso Proibido",
    badge: "Restrições",
    items: [
      "Utilizar robôs, scrapers ou ferramentas automatizadas para extrair conteúdo em massa do site.",
      "Tentar acessar áreas restritas do servidor ou realizar ataques de qualquer natureza.",
      "Redistribuir o conteúdo do site como se fosse de sua autoria.",
      "Utilizar o site para fins ilegais ou que violem direitos de terceiros.",
      "Sobrecarregar intencionalmente os servidores com requisições excessivas."
    ]
  },
  {
    icon: AlertTriangle,
    title: "Limitação de Responsabilidade",
    badge: "",
    content: "O Zip Fontes é fornecido \"como está\", sem garantias expressas ou implícitas. Não nos responsabilizamos por: indisponibilidade temporária do serviço, erros ou imprecisões no conteúdo, danos diretos ou indiretos decorrentes do uso do site, problemas de compatibilidade com sistemas de terceiros, ou alterações nas bibliotecas de fontes e ícones de terceiros."
  },
  {
    icon: Scale,
    title: "Isenção de Garantias",
    badge: "",
    content: "Embora nos esforcemos para manter informações precisas e atualizadas, não garantimos que o conteúdo esteja sempre livre de erros. As fontes e ícones são fornecidos por bibliotecas de terceiros (Google Fonts e Lucide) e podem ser alterados ou removidos a qualquer momento por seus respectivos mantenedores."
  },
  {
    icon: RefreshCw,
    title: "Modificações nos Termos",
    badge: "",
    content: "Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação nesta página. Recomendamos que você revise esta página periodicamente. A data da última atualização estará sempre indicada."
  },
  {
    icon: Gavel,
    title: "Legislação Aplicável",
    badge: "Jurídico",
    content: "Estes termos são regidos pela legislação brasileira. Qualquer disputa será submetida ao foro da comarca de domicílio do Zip Fontes, com renúncia expressa a qualquer outro, por mais privilegiado que seja."
  }
];

const TermosPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col min-h-screen">
        <PageHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Buscar..." />

        <main className="flex-1 p-8 max-w-4xl mx-auto w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Termos de Uso</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Leia atentamente os termos e condições de uso da plataforma Zip Fontes.
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
                  {section.content && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                  )}
                  {section.items && (
                    <ul className="space-y-3">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>

        <PageFooter />
      </div>
    </AppLayout>
  );
};

export default TermosPage;
