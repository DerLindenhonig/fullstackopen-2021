import React, {useEffect, useState} from 'react'
import axios from "axios";

const Country = ({filteredCountries}) => {

        const [capitalTemp, setTemp] = useState(0);
        const [capitalWind, setCapitalWind] = useState(0);
        const api_key = process.env.REACT_APP_API_KEY

        useEffect( () => {
                axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + filteredCountries[0].capital + "&units=metric&appid=" + api_key)
                    .then((response) => {
                            setTemp(response.data.main.temp);
                            setCapitalWind(response.data.wind.speed);
                    })
                    .catch((error) => {
                            console.log(error.message);
                    })
        })

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
                    <p>temperature: {capitalTemp} Celsius</p>
                    <p>Wind: {capitalWind} m/s</p>
            </div>
        )
}

export default Country