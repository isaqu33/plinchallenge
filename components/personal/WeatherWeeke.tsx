"use client";

interface WeatherWeekeProp {
  data: any;
}

function WeatherWeeke({ data }: WeatherWeekeProp) {
  // Crie um conjunto para manter as datas únicas
  const datasUnicas = new Set();

  // Função para obter o nome do dia da semana a partir de uma data
  const getDiaSemana = (dataStr: any) => {
    const diasSemana = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    const Data = new Date(dataStr);
    return diasSemana[Data.getUTCDay()];
  };

  // Filtrar as previsões para manter apenas datas únicas
  const previsoesUnicas = data.filter((previsao: any) => {
    const data = previsao.dt_txt.split(" ")[0];
    if (datasUnicas.has(data)) {
      // Se a data já foi renderizada, retorne false
      return false;
    } else {
      // Se a data não foi renderizada, adicione ao conjunto e retorne true
      datasUnicas.add(data);
      return true;
    }
  });


  return (
    <div className=" w-full bg-[black] mt-7 flex justify-center items-center min-h-[500px] ">
      <div className=" w-full  max-w-[1400px] flex flex-col justify-center items-center">
        <h1 className=" border-b-2 border-b-[#A883BA] font-extrabold border-[red] w-full  text-[#A883BA]">
          Tempo Durante a Semana{" "}
        </h1>

        <div className=" w-full  flex justify-around items-center mt-5 flex-wrap">
          {previsoesUnicas.map((previsao: any, index: any) => (
            <div
              className=" bg-[#121C32] -col m-1 min-h-[200px] w-full max-w-[200px] rounded-xl hover:bg-[#121c3298]"
              key={index}
            //   style={{
            //     backgroundImage:
            //       " linear-gradient(to right top, #5a3e51, #6f4e68, #835e82, #96709d, #a883ba)",
            //   }}
            >
              <img
                src={`https://openweathermap.org/img/wn/${previsao.weather[0].icon}.png`}
                alt={`Ícone do clima: ${previsao.weather[0].description}`}
                className=" w-[70px]"
              />

              <p className=" w-full  font-bold text-[20px]">
                {" "}
                {getDiaSemana(previsao.dt_txt)}
              </p>
              <p className=" w-full  text-[40px] p-4 font-semibold">
                {(previsao.main.temp - 273.15).toFixed(2)}°C
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherWeeke;
