/// <reference types="vite/client" />

import React from "react";
import { FiCloudRain } from "react-icons/fi";
import { useWeather } from "../../context/WeatherContext";

const WeatherWidget: React.FC = () => {
  const { weather, date } = useWeather();

  return (
    <div className="grid grid-rows-2 grid-cols-1 justify-start items-start mt-2 text-xs font-normal rounded px-3 py-2 text-white h-16 min-w-[140px] max-w-[300px]">
      <div className="font-bold justify-self-start h-5 flex items-center">
        {date}
      </div>
      {weather ? (
        <div className="flex items-center justify-start h-8">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
            alt={weather.description}
            className="w-8 h-8 shrink-0"
          />
          <span className="text-base font-bold justify-self-start">
            {weather.temp} °C
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-1 opacity-60 justify-start h-8">
          <FiCloudRain className="w-6 h-6 shrink-0" />
          <span>-- °C</span>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
