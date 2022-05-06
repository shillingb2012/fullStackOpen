import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Results from './components/ResultsDisplay'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [newFilteredCountries, setNewFilteredCountries] = useState([])
  const totalCountries = countries.length

  // Get data stored on the server
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setNewFilteredCountries(response.data)
      })
      
  }, [])

  function filterCountries(filterValue) {
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(filterValue.toLowerCase()))
    return filtered
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setNewFilteredCountries(filterCountries(event.target.value))
  }

  return (
    <>
      <Filter filterInputValue={newFilter} filterOnChange={handleFilterChange}/>
      <Results countries={newFilteredCountries} totalCountries={totalCountries} setNewFilteredCountries={setNewFilteredCountries}/>
    </>
  )
}

export default App
