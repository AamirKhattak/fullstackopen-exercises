import React, {useState} from "react";

const Button = ({ btnLabel, handleClick }) => (
  <button onClick={handleClick}>{btnLabel}</button>
);

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
   
  let zeroVotesFilledArray = Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(zeroVotesFilledArray);

  const handleNextAnecdote = () => {    
    let indxAcdt = Math.floor((Math.random() * (anecdotes.length-1)) + 0);
    setSelected(indxAcdt);
  }

  const handleVoteAnecdote = () => {
      const copyVotes = {...votes};
      if(copyVotes[selected] === undefined){
        copyVotes[selected] = 0;
      }
      copyVotes[selected] += 1;
      setVotes(copyVotes);

  }

  let indxMostVotedAnecdote = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes </p> 
      <Button btnLabel="vote" handleClick={handleVoteAnecdote} />
      <Button btnLabel='next anecdote' handleClick={handleNextAnecdote} />
      
      <h3>Most Voted Anecdote</h3> 
      <p>{anecdotes[indxMostVotedAnecdote]}</p>
      <p>has {votes[indxMostVotedAnecdote]} votes</p>
    </div>
  )
  
}


export default App;
