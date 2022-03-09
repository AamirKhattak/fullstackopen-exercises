import React, { useEffect, useState } from "react";
import axios from "axios";

const testWeather = {
  coord: {
    lon: -0.13,
    lat: 51.51,
  },
  weather: [
    {
      id: 300,
      main: "Drizzle",
      description: "light intensity drizzle",
      icon: "09d",
    },
  ],
  base: "stations",
  main: {
    temp: 280.32,
    pressure: 1012,
    humidity: 81,
    temp_min: 279.15,
    temp_max: 281.15,
  },
  visibility: 10000,
  wind: {
    speed: 4.1,
    deg: 80,
  },
  clouds: {
    all: 90,
  },
  dt: 1485789600,
  sys: {
    type: 1,
    id: 5091,
    message: 0.0103,
    country: "GB",
    sunrise: 1485762037,
    sunset: 1485794875,
  },
  id: 2643743,
  name: "London",
  cod: 200,
};

export default function Weather({ capitalName }) {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    //   setWeather(testWeather)
    axios.get(`https://api.openweathermap.org/data/2.5/find?q=${capitalName}&units=metric&appid=b1b15e88fa797225412429c1c50c122a1`).then((response) => {
        console.log(response.data);
        setWeather(response.data);
    });
  }, []);

  console.log('weather', weather);
  
//   const temperature = weather && weather.main.temp;
//   const icon = weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
//   const windSpeed = weather &&  weather.wind.speed;
  return (
    <div>
      <h2>Weather in {capitalName}</h2>
      {/* <p>temperature is {temperature} Celcius</p>
      <img width={160} height={160} src={icon} />
      <p>wind {windSpeed} m/s</p> */}
    </div>
  );
}
