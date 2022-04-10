import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const actionTypes = {GOOD:'GOOD', OK:'OK', BAD:'BAD', RESET:'ZERO'}
  const handleOnClick = (actionType) => {
    store.dispatch({
      type: actionType
    })
  }

  return (
    <div>
      <button onClick={()=>handleOnClick(actionTypes.GOOD)}>good</button> 
      <button onClick={() =>handleOnClick(actionTypes.OK)}>ok</button> 
      <button onClick={()=>handleOnClick(actionTypes.BAD)}>bad</button>
      <button onClick={()=>handleOnClick(actionTypes.RESET)}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)