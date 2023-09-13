"use client";

import Image from "next/image";

import SVGIMG from "../public/undraw_welcoming_re_x0qo.svg";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import Dica from "@/components/personal/Dica";

export default function Home() {
  const { push } = useRouter();
  const [latitude, setlatitude] = React.useState(0);
  const [longitude, setlongitude] = React.useState(0);
  const [Disabled, setDisabled] = React.useState(true);
  const [load, setload] = React.useState(false);

  const [showAlert, setshowAlert] = React.useState(false);

  function CallAcessPermition() {
    if ("geolocation" in navigator) {
      setload(true);
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // O usuário permitiu o acesso à localização
          setlatitude(position.coords.latitude);
          setlongitude(position.coords.longitude);

          setDisabled(false);
          setload(false);

          // Faça algo com a localização, como enviar para o servidor, exibir no mapa, etc.
        },
        function (error) {
          if (error.code === error.PERMISSION_DENIED) {
            // O usuário negou a permissão de localização
            console.log("Usuário negou a permissão de localização");
            setDisabled(false);
          } else {
            // Ocorreu um erro ao obter a localização
            console.error("Erro ao obter a localização: " + error.message);
            setDisabled(false);
          }
        }
      );
    } else {
      // O navegador não suporta a API de Geolocalização
      console.log("Seu navegador não suporta geolocalização");
    }
  }

  React.useEffect(() => {
    CallAcessPermition();
  }, []);

  function AcessAplication() {
   
    if (latitude & longitude) {
      const data = {
        latitude: latitude,
        longitude: longitude,
      };
      const jsonData = JSON.stringify(data);
      localStorage.setItem("location", jsonData);

      push("/climate");
    } else {
      setshowAlert(true);
    }
  }

  return (
    <div
      className=" bg-[#51424F] text-white h-[100vh] backdrop-blur-3xl flex items-center justify-around "
      style={{
        backgroundImage:
          "linear-gradient(to right top, #000000, #302228, #5a3e51, #835e82, #a883ba)",
      }}
    >
      <div className=" text-center  min-[320px]:w-[500px]  max-[600px]:bg-sky-300 max-[600px]:hidden ">
        <Image src={SVGIMG} alt={""} className=" md:w-[500px] min-w-ful" />
      </div>

      <AlertDialog open={showAlert}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ops! ):</AlertDialogTitle>
            <AlertDialogDescription>
              Parece que está tentando acessar a apliação sem permitir que o
              navegador acesse sua localização.. Para que a aplicação funcione,
              precisamos de sua localização!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
            <AlertDialogAction
              onClick={() => {
                setshowAlert(false);
              }}
            >
              ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div>
        <Card className="w-[350px] bg-black border-none p-3">
          <CardHeader>
            <CardTitle className=" text-[#966892] text-[50px]">
              Bem Vindo
            </CardTitle>

            <CardDescription>
              <div className=" flex justify-around items-center ">
                <Dica TextoInfo="Para que a aplicação funcione, permita que o navegador acesse os dados de localização.."></Dica>
                <p className=" ">
                  Para Proserguimos, permita seu navegador a acessar seus dados
                  de localização.,

                  OBS: CASO ESTEJA EM UM CELULAR, LIGUE A LOCALIZAÇÃO DO GPS. 
                </p>
              </div>

              <br></br>
            </CardDescription>
          </CardHeader>

          <div className="flex justify-between items-center w-full  ">
            <Button
              variant="outline"
              onClick={(item: any) => AcessAplication()}
              disabled={Disabled}
              className=" min-w-[100%]"
            >
              {load ? (
                <span className=" border-t-4 border-b-4 rounded-[20px] border-blue-500 h-8 w-8 animate-spin mx-auto">
                  ...
                </span>
              ) : (
                "Acessar Sistema"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
