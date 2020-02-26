import React, { useEffect } from 'react'
import logo from './logo.svg'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'

function App (props) {
  const dispatch = useDispatch()
  const testState = useSelector(state => state.root)
  const characters = useSelector(state => state.characters)

  useEffect(() => {
    dispatch({ type: 'CHARACTERS_FETCH_REQUESTED' })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {characters.isFetching
            ? <h2>Loading</h2>
            : <ul>
              {characters.data.map((character, index) => <li key={index}>{character.name}</li>)}
            </ul>
          }
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
            Learn React
        </a>
        <ul>
          {testState.map((message, index) => <li key={index}>{message}</li>)}
        </ul>
        <button onClick={() => dispatch({ type: 'ADD_TEST' })}>Update store</button>
      </header>
    </div>
  )
}

export default App
