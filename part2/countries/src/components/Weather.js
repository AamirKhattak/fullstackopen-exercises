import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Weather({ capital }) {
  const [weather, setWeather] = useState(null);

  console.log(capital);
  
  useEffect(() => {
    console.log('effect')
    const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${capital.name}&units=metric&&APPID=${WEATHER_API_KEY}`;
    axios.get(WEATHER_API_URL).then((response) => {
        console.log('promise fulfilled')
      setWeather(response.data);
    });
  },[]);
  console.log('render', weather, 'weather')

  return (
    <div>
      <h2>Weather in {capital.name}</h2>
      <p>temperature is {weather && weather.main.temp} Celcius</p>
      <img width={160} height={160} src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
      <p>wind {weather && weather.wind.speed} m/s</p>
    </div>
  );
}
