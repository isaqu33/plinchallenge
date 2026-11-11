import { Linkedin, MessageCircle } from "lucide-react";
import Logo from "./Logo";

const social = [
  { label: "WhatsApp", href: "https://wa.me/61981482674", Icon: MessageCircle },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/isaque-ferreira-de-sousa-700902181/",
    Icon: Linkedin,
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-8">
        <div className="space-y-1">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} · Feito por Isaque · Dados: OpenWeather, ViaCEP e OpenStreetMap ·{" "}
            <a href="/sobre" className="underline">
              Sobre
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {social.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border p-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
