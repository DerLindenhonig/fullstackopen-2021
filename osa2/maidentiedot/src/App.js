import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import Countries from './components/countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [searchedCountries, setSearchedCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {setCountries(response.data)})
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)

    if(filter === '') {
      setSearchedCountries(countries)
      setShowInfo(false)

    } else {
      setSearchedCountries(countries.filter(country =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      ))

      if(searchedCountries.length === 1) {
        setShowInfo(true)
      }

      if(searchedCountries.length > 1) {
        setShowInfo(false)
      }
    }
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <Countries searchedCountries={searchedCountries} showInfo={showInfo} setSearchedCountries={setSearchedCountries} setShowInfo={setShowInfo}/>
    </div>
  )
}

export default App