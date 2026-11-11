"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SVGIMG from "../public/undraw_welcoming_re_x0qo.svg";
import ThemeToggle from "@/components/layout/ThemeToggle";
import Dica from "@/components/personal/Dica";
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
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { saveLocation, type Coords } from "@/lib/location";

type Status = "loading" | "granted" | "denied" | "unsupported";

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
    // Antes: `latitude & longitude` (AND bit a bit) falhava para coordenadas válidas como 0 ou valores que se anulam
    if (coords) {
      saveLocation(coords);
      push("/climate");
    } else {
      setShowAlert(true);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-primary/20 via-background to-background">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-wrap items-center justify-center gap-10 px-4 py-16 lg:justify-between">
        <div className="hidden w-full max-w-[460px] sm:block">
          <Image src={SVGIMG} alt="" className="w-full" priority />
        </div>

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

        <Card className="w-full max-w-[420px] border shadow-lg">
          <CardHeader className="space-y-4 p-8">
            <CardTitle className="text-5xl font-extrabold text-primary">Bem-vindo</CardTitle>
            <div className="flex items-start gap-3 text-base text-muted-foreground">
              <Dica TextoInfo="Para que a aplicação funcione, permita que o navegador acesse os dados de localização." />
              <p>
                Para prosseguir, permita que seu navegador acesse sua localização. Em um celular, ligue o GPS.
              </p>
            </div>
          </CardHeader>
          <div className="px-8 pb-8">
            <Button size="lg" onClick={access} disabled={status === "loading"} className="w-full">
              {status === "loading" ? (
                <span
                  className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"
                  role="status"
                  aria-label="Obtendo localização"
                />
              ) : (
                "Acessar sistema"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
