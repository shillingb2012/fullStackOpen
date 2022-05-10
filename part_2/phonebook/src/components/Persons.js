import React from 'react'
import Person from './Person'
import personService from '../services/persons'

const Persons = ({ persons, updatePersons }) => {
  
  function deleteClick(id, name)
  {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then((removed) => {
          console.log(removed)
          updatePersons(persons.filter(p => p.id !== id))
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