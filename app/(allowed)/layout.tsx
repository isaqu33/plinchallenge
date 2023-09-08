"use client";

import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";
import img from "../../public/logo.png";
import { QueryClient, QueryClientProvider } from "react-query";

import Link from "next/link";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const data = [
  {
    nome: "Clima",
    link: "./climate",
  },
  {
    nome: "Cep",
    link: "./Tracking",
  },
  {
    nome: "Contato",
    link: "./register",
  },
];

export default function RootLayoutAllowed({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  const router = usePathname();

  const [nomeRota, setnomeRota] = useState("");
  const [isMenuOpem, setisMenuOpem] = useState(false);

  // useEfeect para identificar rota para logica de marcação de pagina no reader
  useEffect(() => {
    setisMenuOpem(false);
    switch (router) {
      case "/climate":
        setnomeRota("." + "/climate");
       
        break;
      case "/Tracking":
        setnomeRota("." + "/Tracking");
        break;
      case "/register":
        setnomeRota("." + "/register");
        break;
    }
  }, [router]);

  return (
    // <html lang="pt-br">
    <div className={inter.className} style={{ backgroundColor: "black" }}>
      <div className="w-full flex justify-center items-center bg-[black] min-h-[160px] ">
        <div className=" w-[100%] h-full  max-w-[1000px] flex-col  md:flex justify-between items-center ">
          <div className=" w-full  flex justify-between items-center m-1 md:justify-center">
            <div className="w-[200px] md:w-[300px] flex justify-center items-center  h-full bg-slate-600 ">
              <img src="./logo.png" alt="" className=" min-w-full" />
            </div>

            {/* btn ativar menu mobile */}

            <div className="  flex md:hidden  ">
              <button
                className=" rounded-sm "
                onClick={() => {
                  isMenuOpem ? setisMenuOpem(false) : setisMenuOpem(true);
                }}
              >
                <svg
                  className=" h-6 w-6 bg-[#966892] rounded-sm mr-1"
                  stroke=" currentColor"
                  fill="none"
                  viewBox=" 0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* menu teladescktop */}

          <div className=" w-[50%]    justify-between  items-center   hidden md:flex pb-10 ">
            {data.map((item: any, index: any) => (
              <Link href={item.link} key={index}>
                <span
                  className="text-[white] text-lg font-extrabold hover:bg-[#4646467c] rounded-[2px] p-1 "
                  style={{
                    color: `${item.link == nomeRota ? "#966892" : "white"}`,
                    borderBottom: `${
                      item.link == nomeRota ? "solid 2px #966892 " : "none"
                    }`,
                  }}
                >
                  {item.nome}
                </span>
              </Link>
            ))}
          </div>

          {/*  menu mobile */}

          {isMenuOpem && (
            <div className=" w-[100%]     justify-between  items-center   flex flex-col md:hidden ">
              {data.map((item: any, index: any) => (
                // <div>{item.nome}</div>

                <Link href={item.link} key={index}>
                  <span
                    className="text-[white] text-lg font-extrabold hover:bg-[#4646467c] rounded-[2px] p-1 "
                    style={{
                      color: `${item.link == nomeRota ? "#966892" : "white"}`,
                      borderBottom: `${
                        item.link == nomeRota ? "solid 2px #966892 " : "none"
                      }`,
                    }}
                  >
                    {item.nome}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

      <div className="  w-full mt-8">
        <div className=" w-full  flex justify-center">
          <div className="w-[200px] md:w-[300px] flex justify-center items-center  h-full  ">
            <img src="./logo.png" alt="" className=" min-w-full" />
          </div>
        </div>

        <div className=" w-full  h-[100px] flex justify-center items-center ">
          <div className=" w-full max-w-[700px] h-[100%] text-[white]  border-t-4 border-[white] flex justify-between items-center flex-wrap">
            <div>© 2022 Plin . By Isaque</div>

            <div className="  w-[100px] flex justify-center items-center">
              <div className="w-[40px] flex justify-center items-center  h-full  ">
                <a href=" https://wa.me/61981482674?">
                  <img
                    src="./icons8-whatsapp-94.png"
                    alt=""
                    className=" min-w-full"
                  />
                </a>
              </div>
              <div className="w-[35px] flex justify-center items-center  h-full  ">
                <a href=" https://www.linkedin.com/in/isaque-ferreira-de-sousa-700902181/">
                  <img
                    src="./icons8-linkedin-48.png"
                    alt=""
                    className=" min-w-full"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </html>
  );
}
