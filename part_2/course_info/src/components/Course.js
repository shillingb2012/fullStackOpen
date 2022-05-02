import React from 'react'

const Header = ({ course }) => 
  <h1>
    {course.name}
  </h1>

const Total = ({ sum }) => 
  <p>
    <b>total of {sum} exercises</b>
  </p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </>

const Course = ({ course }) => {
  // Creates new array of only exercises
  const exercises = course.parts.map(part => part.exercises)
  const totalExercises = exercises.reduce((previous, current) => previous + current)
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total sum={totalExercises} />
    </>
  )
}

export default Course