"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { nome: "Clima", href: "/climate" },
  { nome: "CEP", href: "/Tracking" },
  { nome: "Contato", href: "/register" },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      {links.map(({ nome, href }) => {
        const active = pathname === href;
        return (
          <Link href={href} key={href} onClick={onNavigate} aria-current={active ? "page" : undefined}>
            <span
              className={`rounded-[2px] p-1 text-lg font-extrabold hover:bg-[#4646467c] ${
                active ? "border-b-2 border-[#966892] text-[#966892]" : "text-white"
              }`}
            >
              {nome}
            </span>
          </Link>
        );
      })}
    </>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="flex min-h-[160px] w-full items-center justify-center bg-black">
      <div className="h-full w-full max-w-[1000px] flex-col items-center justify-between md:flex">
        <div className="m-1 flex w-full items-center justify-between md:justify-center">
          <div className="flex h-full w-[200px] items-center justify-center bg-slate-600 md:w-[300px]">
            <img src="/logo.png" alt="Plin" className="min-w-full" />
          </div>
          <button
            className="flex rounded-sm md:hidden"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg
              className="mr-1 h-6 w-6 rounded-sm bg-[#966892]"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <nav className="hidden w-[50%] items-center justify-between pb-10 md:flex">
          <NavLinks pathname={pathname} />
        </nav>

        {open && (
          <nav className="flex w-full flex-col items-center justify-between md:hidden">
            <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
          </nav>
        )}
      </div>
    </header>
  );
}
