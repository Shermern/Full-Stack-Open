import { useState } from 'react'

const Next = (props) => {
  return (
    <button onClick={() => props.setSelected(Math.floor(Math.random() * 8))}>Next Anecdote</button>
  )
}

const Vote = (props) => {
  const copy = [...props.votes]
  copy[props.selected] += 1

  return (
    <button onClick = {() => props.setVotes(copy)}>Vote</button>
  )
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [votes, setVotes] = useState(new Array(8).fill(0));
  const [selected, setSelected] = useState(0)
  console.log(votes)

  const max = Math.max(...votes);
  const index = votes.indexOf(max);
  console.log(max)
  console.log(index) 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} vote/s</p>
      <div>
          <Next setSelected = {setSelected}/>
        <Vote selected = {selected} setVotes = {setVotes} votes = {votes} />
      </div>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[index]}
      <p>has {votes[index]} votes</p>
    </div>
  )
}

export default App
