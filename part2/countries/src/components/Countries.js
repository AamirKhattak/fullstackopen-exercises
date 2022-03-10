import React from "react";
import Weather from "./Weather";

const Country = ({country}) => {
    // const country = countries[0];
    console.log(country);
    const name = country.name.common;
    const capital = country.capital[0];
    const area = country.area;
    const languages = country.languages;
    const flag = country.flags.png;
    const capitalLatlng = country.capitalInfo.latlng;

    return (
      <div>
        <h2>{name}</h2>
        <p>capital {capital}</p>
        <p>area {area}</p>
        <p>
          <b>languages</b>
        </p>
        <ul>
          {Object.keys(languages).map((currLanguageKey) => (
            <li key={currLanguageKey}>{languages[currLanguageKey]}</li>
          ))}
        </ul>
        <img style={{borderStyle:"solid", borderColor:"black"}} src={flag} />
        <Weather capital={{name: capital, latlng: capitalLatlng}} />
      </div>
    );
}

const Countries = ({ countries, handleOnShow }) => {
  if (countries.length === 0) {
    return <p>non found</p>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  return (
    <div>
      {countries.map((country) => (
        <p key={country.name.common}> 
          {country.name.common} <button onClick={() => handleOnShow(country.name.common)}>show</button>
        </p>
      ))}
    </div>
  );
};

export default Countries;
