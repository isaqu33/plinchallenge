"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

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
          <Link
            href={href}
            key={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {nome}
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
    <header className="sticky top-3 z-40 mx-auto w-full max-w-5xl px-3">
      <div className="rounded-full border bg-background/70 px-4 shadow-lg shadow-primary/5 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between">
          <Link href="/climate" aria-label="Plin — início">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
            <NavLinks pathname={pathname} />
          </nav>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full md:hidden"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 pb-3 md:hidden" aria-label="Principal móvel">
            <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
          </nav>
        )}
      </div>
    </header>
  );
}
