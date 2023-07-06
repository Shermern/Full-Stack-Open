import { useState } from 'react'

const Header = (props) => {
 return (
  <h1>{props.header}</h1>
 )
}

const StatisticLine = (props) => {

  if (props.text == "positive") {
    return (
      <tr>
      <td>{props.text}</td> 
      <td>{props.value}%</td>
    </tr>
    )
  }

  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const good = props.stats[0]
  const neutral = props.stats[1]
  const bad = props.stats[2]
  const total = good + bad + neutral
  if (total == 0) {
    return(
      <p>No Feedback Given</p>
    )
  }
    
  return (
    <table>
      <StatisticLine text="good" value ={good} /> 
      <StatisticLine text="neutral" value ={neutral} />  
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={good + neutral + bad} />
      <StatisticLine text="average" value ={((good - bad)/total).toFixed(2)} />
      <StatisticLine text="positive" value ={((good/total)*100).toFixed(2)} />
    </table>
  )
}

const Button = (props) => {
  return (
    <div>
      <button onClick={() => props.set(props.val + 1)}>{props.name}</button>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header = "give feedback"/>
      <Button set = {setGood} val = {good} name = "good"/>
      <Button set = {setNeutral} val = {neutral} name = "neutral"/>
      <Button set = {setBad} val = {bad} name = "bad"/>
      <Header header = "statistics"/>
      <Statistics stats = {[good, neutral, bad]} />
    </div>
  )
}

export default App