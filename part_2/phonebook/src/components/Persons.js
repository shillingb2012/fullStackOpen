import React from 'react'
import Person from './Person'
import SuccessMessage from './NotificationMessage'
import personService from '../services/persons'

const Persons = ({ persons, updatePersons, updateSuccess }) => {
  
  function deleteClick(id, name)
  {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then((removed) => {
          updatePersons(persons.filter(p => p.id !== id))
          updateSuccess(`${name} was successfully deleted`)
          // Reset success message after 3 seconds
          setTimeout(() => {updateSuccess(null)}, 3000)
        })
    }
  }
  
  return (
    <>
      {
        persons.map(
          person => {
            return (
              <Person key={person.id} person={person} deleteClick={() => deleteClick(person.id, person.name)}/>
            )
          }
        )
      }
    </>
  )
}


export default Persons