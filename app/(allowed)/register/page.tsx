"use client";

import { CardForm } from "@/components/personal/CardForm";
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

export default function Register() {
  const [showAlert, setshowAlert] = useState(false);
 

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
              <div className=" w-[83%] mt-5 md:mt-0 max-w-[500px] min-h-[300px] rounded-lg p-9 flex justify-center items-center">
                <CardForm ></CardForm>   
              </div>
              <div className=" w-full max-w-[400px]  overflow-hidden flex justify-center items-center ">
                <img src={"./contato.svg"} alt="" className=" min-w-full" />
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
               
                setshowAlert(false);
              }}
            >
              ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
