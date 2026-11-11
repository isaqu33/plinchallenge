import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AllowedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black text-white">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
