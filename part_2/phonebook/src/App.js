import { useState } from 'react'
import PersonForm from './components/PersonForm'
import FilterInput from './components/FilterInput'
import Persons from './components/Persons'



const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')

  const [newFilteredPersons, setNewFilteredPersons] = useState(persons)

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
      id: persons.length + 1,
      name: newName,
      number: newNumber
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
