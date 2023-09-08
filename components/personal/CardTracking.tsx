"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

interface CardTrackingProp {
  getParams: (argo: any) => void;
}

export function CardTracking({ getParams }: CardTrackingProp) {
  const [Uf, setUf] = useState("");
  const [Cidade, setCidade] = useState("");
  const [Rua, setRua] = useState("");

  const [ActivateButon, setActivateButon] = useState(true);

  useEffect(() => {
    if (!Uf || !Cidade || !Rua) {
      setActivateButon(true);
    } else {
      setActivateButon(false);
    }
  }, [Uf, Cidade, Rua]);

  return (
    <Tabs defaultValue="account" className="w-[90%]">
      <Card>
        <CardHeader>
          <CardTitle>{"Cep"}</CardTitle>
          <CardDescription>
            {
              "Para identificar os possiveis seus possiveis Ceps, coloque as informações a baixo."
            }
            <br></br>
            <br></br>
            {
              " OBS: Para Conseguirmos identificar os possíveis CEP-S preencha todos os campos!"
            }
            <br></br>
            <br></br>
            <p>
              {
                "Coloque as informações corretas para conseguirmos fazer a consultaCaso não consiga, aqui está um exemplo: UF: RS - CIDADE: Porto Alegre - Rua: Domingos"
              }
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">UF</Label>
            <Input
              id="uf"
              placeholder="*DF,CE,NO"
              onChange={(e) => {
                setUf(e.target.value);
              }}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">{"Cidade"}</Label>
            <Input
              id="Cidade"
              placeholder="Brasilia, Ceara, Norte"
              onChange={(e) => {
                setCidade(e.target.value);
              }}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">{"logradouro-Rua-"}</Label>
            <Input
              id="logradouro"
              placeholder="Quadra 26, Domingos, QRC 10, Maria Lacerda"
              onChange={(e) => {
                setRua(e.target.value);
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            disabled={ActivateButon}
            onClick={() =>
              getParams(`https://viacep.com.br/ws/${Uf}/${Cidade}/${Rua}/json/`)
            }
          >
            {"Pesquisar Possiveis Cep-s"}
          </Button>
        </CardFooter>
      </Card>
    </Tabs>
  );
}
