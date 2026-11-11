import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";

export const metadata: Metadata = { title: "Sobre o projeto — Plin" };

const BEFORE_AFTER = [
  ["Chave da API no navegador", "Proxy em /api/weather: a chave só existe no servidor"],
  ["Erro de hidratação (SSR x cliente)", "Leitura do localStorage só dentro de efeitos"],
  [
    "`latitude & longitude` (AND bit a bit) para validar localização",
    "Validação explícita de coordenadas, com testes",
  ],
  ["Respostas da API usadas sem checar o formato", "Schemas Zod no servidor e no cliente"],
  ["Sem testes", "Testes unitários (Vitest) e E2E (Playwright), rodando no CI"],
  ["QueryClient recriado a cada render", "Um único client por sessão (TanStack Query v5)"],
] as const;

const STACK = [
  "Next.js 14 (App Router)",
  "TypeScript",
  "Tailwind + shadcn/ui",
  "TanStack Query",
  "Zod",
  "Leaflet",
  "Vitest",
  "Playwright",
  "Docker",
  "GitHub Actions",
];

export default function Sobre() {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <PageTitle
        title="Sobre o projeto"
        subtitle="Um desafio técnico transformado em projeto de portfólio."
      />

      <section className="space-y-3">
        <h2 className="text-2xl font-extrabold tracking-tight">De onde veio</h2>
        <p className="text-muted-foreground">
          O Plin nasceu como um <strong className="text-foreground">teste técnico</strong>: um app que mostra
          a previsão do tempo pela geolocalização do usuário, descobre CEPs a partir de um endereço e tem um
          formulário de contato com validação. Por isso o app mistura temas que, num produto real, não
          ficariam juntos.
        </p>
        <p className="text-muted-foreground">
          Depois fiz uma refatoração completa: corrigi os problemas do código original, redesenhei a interface
          e acrescentei o que faltava para ficar no nível de um projeto de verdade.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold tracking-tight">Antes e depois</h2>
        <ul className="grid gap-3">
          {BEFORE_AFTER.map(([before, after]) => (
            <li key={before} className="grid gap-1 rounded-2xl border bg-card p-4 sm:grid-cols-2 sm:gap-6">
              <p className="text-sm text-muted-foreground line-through decoration-destructive/60">{before}</p>
              <p className="text-sm font-semibold">{after}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold tracking-tight">Decisões técnicas</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <strong className="text-foreground">Proxy com rate limit:</strong> clima, busca de cidades e tiles
            do mapa passam por rotas internas, com limite por IP e cache.
          </li>
          <li>
            <strong className="text-foreground">Aproveitando a API gratuita do OpenWeather:</strong> clima
            atual, previsão de 5 dias a cada 3 h (com chance de chuva), geocodificação, qualidade do ar e
            camadas do mapa.
          </li>
          <li>
            <strong className="text-foreground">Unidades no cliente:</strong> a API sempre responde em °C e
            m/s e a conversão para °F/km/h/mph acontece no navegador, então o cache vale para todos.
          </li>
          <li>
            <strong className="text-foreground">Segurança:</strong> CSP e demais headers no{" "}
            <code>next.config.js</code>.
          </li>
          <li>
            <strong className="text-foreground">Acessibilidade:</strong> navegação por teclado, rótulos ARIA e
            suporte aos temas claro e escuro.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-extrabold tracking-tight">Stack</h2>
        <ul className="flex flex-wrap gap-2">
          {STACK.map((t) => (
            <li key={t} className="rounded-full border bg-card px-4 py-1.5 text-sm font-semibold">
              {t}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
