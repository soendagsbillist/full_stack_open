/* eslint-disable react/prop-types */
const App = () => {
  const course = { 
    name: 'Half Stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
    name: 'State of a component',
    exercises: 14
    }
  ]
}

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Part = ({ name, exercise }) => {
  console.log("this is part " + name)
  console.log("this is part " + exercise)
  return (
    <>
      <p>{name} {exercise}</p>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      <Part name={parts[0].name} exercise={parts[0].exercises}/>
      <Part name={parts[1].name} exercise={parts[1].exercises}/>
      <Part name={parts[2].name} exercise={parts[2].exercises}/>
    </>
  )
}

const Total = ({ parts }) => {
  const totalExercises = parts[0].exercises + parts[1].exercises + parts[2].exercises 
  return (
    <>
      <p>Number of exercises {totalExercises}</p>
    </>
  )
}

export default App
