"use client";

import DeteilsWeatherToday from "@/components/personal/DeteilsWeatherToday";
import WeatherWeeke from "@/components/personal/WeatherWeeke";
import Weathertoday from "@/components/personal/Weathertoday";
import { fetchwhetherToday, fetchwhetherWeek } from "@/useful/calls";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function Climate() {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const InfoString = window.localStorage.getItem("location");
    if (InfoString) {
      try {
        var { latitude, longitude } = JSON.parse(InfoString);
      } catch (error) {
        console.error("Erro ao fazer o parse da string JSON:", error);
        router.push("/");
      }
    } else {
      console.error("A string JSON recuperada do localStorage é nula.");
      router.push("/");
    }

    console.log(localStorage.getItem("location"));
  }

  const { data: whetherToday, isLoading: iswhetherTodayLoading } = useQuery(
    "whetherToday",
    () => fetchwhetherToday(latitude, longitude)
  );

  const { data: whetherWeek, isLoading: iswhetherWeekLoading } = useQuery(
    "whetherWeek",
    () => fetchwhetherWeek(latitude, longitude)
  );

  if (iswhetherTodayLoading || iswhetherWeekLoading) {
    return (
      <div>
        <div className="flex items-center space-x-4 w-full  min-h-[800px] justify-center">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </div>
    );
  }

  // Valores da API OpenWeatherMap em Kelvin
  const kelvinTemp = whetherToday.main.temp;

  // Converter para Celsius
  const celsiusTemp = kelvinTemp - 273.15;

  return (
    <div className=" bg-black text-[white]">
      <Weathertoday
        IdImg={whetherToday.weather[0].icon}
        NameCity={whetherToday.name}
        InfoDay={whetherToday.dt}
        tempoAtual={`${celsiusTemp.toFixed(2)} °C`}
        description={whetherToday.weather[0].description}
        latitude={latitude}
        longitude={longitude}
      ></Weathertoday>
      <WeatherWeeke data={whetherWeek.list}></WeatherWeeke>
      <DeteilsWeatherToday
        Sunrise={whetherToday.sys.sunrise}
        Sunset={whetherToday.sys.sunset}
        pressure={whetherToday.main.pressure}
        humidity={whetherToday.main.humidity}
        speed={whetherToday.wind.speed}
      ></DeteilsWeatherToday>
    </div>
  );
}
