import React, {useState} from 'react'
import Country from './country'

const Countries = ({searchedCountries, showInfo, setSearchedCountries, setShowInfo}) => {

  const [searchResult] = useState([])

  const handleShowButton = (country) => {
    searchResult.push(country)
    setSearchedCountries(searchResult)
    setShowInfo(true)
  }

  if (showInfo) {
    return (
      <div>
        <Country filteredCountries={searchedCountries}/>
      </div>
    )
  }

  if (searchedCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>

  } else {
    return (
      <div>
        {searchedCountries.map(country =>
          <li key={country.name}>
            {country.name}
            <button onClick={() => handleShowButton(country)}>show</button>
          </li>
        )}
      </div>
    )
  }
}

export default Countries