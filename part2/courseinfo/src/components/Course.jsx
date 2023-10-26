/* eslint-disable react/prop-types */
const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total course={course}/>
    </>
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
  return (
    <>
      <p>{name} {exercise}</p>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercise={part.exercises} />
      )}
    </>
  )
}

const Total = ({ course }) => {
  let initial = 0
  const totalExercises = course.parts.reduce((accumulator, part) => accumulator + part.exercises, initial)
  return (
    <>
      <p><b> Total of {totalExercises} exercises</b></p>
    </>
  )
}

export default Course 
