import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AllowedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-8">{children}</main>
      <Footer />
    </div>
  );
}
