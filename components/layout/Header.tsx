"use client";

import { CloudSun, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/climate" className="flex items-center gap-2 text-lg font-extrabold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <CloudSun className="h-5 w-5" />
          </span>
          Plin
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          <NavLinks pathname={pathname} />
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t px-4 py-3 md:hidden" aria-label="Principal móvel">
          <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
        </nav>
      )}
    </header>
  );
}
