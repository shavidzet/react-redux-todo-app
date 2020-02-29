import React, { useEffect, useState, useRef } from 'react'
import logo from './logo.svg'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'

const todoItem = (handleUpdate, handleDelete) => (todo, index) => <li
  key={todo.id}
>
  <span>{todo.name}</span>
  <button onClick={() => handleUpdate(todo)}>Rename</button>
  <button onClick={() => handleDelete(todo)}>Delete</button>
</li>

function App (props) {
  const dispatch = useDispatch()
  const [newTodoName, setTodoName] = useState('')
  const isPostingTodo = useSelector(state => state.todos.createTodo.isFetching)
  const isPostedTodo = useSelector(state => state.todos.createTodo.response.status === 200)
  const isReadingTodos = useSelector(state => state.todos.getTodos.isFetching)
  const isUpdatingTodo = useSelector(state => state.todos.updateTodo.isFetching)
  const isDeletingTodo = useSelector(state => state.todos.deleteTodo.isFetching)
  const todos = useSelector(state => state.todos.getTodos.response.data)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({
      type: 'TODO_CREATE_REQUESTED',
      name: newTodoName
    })
  }

  const handleUpdate = (todo) => {
    const updatedTodoName = prompt(`What's the new name of todo: ${todo.name}`)

    if (!updatedTodoName) {
      return
    }

    dispatch({
      type: 'TODO_UPDATE_REQUESTED',
      id: todo.id,
      name: updatedTodoName
    })
  }

  const handleDelete = (todo) => {
    dispatch({
      type: 'TODO_DELETE_REQUESTED',
      id: todo.id
    })
  }

  useEffect(() => {
    dispatch({
      type: 'TODOS_GET_REQUESTED'
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
      {isUpdatingTodo ? <h2>Updating todos in progress...</h2> : null}
      {isDeletingTodo ? <h2>Deleting todos in progress...</h2> : null}

      <div>
        <ul>
          {todos.map(todoItem(handleUpdate, handleDelete))}
        </ul>
      </div>
    </div>
  )
}

export default App
