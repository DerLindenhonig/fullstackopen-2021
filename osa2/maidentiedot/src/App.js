import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import Countries from './components/countries'

const App = () => {

    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [singleCountry, setSingleCountry] = useState(false)

    useEffect(() => {
        axios
            .get('https://restcountries.com/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
        if(event.target.value === '') {
            setFilteredCountries(countries)
            setSingleCountry(false)
        } else {
            const searchResult = []
            for (let i = 0; i < countries.length; i++) {
                if (countries[i].name.toLowerCase().includes(event.target.value.toLowerCase())) {
                    searchResult.push(countries[i])
                }
            }
            setFilteredCountries(searchResult)
            if(searchResult.length === 1) {
                setSingleCountry(true)
            } else {
                setSingleCountry(false)
            }
        }
    }

    const handleShowButton = (country) => {
        const searchResult = []
        searchResult.push(country)
        setFilteredCountries(searchResult)
        setSingleCountry(true)
    }

    return (
        <div>
            <Filter filter={filter} handleFilterChange={handleFilterChange}/>
            <Countries singleCountry={singleCountry} filteredCountries={filteredCountries} handleShowButton={handleShowButton}/>
        </div>
    )
}

export default App


