import axios from "axios";
import { useEffect, useState } from "react";
import Countries from "./components/Countries";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filterCountries = (searchString) => {
    searchString = searchString.toLowerCase();
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchString)
    );
  };

  const exactMatchCountry = (searchString) => {
    searchString = searchString.toLowerCase();
    return countries.filter((country) =>
      country.name.common.toLowerCase() === searchString
    );
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    setCountriesToShow(filterCountries(value));
  };

  const handleOnShow = (countryName) =>
    setCountriesToShow(exactMatchCountry(countryName));

  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
      <Countries countries={countriesToShow} handleOnShow={handleOnShow} />
    </div>
  );
}

export default App;
