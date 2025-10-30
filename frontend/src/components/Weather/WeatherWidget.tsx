import React, { useEffect, useState } from "react";

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
    setDate(
      new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY || "";
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
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <div>
        <div style={{ fontWeight: "bold" }}>{date}</div>
        {weather && (
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
              style={{ verticalAlign: "middle", width: 32, height: 32 }}
            />
            <span style={{ fontSize: "1.2em" }}>{weather.temp} °C</span>
            <span style={{ marginLeft: 8 }}>{weather.city}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
