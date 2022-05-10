import React from 'react'

const Person = ({person, deleteClick }) => {
  return (
    <p key={person.id}>
      {person.name} {person.number}
      <button onClick={deleteClick}>
        delete
      </button>
    </p>
  )
}
  
export default Person 