import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Search, Download, Type, Palette, Smile, Shield, Globe, Zap } from "lucide-react";

const faqCategories = [
  {
    title: "Fontes",
    icon: Type,
    badge: "Popular",
    questions: [
      {
        q: "Como faço para baixar uma fonte?",
        a: "Para baixar uma fonte, navegue até a página de Fontes, encontre a fonte desejada usando a busca ou os filtros disponíveis. Clique no botão de download ao lado da fonte escolhida. O arquivo será baixado no formato TTF ou OTF, pronto para instalação no seu sistema operacional."
      },
      {
        q: "As fontes do Zip Fontes são gratuitas para uso comercial?",
        a: "A maioria das fontes disponíveis no Zip Fontes são do Google Fonts, que oferece fontes de código aberto sob a licença SIL Open Font License ou Apache License 2.0. Isso significa que você pode usá-las livremente em projetos pessoais e comerciais, incluindo websites, aplicativos, impressos e produtos digitais."
      },
      {
        q: "Como instalo uma fonte no meu computador?",
        a: "No Windows: clique com o botão direito no arquivo da fonte e selecione 'Instalar'. No macOS: dê dois cliques no arquivo e clique em 'Instalar Fonte'. No Linux: copie o arquivo para ~/.fonts ou /usr/share/fonts e execute 'fc-cache -fv' no terminal. Após a instalação, reinicie os aplicativos para que a nova fonte apareça."
      },
      {
        q: "Posso usar as fontes em meu site ou aplicativo?",
        a: "Sim! Você pode incorporar as fontes diretamente via CSS usando @font-face ou através do Google Fonts CDN. Para aplicativos móveis, inclua os arquivos de fonte no bundle do seu projeto. Todas as fontes do Google Fonts são otimizadas para uso na web com formatos WOFF2 e WOFF."
      },
      {
        q: "O que significa o peso (weight) de uma fonte?",
        a: "O peso da fonte indica a espessura dos caracteres. Os valores variam de 100 (Thin/Fina) a 900 (Black/Preta). Os pesos mais comuns são: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold). Usar diferentes pesos ajuda a criar hierarquia visual em seus designs."
      },
    ]
  },
  {
    title: "Ícones",
    icon: Search,
    badge: "Novo",
    questions: [
      {
        q: "Em quais formatos posso baixar os ícones?",
        a: "Os ícones estão disponíveis para download em dois formatos: PNG (imagem rasterizada em alta resolução, ideal para apresentações e documentos) e SVG (gráfico vetorial escalável, ideal para websites e aplicativos pois mantém a qualidade em qualquer tamanho sem aumentar o peso do arquivo)."
      },
      {
        q: "Posso personalizar as cores e tamanhos dos ícones?",
        a: "Sim! Na página de Ícones, você encontra o painel de configurações onde pode ajustar o tamanho (de 16px a 128px), a espessura do traço, a cor de preenchimento e a cor do contorno. As alterações são aplicadas em tempo real no preview antes do download."
      },
      {
        q: "Os ícones são compatíveis com o Figma e outros editores?",
        a: "Absolutamente! Os ícones em formato SVG podem ser importados diretamente no Figma, Sketch, Adobe XD, Illustrator e qualquer outro editor de design. Eles mantêm todas as propriedades editáveis como cor, tamanho e espessura de traço."
      },
      {
        q: "Quantos ícones estão disponíveis na biblioteca?",
        a: "Nossa biblioteca conta com mais de 1.500 ícones da coleção Lucide, organizados em categorias como Interface, Navegação, Mídia, Comunicação, Finanças, Clima e muitas outras. Novos ícones são adicionados regularmente com cada atualização da biblioteca."
      },
    ]
  },
  {
    title: "Emojis",
    icon: Smile,
    badge: "",
    questions: [
      {
        q: "Posso copiar emojis diretamente para usar em redes sociais?",
        a: "Sim! Basta clicar no emoji desejado na página de Emojis e ele será automaticamente copiado para a área de transferência. Depois, cole em qualquer rede social, aplicativo de mensagens, documento ou campo de texto. Os emojis são compatíveis com todas as plataformas."
      },
      {
        q: "Os emojis aparecem diferentes em cada dispositivo?",
        a: "Sim, cada sistema operacional (Apple, Google, Samsung, Microsoft) possui seu próprio design de emojis. O código Unicode é o mesmo, mas a aparência visual pode variar. No Zip Fontes, mostramos a versão padrão do seu navegador/sistema operacional."
      },
      {
        q: "Qual a diferença entre emoji e emoticon?",
        a: "Emoticons são representações feitas com caracteres de texto, como :-) ou :D. Já os emojis são pequenas imagens padronizadas pelo Unicode Consortium, como 😀 ou ❤️. Os emojis são universais e renderizados como imagens por cada plataforma, enquanto emoticons são puramente textuais."
      },
    ]
  },
  {
    title: "Cores",
    icon: Palette,
    badge: "",
    questions: [
      {
        q: "Como funciona o gerador de paletas de cores?",
        a: "O gerador de paletas permite explorar combinações harmoniosas de cores. Você pode filtrar por tonalidade (quente, fria, neutra), copiar códigos HEX, RGB e HSL com um clique, e visualizar como as cores funcionam juntas. É ideal para designers, desenvolvedores e criativos que buscam inspiração cromática."
      },
      {
        q: "Posso usar as paletas de cores em meus projetos comerciais?",
        a: "Sim! As cores não possuem direitos autorais, portanto você pode usar qualquer paleta ou combinação de cores livremente em seus projetos pessoais e comerciais, incluindo branding, web design, impressos e produtos digitais."
      },
    ]
  },
  {
    title: "Insta Fonts",
    icon: Globe,
    badge: "Popular",
    questions: [
      {
        q: "O que são as Insta Fonts?",
        a: "As Insta Fonts são estilos tipográficos especiais criados com caracteres Unicode. Elas permitem transformar texto comum em estilos decorativos como 𝓬𝓾𝓻𝓼𝓲𝓿𝓸, 𝕕𝕦𝕡𝕝𝕠, ᴘᴇǫᴜᴇɴᴏ e outros. São perfeitas para biografias, legendas e comentários em redes sociais como Instagram, Twitter e TikTok."
      },
      {
        q: "As Insta Fonts funcionam em todas as redes sociais?",
        a: "As Insta Fonts funcionam na maioria das redes sociais e aplicativos que suportam Unicode, incluindo Instagram, Twitter/X, Facebook, TikTok, WhatsApp e Telegram. Porém, alguns caracteres especiais podem não ser renderizados em plataformas mais antigas ou em certos dispositivos."
      },
      {
        q: "Como usar as Insta Fonts?",
        a: "É muito simples: digite seu texto no campo de entrada na página Insta Fonts, escolha o estilo desejado entre as opções disponíveis, e clique para copiar o texto estilizado. Depois, basta colar onde desejar — na bio do Instagram, em legendas, stories ou qualquer outra plataforma."
      },
    ]
  },
  {
    title: "Geral",
    icon: Zap,
    badge: "",
    questions: [
      {
        q: "O Zip Fontes é gratuito?",
        a: "Sim, o Zip Fontes é uma plataforma completamente gratuita. Todas as fontes, ícones, emojis, paletas de cores e ferramentas de Insta Fonts estão disponíveis sem custo algum. Não é necessário criar conta ou fazer login para acessar os recursos."
      },
      {
        q: "Preciso criar uma conta para usar o site?",
        a: "Não é necessário criar conta para acessar e utilizar qualquer recurso do Zip Fontes. Todas as funcionalidades, downloads e ferramentas estão disponíveis imediatamente, sem registro ou login. Navegue, explore e baixe livremente!"
      },
      {
        q: "O site funciona em dispositivos móveis?",
        a: "Sim! O Zip Fontes é totalmente responsivo e funciona em smartphones, tablets e desktops. A interface se adapta automaticamente ao tamanho da tela, garantindo uma experiência fluida em qualquer dispositivo. Todas as funcionalidades estão disponíveis em todas as plataformas."
      },
      {
        q: "Com que frequência o conteúdo é atualizado?",
        a: "Atualizamos regularmente nossa base de fontes, ícones e recursos. As fontes são sincronizadas com o Google Fonts, que adiciona novas famílias tipográficas periodicamente. Os ícones seguem as atualizações da biblioteca Lucide. Nosso objetivo é manter o acervo sempre atual e relevante."
      },
      {
        q: "Como posso reportar um problema ou sugerir melhorias?",
        a: "Você pode entrar em contato conosco através da página de Contato ou da seção Ajuda e Suporte. Valorizamos o feedback dos nossos usuários e estamos sempre trabalhando para melhorar a plataforma. Sugestões de novos recursos, relatos de bugs e ideias são sempre bem-vindos!"
      },
    ]
  },
];

const FaqPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  const totalQuestions = faqCategories.reduce((acc, cat) => acc + cat.questions.length, 0);

  return (
    <>
      <Helmet>
        <title>FAQ - Zip Fontes</title>
        <meta name="description" content="Encontre respostas para as dúvidas mais comuns sobre fontes, ícones, emojis e todas as ferramentas do Zip Fontes." />
        <link rel="canonical" href="https://zip-fontes.lovable.app/faq" />
      </Helmet>
      <AppLayout activeItem="FAQ">
      <div className="flex-1 flex flex-col min-h-screen">
        <PageHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Buscar perguntas frequentes..."
        />

        <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Perguntas Frequentes</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Encontre respostas para as dúvidas mais comuns sobre fontes, ícones, emojis e todas as ferramentas do Zip Fontes.
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <Badge variant="secondary" className="text-xs">{totalQuestions} perguntas</Badge>
              <Badge variant="secondary" className="text-xs">{faqCategories.length} categorias</Badge>
            </div>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {filteredCategories.map((category, catIndex) => (
              <section key={catIndex} className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                {/* Category Header */}
                <div className="flex items-center gap-3 px-6 py-4 bg-muted/30 border-b border-border">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">{category.title}</h2>
                  {category.badge && (
                    <Badge className="text-[10px] px-2 py-0">{category.badge}</Badge>
                  )}
                  <span className="ml-auto text-xs text-muted-foreground">{category.questions.length} perguntas</span>
                </div>

                {/* Questions */}
                <Accordion type="multiple" className="px-6">
                  {category.questions.map((item, qIndex) => (
                    <AccordionItem key={qIndex} value={`${catIndex}-${qIndex}`} className="border-border/50">
                      <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline hover:text-primary py-4">
                        <span className="text-left pr-4">{item.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhuma pergunta encontrada para "{searchQuery}"</p>
            </div>
          )}
        </main>

        <PageFooter />
      </div>
    </AppLayout>
    </>
  );
};

export default FaqPage;
