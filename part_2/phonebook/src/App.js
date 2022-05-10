import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import FilterInput from './components/FilterInput'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newFilteredPersons, setNewFilteredPersons] = useState(persons)

  // Get data stored on the server
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setNewFilteredPersons(initialPersons)
      })
      
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    // Check if person already exists, throw alert if this is the case
    if (persons.some(person => person.name === newName)) {
      // Ask if user wants to update the number for existing person
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatePerson = persons.find(p => p.name === newName)
        updatePerson.number = newNumber
        personService
          .update(updatePerson.id, updatePerson)
          .then((updated) => {
            setNewFilteredPersons(persons.map(person => person.id !== updatePerson.id ? person : updated))
          })
        setNewName('')
        setNewNumber('')
        return
      }
      // User selected cancel, do not update existing number
      else {
        setNewName('')
        setNewNumber('')
        return
      }
      
    }
    // Enforce a name to be entered to submit
    else if (newName === '') {
      alert ('Name cannot be blank')
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewFilteredPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNewFilter('')
      })
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
      <Persons persons={newFilteredPersons} updatePersons={setNewFilteredPersons} />
    </div>
  )
}

export default App
