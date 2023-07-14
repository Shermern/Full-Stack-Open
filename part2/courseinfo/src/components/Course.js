const Header = () => <h1>Web development Curriculum</h1>

const Subheader = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <b>Number of exercises {sum}</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  parts.map(part => <Part part = {part} />)

const Course = ({course}) => {
  const sum = course.parts.reduce((a, p) => a + p.exercises, 0)

  return (
    <div>
      <Header />
      <Subheader course={course.name} />
      <Content parts={course.parts} />
      <Total sum = {sum} />
    </div>
  )
}

export default Course