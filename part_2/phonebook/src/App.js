import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import FilterInput from './components/FilterInput'
import Persons from './components/Persons'
import NotificationMessage from './components/NotificationMessage'
import ErrorMessage from './components/ErrorMessage'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newFilteredPersons, setNewFilteredPersons] = useState(persons)
  const [message, setNewMessage] = useState(null)
  const [errorMessage, setNewErrorMessage] = useState(null)

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
            setNewMessage(`${updated.name} was successfully updated to: ${updated.number}`)
            // Reset success message after 3 seconds
            setTimeout(() => {setNewMessage(null)}, 3000)
          })
          .catch((error) => {
            console.log({error})
            setNewErrorMessage(`Error: Information of ${newName} has already been removed from server`)
            // Reset success message after 3 seconds
            setTimeout(() => {setNewErrorMessage(null)}, 3000)
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
        setNewMessage(`${returnedPerson.name} was successfully added`)
        // Reset success message after 3 seconds
        setTimeout(() => {setNewMessage(null)}, 3000)
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

      <NotificationMessage message={message}/>
      <ErrorMessage message={errorMessage}/>

      <h3>Add a new</h3>
      <PersonForm 
        formSubmit={addPerson} nameValue={newName} nameOnChange={handleNameChange} numberValue={newNumber} numberOnChange={handleNumberChange} 
      />

      <h3>Numbers</h3>
      <Persons persons={newFilteredPersons} updatePersons={setNewFilteredPersons} updateSuccess={setNewMessage} />
    </div>
  )
}

export default App
