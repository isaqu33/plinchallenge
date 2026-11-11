"use client";

import { ArrowRight, CloudSun, Mail, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CitySearch from "@/components/personal/CitySearch";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/layout/ThemeToggle";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { saveLocation, type Coords } from "@/lib/location";

type Status = "loading" | "granted" | "denied" | "unsupported";

const FEATURES = [
  { Icon: CloudSun, title: "Clima", text: "Agora e nos próximos dias, onde você está." },
  { Icon: MapPin, title: "CEP", text: "Descubra o CEP pelo endereço." },
  { Icon: Mail, title: "Contato", text: "Fale comigo em poucos cliques." },
];

export default function Home() {
  const { push } = useRouter();
  const [coords, setCoords] = useState<Coords | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setStatus("unsupported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: c }) => {
        setCoords({ latitude: c.latitude, longitude: c.longitude });
        setStatus("granted");
      },
      () => setStatus("denied")
    );
  }, []);

  function access() {
    // Antes: `latitude & longitude` (AND bit a bit) falhava para coordenadas válidas como 0
    if (coords) {
      saveLocation(coords);
      push("/climate");
    } else {
      setShowAlert(true);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* fundo: manchas de cor desfocadas */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-violet-500/30 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-[420px] w-[420px] rounded-full bg-sky-400/30 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-[420px] w-[420px] rounded-full bg-indigo-500/25 blur-3xl" />
      </div>

      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-5">
        <Logo />
        <ThemeToggle />
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-12">
        <p className="mb-4 w-fit rounded-full border bg-background/60 px-4 py-1.5 text-sm font-semibold text-primary backdrop-blur">
          Clima · CEP · Contato
        </p>
        <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
          O tempo da sua cidade,{" "}
          <span className="bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-transparent">
            num relance.
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Permita o acesso à sua localização e veja a previsão de hoje e da semana. Em um celular, ligue o
          GPS.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button
            size="lg"
            onClick={access}
            disabled={status === "loading"}
            className="h-14 rounded-full px-8 text-base shadow-lg shadow-primary/30"
          >
            {status === "loading" ? (
              <span
                className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"
                role="status"
                aria-label="Obtendo localização"
              />
            ) : (
              <>
                Ver o clima <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>

        <div className="mt-6 max-w-md">
          <p className="mb-2 text-sm font-semibold text-muted-foreground">
            {status === "denied" || status === "unsupported"
              ? "Sem acesso à localização? Busque sua cidade:"
              : "Ou escolha uma cidade:"}
          </p>
          <CitySearch
            onSelect={(place) => {
              saveLocation(place);
              push("/climate");
            }}
          />
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-3">
          {FEATURES.map(({ Icon, title, text }) => (
            <li key={title} className="rounded-3xl border bg-card/70 p-5 backdrop-blur">
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="font-bold">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </main>

      <AlertDialog open={showAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ops! ):</AlertDialogTitle>
            <AlertDialogDescription>
              {status === "unsupported"
                ? "Seu navegador não suporta geolocalização."
                : "Para que a aplicação funcione, precisamos da sua localização. Permita o acesso no navegador e recarregue a página."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlert(false)}>ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
