import React, {useEffect, useState} from 'react'
import axios from "axios";

const Country = ({filteredCountries}) => {

        const [capitalTemp, setTemp] = useState(0);
        const [capitalWind, setCapitalWind] = useState(0);
        const api_key = '18bd8bf0cb99b0a94c8a0b9ac93a46c3'

        useEffect( () => {
                const params = {
                        access_key: process.env.REACT_APP_API_KEY,
                        query: filteredCountries[0].capital
                }

                axios.get('https://api.weatherstack.com/current', {params})
                    .then((response) => {
                            setTemp(response.data.current.temperature);
                            //setCapitalWind(response.data.wind.speed);
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