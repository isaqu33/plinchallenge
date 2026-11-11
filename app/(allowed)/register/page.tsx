import PageTitle from "@/components/layout/PageTitle";
import { CardForm } from "@/components/personal/CardForm";

export default function Register() {
  return (
    <div className="mx-auto max-w-xl">
      <PageTitle
        title="Contato"
        subtitle="Este formulário vem do desafio técnico original, em que o app precisava de um formulário com validação. Aqui o envio é simulado: nada sai do seu navegador."
      />
      <CardForm />
    </div>
  );
}
