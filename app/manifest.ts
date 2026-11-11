import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Plin — Clima, CEP e Contato",
    short_name: "Plin",
    description: "Previsão do tempo por geolocalização, busca de CEP e formulário de contato.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0914",
    theme_color: "#7c3aed",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
