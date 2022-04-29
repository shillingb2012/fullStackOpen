// Takes care of rendering the name of the course
const Header = (props) => {
  console.log(props);
  return (
    <h1>{props.course}</h1>
  )
}

// Part renders the part and exercise
const Part = (props) => {
  return (
    <p>
      {props.part} {props.e}
    </p>
  )
}

// Renders the parts and their number of exercises
function Content(props) {
  return (
    <div>
      <Part part={props.part1.name} e={props.part1.exercises} />
      <Part part={props.part2.name} e={props.part2.exercises} />
      <Part part={props.part3.name} e={props.part3.exercises} />
    </div>
  )
}

// Renders total number of exercises
const Total = (props) => {
  return (
    <p>
      Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} /> 
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part2.exercises} />
    </div>
  )
}
export default App;