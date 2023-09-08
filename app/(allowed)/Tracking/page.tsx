"use client";

import { CardTracking } from "@/components/personal/CardTracking";

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
import { useState } from "react";

export default function Tracking() {
  const [showAlert, setshowAlert] = useState(false);
  const [PssibleCeps, setPssibleCeps] = useState<any>(undefined);

  async function GetCeps(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (JSON.stringify(data) === "[]") {
        setshowAlert(true);
        setPssibleCeps(undefined);
      } else {
        setshowAlert(false);
        setPssibleCeps(data);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setshowAlert(true);
      // Lide com o erro aqui, por exemplo, exibindo uma mensagem de erro para o usuário.
    }
  }

  return (
    <div>
      <div className=" w-full flex justify-center items-center">
        <div
          className=" w-full max-w-[98%]  flex justify-center items-center rounded-lg pb-2 "
          style={{
            backgroundImage:
              " linear-gradient(to right top, #a883ba, #b299cd, #bdafdf, #cac4ef, #d9daff)",
          }}
        >
          {/* background-image: linear-gradient(to right top, #a883ba, #b299cd, #bdafdf, #cac4ef, #d9daff); */}
          <div className=" w-full max-w-[1800px]  rounded-md min-h-[650px] flex ">
            <div className=" w-full flex items-center justify-around flex-wrap ">
              <div className=" w-full max-w-[400px]  overflow-hidden flex justify-center items-center ">
                <img
                  src={"./logorastreio.svg"}
                  alt=""
                  className=" min-w-full"
                />
              </div>
              <div
                className=" w-[83%] mt-5 md:mt-0 max-w-[500px] min-h-[300px] rounded-lg p-9 flex justify-center items-center"
                // style={{
                //   backgroundImage:
                //     " linear-gradient(to right top, #5a3e51, #6f4e68, #835e82, #96709d, #a883ba)",
                // }}
              >
                <CardTracking getParams={GetCeps}></CardTracking>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showAlert}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ops! ):</AlertDialogTitle>
            <AlertDialogDescription>
              Algum dado informado, está incorreto!!<br></br>
              Tente novamente e verifique os dados informados!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setPssibleCeps(undefined);
                setshowAlert(false);
              }}
            >
              ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className=" w-full flex justify-center items-center mt-3  min-h-[500px] border-t-2 border-b-[#A883BA] ">
        {PssibleCeps != undefined ? (
          <div className=" w-full  flex justify-around items-center mt-5 flex-wrap">
            {PssibleCeps.map((item: any, index: any) => (
              <div
                className=" bg-[#121C32] -col m-1 w-full max-w-[600px] rounded-xl hover:bg-[#121c3298] p-2"
                key={index}
              >
                <div className=" w-full  flex justify-around  ">
                  <div className=" font-bold text-[white]  w-[30%]">Cep:</div>
                  <div className="font-bold text-[#D9DAFF] w-[70%]">
                    {item.cep}
                  </div>
                </div>
                <div className=" w-full  flex justify-around">
                  <div className=" font-bold text-[white] w-[30%]">
                    logradouro:
                  </div>
                  <div className="font-bold text-[#D9DAFF] w-[70%]">
                    {item.logradouro}
                  </div>
                </div>
                <div className=" w-full  flex justify-around">
                  <div className=" font-bold text-[white] w-[30%]">bairro:</div>
                  <div className="font-bold text-[#D9DAFF] w-[70%]">
                    {item.bairro}
                  </div>
                </div>
                <div className=" w-full  flex justify-around">
                  <div className=" font-bold text-[white] w-[30%]">
                    localidade:
                  </div>
                  <div className="font-bold text-[#D9DAFF] w-[70%]">
                    {item.localidade}
                  </div>
                </div>
                <div className=" w-full  flex justify-around">
                  <div className=" font-bold text-[white] w-[30%]">uf:</div>
                  <div className="font-bold text-[#D9DAFF] w-[70%]">
                    {item.uf}
                  </div>
                </div>
                <div className=" w-full  flex justify-around">
                  <div className=" font-bold text-[white] w-[30%]">ibge:</div>
                  <div className="font-bold text-[#D9DAFF] w-[70%]">
                    {item.ibge}
                  </div>
                </div>
                <div className=" w-full  flex justify-around">
                  <div className=" font-bold text-[white] w-[30%]">DDD:</div>
                  <div className="font-bold text-[#D9DAFF] w-[70%]">
                    {item.ddd}
                  </div>
                </div>

                <div className=" w-full  flex justify-around">
                  <div className=" font-bold text-[white] w-[30%]">siafi:</div>
                  <div className="font-bold text-[#D9DAFF] w-[70%]">
                    {item.siafi}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className=" w-full  max-w-[1400px] flex flex-col justify-center  ">
            <div className=" w-full  flex justify-around items-center mt-5 flex-wrap">
              <div className=" w-full max-w-[400px]  overflow-hidden flex justify-center items-center ">
                <img src={"./pesquisa.svg"} alt="" className=" min-w-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
