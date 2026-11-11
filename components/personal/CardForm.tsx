"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { contactSchema, type ContactForm } from "@/lib/contact";

function FieldError({ message }: { message?: string }) {
  return message ? (
    <p role="alert" className="text-sm text-destructive">
      {message}
    </p>
  ) : null;
}

export function CardForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema), mode: "onChange" });

  // Projeto de demonstração: não há backend de e-mail; o envio é simulado.
  function onSubmit(data: ContactForm) {
    toast({
      title: "Mensagem registrada",
      description: `Obrigado, ${data.nome}! (envio simulado nesta demo)`,
    });
    reset();
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Card className="shadow-xl shadow-primary/5">
        <CardHeader>
          <CardTitle>Fale conosco</CardTitle>
          <CardDescription>
            Dúvida, sugestão ou feedback? Preencha o formulário. Nome, e-mail e motivo são obrigatórios; o
            anexo (PDF de até 2 MB) é opcional.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" placeholder="Seu nome completo" {...register("nome")} />
            <FieldError message={errors.nome?.message} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="voce@exemplo.com" {...register("email")} />
            <FieldError message={errors.email?.message} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="motivo">Motivo do contato</Label>
            <Textarea
              id="motivo"
              placeholder="Escreva aqui o motivo do seu contato"
              {...register("motivo")}
            />
            <FieldError message={errors.motivo?.message} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="anexo">Arquivo anexo (PDF)</Label>
            <Input id="anexo" type="file" accept=".pdf" {...register("anexo")} />
            <FieldError message={errors.anexo?.message} />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="rounded-full px-6" disabled={!isValid}>
            Enviar
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
