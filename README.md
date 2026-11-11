# Plin

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white">
  <img alt="Vitest" src="https://img.shields.io/badge/unit-Vitest-6E9F18?logo=vitest&logoColor=white">
  <img alt="Playwright" src="https://img.shields.io/badge/e2e-Playwright-2EAD33?logo=playwright&logoColor=white">
  <img alt="Docker" src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white">
</p>

App de **clima**, **busca de CEP** e **contato**, com modo claro/escuro. Nasceu como um **desafio técnico** (previsão do
tempo por geolocalização + CEP + formulário com validação) e foi refatorado do zero para portfólio. Por isso o
formulário de contato continua lá: ele faz parte do enunciado original, e o envio é simulado.

## Funcionalidades

| Área | O que tem |
|---|---|
| **Clima** | Temperatura, sensação, umidade, vento (direção e rajadas), pressão, visibilidade e nuvens; fundo que muda conforme o tempo e a hora |
| **Previsão** | Próximas 24 h (a cada 3 h) e próximos dias, com mínima, máxima e **chance de chuva** |
| **Qualidade do ar** | Índice 1–5 e poluentes (PM2,5, PM10, O₃, NO₂) |
| **Mapa do tempo** | Leaflet + camadas de chuva, nuvens, temperatura e vento |
| **Cidades** | Busca por nome (geocodificação), favoritos salvos no navegador; funciona sem GPS |
| **Unidades** | °C/km/h ou °F/mph, lembrando a escolha |
| **CEP** | Por CEP ou por endereço, com copiar e abrir no mapa |
| **Sobre** | Origem do projeto, antes e depois, decisões técnicas |

Usa só o que o plano gratuito do OpenWeather oferece: clima atual, previsão 5 dias/3 h, geocodificação, qualidade do
ar e tiles de mapa. (O _One Call 3.0_ exige cartão e não é usado.)

## Decisões técnicas

- **Chave fora do navegador:** `/api/weather`, `/api/geocode` e `/api/tiles/...` são proxies; a chave só existe no servidor.
- **Rate limit** por IP nas três rotas (`lib/rate-limit.ts`) e cache (`s-maxage`, `revalidate`).
- **Zod** valida a resposta do provedor no servidor e de novo no cliente (`lib/schemas.ts`).
- **Unidades no cliente:** a API sempre responde em °C e m/s; assim o cache serve todo mundo.
- **Fuso da cidade:** horários de nascer/pôr do sol e da previsão usam o fuso do local, não o do navegador.
- **Segurança:** CSP, `X-Frame-Options`, `nosniff`, `Referrer-Policy` e `Permissions-Policy` em `next.config.js`.
- **TanStack Query v5**, um único `QueryClient` por sessão; sem erro de hidratação (storage lido só em efeitos).
- **Docker:** imagem de dev e imagem de produção _multi-stage_ (`output: standalone`, usuário sem privilégios, healthcheck).

## Rodando

```bash
cp .env.example .env   # preencha OPENWEATHER_API_KEY (gratuita em openweathermap.org/api)
npm ci
npm run dev            # http://localhost:3000
```

### Docker

```bash
# desenvolvimento (hot reload) — http://localhost:3100
docker compose -f docker-compose.dev.yml up --build

# imagem de produção, localmente
docker compose -f docker-compose.prod.yml up --build
```

A porta do host é `WEB_PORT_HOST` (padrão 3100, escolhida para não colidir com os outros projetos).

## Testes e qualidade

| Comando | Função |
|---|---|
| `npm test` | Unitários (Vitest): unidades, rate limit, favoritos, CEP, previsão, fuso, céu |
| `npm run test:e2e` | E2E (Playwright) com as APIs externas interceptadas — não precisa de chave nem de rede |
| `npm run lint` / `typecheck` | ESLint e `tsc --noEmit` |
| `npm run format` / `format:check` | Prettier |

Se o Chromium do Playwright não estiver instalado, rode `npx playwright install chromium`, ou use o Chrome do
sistema com `PW_CHANNEL=chrome npm run test:e2e`. O CI (GitHub Actions) roda tudo isso a cada push.

## Estrutura

```
app/            rotas (páginas e /api)
components/     layout, personal (telas) e ui (shadcn)
lib/            regras puras: schemas, unidades, clima, CEP, rate limit, favoritos
tests/          unit (Vitest) e e2e (Playwright)
```
