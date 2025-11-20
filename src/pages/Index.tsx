import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Mail, LogIn } from "lucide-react";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: "Email é obrigatório" })
    .email({ message: "Email inválido" })
    .max(255, { message: "Email deve ter menos de 255 caracteres" }),
  password: z
    .string()
    .trim()
    .nonempty({ message: "Senha é obrigatória" })
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
    .max(100, { message: "Senha deve ter menos de 100 caracteres" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    // Simula uma chamada de API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success(`Bem-vindo! Login realizado com ${data.email}`);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Bem-vindo</h1>
            <p className="text-muted-foreground">Entre com suas credenciais</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-ring"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-ring"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
                />
                <span className="text-muted-foreground">Lembrar-me</span>
              </label>
              <a href="#" className="text-primary hover:underline">
                Esqueceu a senha?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Entrando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Entrar
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              Criar conta
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2024 Seu App. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default Index;
