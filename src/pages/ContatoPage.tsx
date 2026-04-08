import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Clock, Send, MapPin, Globe, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContatoPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Mensagem enviada!", description: "Responderemos em breve." });
  };

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col min-h-screen">
        <PageHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Buscar..." />

        <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Entre em Contato</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tem alguma dúvida, sugestão ou precisa de ajuda? Estamos aqui para você.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Info Cards */}
            <div className="space-y-4">
              {[
                { icon: Mail, title: "E-mail", desc: "contato@zipfontes.com.br", badge: "Principal" },
                { icon: Clock, title: "Horário", desc: "Seg-Sex, 9h às 18h", badge: "" },
                { icon: Globe, title: "Website", desc: "zipfontes.com.br", badge: "" },
                { icon: MapPin, title: "Localização", desc: "Brasil", badge: "" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                        {item.badge && <Badge className="text-[10px] px-2 py-0">{item.badge}</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="md:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Envie sua mensagem</h2>
              </div>

              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Mensagem enviada com sucesso!</h3>
                  <p className="text-muted-foreground">Agradecemos seu contato. Responderemos o mais breve possível.</p>
                  <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
                    Enviar outra mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1.5 block">Nome completo</label>
                      <Input placeholder="Seu nome" required value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1.5 block">E-mail</label>
                      <Input type="email" placeholder="seu@email.com" required value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Assunto</label>
                    <Input placeholder="Sobre o que deseja falar?" required value={formData.subject} onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Mensagem</label>
                    <Textarea placeholder="Descreva sua dúvida, sugestão ou problema..." rows={5} required value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" /> Enviar mensagem
                  </Button>
                </form>
              )}
            </div>
          </div>
        </main>

        <PageFooter />
      </div>
    </AppLayout>
  );
};

export default ContatoPage;
