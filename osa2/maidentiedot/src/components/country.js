import React, {useEffect, useState} from 'react'
import axios from "axios";

const Country = ({filteredCountries}) => {

  const [capitalTemp, setTemp] = useState(0);
  const [capitalWind, setWind] = useState(0);
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    const params = {
      access_key: api_key,
      query: filteredCountries[0].capital
    }

    axios.get('http://api.weatherstack.com/current', {params})
      .then((response) => {
        setTemp(response.data.current.temperature)
        setWind(response.data.current.wind_speed)
      })
      .catch((error) => {
        console.log(error.message);
      })
  })

  if (filteredCountries) {
    return (
      <div>
        <h1>{filteredCountries[0].name}</h1>
        <p>Capital: {filteredCountries[0].capital}</p>
        <p>Population: {filteredCountries[0].population}</p>
        <h3>Languages:</h3>
        <ul>
          {filteredCountries[0].languages.map(language =>
            <li key={language.name}>{language.name}</li>
          )}
        </ul>
        <img src={filteredCountries[0].flag} width="150" alt="Flag"></img>

        <h3>Weather in {filteredCountries[0].capital}</h3>
        <div>temperature: {capitalTemp} Celsius</div>
        <div>wind speed: {capitalWind} m/s</div>
      </div>
    )
  }
}

export default Country