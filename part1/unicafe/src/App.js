
import { useState } from 'react'

const Button = ({btnLabel, handleClick}) => (
  <button onClick={handleClick}>
    {btnLabel}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Button btnLabel={'good'} handleClick={()=> setGood(good+1)} />
      <Button btnLabel={'neutral'} handleClick={()=>setNeutral(neutral+1)} />
      <Button btnLabel={'bad'} handleClick={()=> setBad(bad+1)} />

      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
    </div>
  )
}

export default App;
