import { useState } from 'react'

const Header = ({headerName}) => <h1>{headerName}</h1>

const Button = ({clickEvent, buttonName}) => 
  <button onClick={clickEvent}>
    {buttonName}
  </button>

const Anecdote = ({words, numVotes}) => 
  <p>
    {words}<br></br>
    has {numVotes} votes
  </p>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  // Use states
  const [next, setNext] = useState(0);
  // Total of 7 quotes to track
  const [voteCount, setVoteCount] = useState(Array(7).fill(0));
  
  // function reference for getting a random 'next' value
  const nextQuote = () => {
    return setNext(Math.floor(Math.random() * anecdotes.length))
  }

  // function reference for voteClick. Creates a copy and updates voteCount reference
  const vote = () => {
    // New copy of array
    const copyVotesArr = [...voteCount]
    copyVotesArr[next] += 1
    return setVoteCount(copyVotesArr)
  }

  
  // Find the max number of votes in the array
  const maxNumber = Math.max(...voteCount);
  const maxIndex = voteCount.findIndex((element) => element === maxNumber)

  return (
    <div>
      {/* Show the current anecdote (can be voted for) */}
      <Header headerName='Anecdote of the day'/>
      <Anecdote words={anecdotes[next]} numVotes={voteCount[next]}/>
      <Button buttonName='vote' clickEvent={vote} />
      <Button buttonName='next anecdote' clickEvent={nextQuote}/>

      {/* Show anecdote with the most votes */}
      <Header headerName='Anecdote with most votes'/>
      <Anecdote words={anecdotes[maxIndex]} numVotes={voteCount[maxIndex]}/>
    </div>
  )
}

export default App