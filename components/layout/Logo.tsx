/** Logo desenhado em SVG: sol saindo de uma nuvem. Sem arquivo de imagem. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="plin-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#plin-bg)" />
      <circle cx="29" cy="19" r="7" fill="#fde68a" />
      <path d="M14 35a6 6 0 0 1 1.2-11.9A8 8 0 0 1 30.6 25 5 5 0 0 1 31 35z" fill="#fff" fillOpacity=".96" />
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight">
      <LogoMark />
      Plin
    </span>
  );
}
