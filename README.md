# Plin Challenge

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white">
  <img alt="Vitest" src="https://img.shields.io/badge/unit-Vitest-6E9F18?logo=vitest&logoColor=white">
  <img alt="Docker" src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white">
</p>

App de clima e rastreamento: previsão do tempo por geolocalização, busca de endereço por CEP e formulário de cadastro.
Originalmente um desafio técnico, refatorado para portfólio.

## Páginas

| Rota | O que faz |
|---|---|
| `/` | Início |
| `/climate` | Clima de hoje e previsão da semana |
| `/Tracking` | Rastreamento com mapa |
| `/register` | Cadastro com validação e busca de CEP |

## Decisões técnicas

- **Chave da API fora do navegador:** o clima passa pela rota `/api/weather`, que valida as coordenadas e fala com a OpenWeather só no servidor, com cache de 10 min.
- **Lógica separada da UI:** regras puras em `lib/` (`cep`, `contact`, `location`, `weather`), cobertas por testes unitários com Vitest.
- **Qualidade:** Prettier, ESLint, `tsc` e GitHub Actions (`format:check`, `lint`, `typecheck`, `test`, `build`) mais Dependabot.

## Rodando

```bash
cp .env.example .env   # preencha OPENWEATHER_API_KEY (gratuita em openweathermap.org/api)
npm ci
npm run dev            # http://localhost:3000
```

### Com Docker

```bash
cp .env.example .env
docker compose -f docker-compose.dev.yml up --build   # http://localhost:3100
```

A porta do host é `WEB_PORT_HOST` (padrão 3100, escolhida para não colidir com os outros projetos).

## Scripts

| Comando | Função |
|---|---|
| `npm run dev` / `build` / `start` | Next.js |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest |
| `npm run format` / `format:check` | Prettier |
