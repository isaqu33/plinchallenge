import { CardForm } from "@/components/personal/CardForm";

export default function Register() {
  return (
    <div className="flex w-full items-center justify-center">
      <div
        className="flex w-full max-w-[98%] items-center justify-center rounded-lg pb-2"
        style={{
          backgroundImage: "linear-gradient(to right top, #a883ba, #b299cd, #bdafdf, #cac4ef, #d9daff)",
        }}
      >
        <div className="flex min-h-[650px] w-full max-w-[1800px] rounded-md">
          <div className="flex w-full flex-wrap items-center justify-around">
            <div className="mt-5 flex min-h-[300px] w-[83%] max-w-[500px] items-center justify-center rounded-lg p-9 md:mt-0">
              <CardForm />
            </div>
            <div className="flex w-full max-w-[400px] items-center justify-center overflow-hidden">
              <img src="/contato.svg" alt="" className="min-w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
