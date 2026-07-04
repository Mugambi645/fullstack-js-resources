import Content from "./Content"
import Header from "./Header"

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header title={course} />
      <Content text={part1} />
      <Content text={part2} />
      <Content text={part3} />
    
    </div>
  )
}

export default App