import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import FilterInput from './components/FilterInput'
import Persons from './components/Persons'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newFilteredPersons, setNewFilteredPersons] = useState(persons)

  // Get data stored on the server
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setNewFilteredPersons(response.data)
      })
      
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    // Check if person already exists, throw alert if this is the case
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    // Enforce a name to be entered to submit
    else if (newName === '') {
      alert ('Name cannot be blank')
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(personObject))
    setNewFilteredPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    setNewFilter('')
  }

  function filterPeople(filterValue) {
    const filtered = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
    return filtered
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    setNewFilteredPersons(filterPeople(event.target.value))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput
        filterInputValue={newFilter} filterOnChange={handleFilterChange}
      />

      <h3>Add a new</h3>
      <PersonForm 
        formSubmit={addPerson} nameValue={newName} nameOnChange={handleNameChange} numberValue={newNumber} numberOnChange={handleNumberChange} 
      />

      <h3>Numbers</h3>
      <Persons persons={newFilteredPersons} />
    </div>
  )
}

export default App
