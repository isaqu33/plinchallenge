"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SVGIMG from "../public/undraw_welcoming_re_x0qo.svg";
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
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div
      className="flex h-[100vh] items-center justify-around bg-[#51424F] text-white backdrop-blur-3xl"
      style={{
        backgroundImage: "linear-gradient(to right top, #000000, #302228, #5a3e51, #835e82, #a883ba)",
      }}
    >
      <div className="text-center max-[600px]:hidden min-[320px]:w-[500px]">
        <Image src={SVGIMG} alt="" className="md:w-[500px]" priority />
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

      <Card className="w-[350px] border-none bg-black p-3">
        <CardHeader>
          <CardTitle className="text-[50px] text-[#966892]">Bem-vindo</CardTitle>
          <CardDescription>
            <div className="flex items-center justify-around">
              <Dica TextoInfo="Para que a aplicação funcione, permita que o navegador acesse os dados de localização." />
              <p>
                Para prosseguir, permita que seu navegador acesse sua localização. Em um celular, ligue o GPS.
              </p>
            </div>
          </CardDescription>
        </CardHeader>
        <Button variant="outline" onClick={access} disabled={status === "loading"} className="min-w-full">
          {status === "loading" ? (
            <span
              className="mx-auto h-8 w-8 animate-spin rounded-[20px] border-b-4 border-t-4 border-blue-500"
              role="status"
              aria-label="Obtendo localização"
            />
          ) : (
            "Acessar sistema"
          )}
        </Button>
      </Card>
    </div>
  );
}
