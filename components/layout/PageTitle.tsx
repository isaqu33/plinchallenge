export default function PageTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">{subtitle}</p>
    </div>
  );
}
