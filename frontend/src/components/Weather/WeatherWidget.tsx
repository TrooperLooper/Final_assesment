/// <reference types="vite/client" />

import React, { useEffect, useState } from "react";
import { FiCloudRain } from "react-icons/fi";

interface WeatherWidgetProps {}

interface WeatherData {
  temp: number;
  icon: string;
  description: string;
  city: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY || "";
    setDate(
      new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );

    const fetchWeather = (city: string) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeather({
            temp: Math.round(data.main.temp),
            icon: data.weather[0].icon,
            description: data.weather[0].description,
            city: data.name,
          });
        })
        .catch(() => setWeather(null));
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=en`
          )
            .then((res) => res.json())
            .then((data) => {
              setWeather({
                temp: Math.round(data.main.temp),
                icon: data.weather[0].icon,
                description: data.weather[0].description,
                city: data.name,
              });
            })
            .catch(() => fetchWeather("Stockholm"));
        },
        () => fetchWeather("Stockholm"),
        { timeout: 5000 }
      );
    } else {
      fetchWeather("Stockholm");
    }
  }, []);

  return (
    <div className="grid grid-rows-2 grid-cols-1 justify-start items-start mt-2 text-xs font-normal rounded px-3 py-2 min-w-[140px] max-w-[300px] text-white">
      <div className="font-bold justify-self-start">{date}</div>
      {weather ? (
        <div className="flex items-start justify-start">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
            alt={weather.description}
            className="w-6 h-6"
          />
          <span className="text-base font-bold justify-self-start">
            {weather.temp} °C
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-1 opacity-60 justify-start">
          <FiCloudRain className="w-5 h-5" />
          <span>-- °C</span>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
