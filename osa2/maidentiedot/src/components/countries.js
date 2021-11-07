import React from 'react'
import Country from './country'

const Countries = ({singleCountry, filteredCountries, handleShowButton}) => {

    if (singleCountry) {
        return (
            <div>
                <Country filteredCountries={filteredCountries}/>
            </div>
        )
    }
    if (filteredCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    // if filteredCountries.length < 10 && filteredCountries.length > 1
    } else {
        return (
            <div>
                {filteredCountries.map(country => <p key={country.name}>{country.name}
                    <button onClick={() => handleShowButton(country)}>show</button></p>
                )}
            </div>
        )
    }
}

export default Countries