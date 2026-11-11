import PageTitle from "@/components/layout/PageTitle";
import { CardForm } from "@/components/personal/CardForm";

export default function Register() {
  return (
    <div className="mx-auto max-w-xl">
      <PageTitle title="Contato" subtitle="Dúvida, sugestão ou feedback? Escreva por aqui." />
      <CardForm />
    </div>
  );
}
