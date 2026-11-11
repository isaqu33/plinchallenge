export default function Footer() {
  return (
    <footer className="mt-8 w-full">
      <div className="flex w-full justify-center">
        <div className="flex w-[200px] items-center justify-center md:w-[300px]">
          <img src="/logo.png" alt="" className="min-w-full" />
        </div>
      </div>
      <div className="flex h-[100px] w-full items-center justify-center">
        <div className="flex h-full w-full max-w-[700px] flex-wrap items-center justify-between border-t-4 border-white text-white">
          <div>© {new Date().getFullYear()} Plin · por Isaque</div>
          <div className="flex w-[100px] items-center justify-center">
            <a
              href="https://wa.me/61981482674"
              aria-label="WhatsApp"
              className="flex w-[40px] justify-center"
            >
              <img src="/icons8-whatsapp-94.png" alt="" className="min-w-full" />
            </a>
            <a
              href="https://www.linkedin.com/in/isaque-ferreira-de-sousa-700902181/"
              aria-label="LinkedIn"
              className="flex w-[35px] justify-center"
            >
              <img src="/icons8-linkedin-48.png" alt="" className="min-w-full" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
