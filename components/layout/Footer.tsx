import { Linkedin, MessageCircle } from "lucide-react";

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
    <footer className="mt-16 border-t">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Plin · por Isaque</span>
        <div className="flex items-center gap-2">
          {social.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
