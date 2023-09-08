"use client";

interface MapProp {
  lng: string;
  lat: string;
}

export default function Mapa({ lng, lat }: MapProp) {
  // Construa a URL dinamicamente com base na latidude (lat) e longitude (lng)
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15340.739312131764!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1693745268415!5m2!1spt-BR!2sbr`;

  // <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15340.739312131764!2d-47.992012800000005!3d-16.003891199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1693745268415!5m2!1spt-BR!2sbr" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

  return (
    <div className=" bg-[white] w-full p-3 rounded-lg ; ">
      <iframe
        src={mapUrl}
        width={"100%"}
        height="400"
        style={{ border: 2 }}
        loading="lazy"
      ></iframe>

      <div className=" mt-2 bg-[#D9DAFF] w-full flex flex-col justify-center items-center p-2 rounded-sm">
        <h1 className=" w-full flex justify-center items-center  font-extrabold text-[#5A3E51]">
          Suas informações de Localização:
        </h1>
        <span className="  font-semibold w-[70%] bg-[#ffffff] flex  justify-center items-center rounded-lg m-2">
          Latitude:{lat}
        </span>
        <span className=" font-semibold  w-[70%] bg-[#ffffff] flex  justify-center items-center rounded-lg m-2">
          Longitude:{lng}
        </span>
      </div>
    </div>
  );
}
