import React, { useEffect, useState, useRef } from 'react'
import logo from './logo.svg'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'

const todoItem = (todo, index) => <li key={todo.id}>{todo.name}</li>

function App (props) {
  const dispatch = useDispatch()
  const [newTodoName, setTodoName] = useState('')
  const isPostingTodo = useSelector(state => state.todos.createTodo.isFetching)
  const isPostedTodo = useSelector(state => state.todos.createTodo.response.status === 200)
  const isReadingTodos = useSelector(state => state.todos.getTodos.isFetching)
  const todos = useSelector(state => state.todos.getTodos.response.data)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({
      type: 'TODO_CREATE_REQUESTED',
      name: newTodoName
    })
  }

  useEffect(() => {
    dispatch({
      type: 'TODOS_GET_REQUESTED',
    })
  }, [])

  useEffect(() => {
    if (isPostedTodo) {
      setTodoName('')
    }
  }, [isPostedTodo])

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTodoName(e.target.value)}
          value={newTodoName}
        />
        <button>Add</button>
      </form>

      {isReadingTodos ? <h2>{todos.length ? 'Updating' : 'Fetching'} todos in progress...</h2> : null}
      {isPostingTodo ? <h2>Posting todos in progress...</h2> : null}

      <div>
        <ul>
          {todos.map(todoItem)}
        </ul>
      </div>
    </div>
  )
}

export default App
