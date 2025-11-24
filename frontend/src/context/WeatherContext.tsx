import React, { createContext, useContext, useEffect, useState } from "react";

interface WeatherData {
  temp: number;
  icon: string;
  description: string;
  city: string;
}

interface WeatherContextType {
  weather: WeatherData | null;
  date: string;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
    <WeatherContext.Provider value={{ weather, date }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within WeatherProvider");
  }
  return context;
};
