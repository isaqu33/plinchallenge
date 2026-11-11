import type { ReactNode } from "react";

/** Bloco padrão das páginas de formulário: ilustração de um lado, card do outro. */
export default function PageHero({
  image,
  imageFirst = false,
  children,
}: {
  image: string;
  imageFirst?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-primary/15 via-secondary to-background p-6 md:p-10">
      <div
        className={`flex flex-wrap items-center justify-around gap-8 ${imageFirst ? "flex-row-reverse" : ""}`}
      >
        <div className="w-full max-w-[500px]">{children}</div>
        <img src={image} alt="" className="w-full max-w-[380px]" />
      </div>
    </section>
  );
}
