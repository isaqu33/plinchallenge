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
import { Textarea } from "../ui/textarea";

export function CardForm() {
  const [nome, setnome] = useState("");
  const [email, setemail] = useState("");
  const [Mcontato, setMcontato] = useState("");
  const [anexo, setanexo] = useState("");

  const [ActivateButon, setActivateButon] = useState(true);

  function handleFileChange(e: any) {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setanexo(selectedFile.name);
      } else {
        console.error("Selecione um arquivo PDF válido.");
      }
    }
  }

  function verInfo() {
    let obj = {
      nome: nome,
      email: email,
      "Motivo Contato": Mcontato,
      anexo: anexo,
    };

    console.log(obj);
  }

  useEffect(() => {
    if (!nome || !email || !Mcontato) {
      setActivateButon(true);
    } else {
      setActivateButon(false);
    }
  }, [nome, email, Mcontato]);

  return (
    <Tabs defaultValue="account" className="w-[90%]">
      <Card>
        <CardHeader>
          <CardTitle>Fale Conosco</CardTitle>
          <CardDescription>
            <br></br> Estamos ansiosos para ouvir você! Se você tem alguma
            pergunta, sugestão, feedback ou apenas deseja dizer olá, sinta-se à
            vontade para entrar em contato conosco preenchendo o formulário
            abaixo.<br></br> Campos Obrigatórios:<br></br> Nome: Seu nome
            completo. E-mail: Seu endereço de e-mail válido. Motivo do Contato:
            Por favor, selecione a razão para entrar em contato conosco. Arquivo
            Anexo (Opcional): Se você deseja compartilhar algum arquivo conosco
            em relação ao seu contato, sinta-se à vontade para fazer o upload.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="Nome"
              placeholder="**Esqueva seu nome aqui**"
              onChange={(e) => {
                setnome(e.target.value);
              }}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">E-mail</Label>
            <Input
              id="Cidade"
              placeholder="**Escreva seu E-mail aqui**"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="username">Motivo do Contato</Label>
            <Textarea
              id="logradouro"
              placeholder="Esqueva aqui o motivo para seu contato"
              onChange={(e) => {
                setMcontato(e.target.value);
              }}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Arquivo Anexo</Label>
            <Input
              // className=" bg-slate-500"
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(e)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={ActivateButon} onClick={() => verInfo()}>
            Enviar
          </Button>
        </CardFooter>
      </Card>
    </Tabs>
  );
}
