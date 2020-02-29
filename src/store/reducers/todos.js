import { combineReducers } from 'redux'
import {
  TODO_CREATE_REQUESTED,
  TODO_CREATE_SUCCEEDED,
  TODO_CREATE_FAILED,
  TODOS_GET_REQUESTED,
  TODOS_GET_SUCCEEDED,
  TODOS_GET_FAILED,
  TODO_UPDATE_REQUESTED,
  TODO_UPDATE_SUCCEEDED,
  TODO_UPDATE_FAILED,
  TODO_DELETE_REQUESTED,
  TODO_DELETE_SUCCEEDED,
  TODO_DELETE_FAILED
} from '../constants'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const createTodoInitialState = {
  isFetching: false,
  isError: false,
  response: {
    status: '',
    data: '',
    errorMessage: ''
  }
}

const createTodo = (state = createTodoInitialState, action) => {
  switch (action.type) {
    case TODO_CREATE_REQUESTED:
      return {
        ...createTodoInitialState,
        isFetching: true
      }
    case TODO_CREATE_SUCCEEDED:
      return {
        ...createTodoInitialState,
        response: {
          ...createTodoInitialState.response,
          status: action.response.status,
          data: action.response.data
        }
      }
    case TODO_CREATE_FAILED:
      return {
        ...createTodoInitialState,
        isError: true,
        response: {
          ...createTodoInitialState.response,
          status: action.response.status,
          data: action.response.data,
          errorMessage: action.message
        }
      }
    default:
      return state
  }
}

const getTodosInitialState = {
  isFetching: false,
  isError: false,
  response: {
    status: '',
    data: [],
    errorMessage: ''
  }
}

const getTodos = (state = getTodosInitialState, action) => {
  switch (action.type) {
    case TODOS_GET_REQUESTED:
      return {
        ...getTodosInitialState,
        isFetching: true,
        response: {
          ...getTodosInitialState.response,
          data: state.response.data
        }
      }
    case TODOS_GET_SUCCEEDED:
      return {
        ...getTodosInitialState,
        response: {
          ...getTodosInitialState.response,
          status: action.response.status,
          data: Object
            .entries(action.response.data || [])
            .map(([id, todo]) =>
              ({ id, ...todo })
            )
        }
      }
    case TODOS_GET_FAILED:
      return {
        ...getTodosInitialState,
        isError: true,
        response: {
          ...getTodosInitialState.response,
          status: action.response.status,
          data: action.response.data,
          errorMessage: action.message
        }
      }
    default:
      return state
  }
}

const updateTodoInitialState = {
  isFetching: false,
  isError: false,
  response: {
    status: '',
    data: '',
    errorMessage: ''
  }
}

const updateTodo = (state = updateTodoInitialState, action) => {
  switch (action.type) {
    case TODO_UPDATE_REQUESTED:
      return {
        ...updateTodoInitialState,
        isFetching: true
      }
    case TODO_UPDATE_SUCCEEDED:
      return {
        ...updateTodoInitialState,
        response: {
          ...updateTodoInitialState.response,
          status: action.response.status,
          data: action.response.data
        }
      }
    case TODO_UPDATE_FAILED:
      return {
        ...updateTodoInitialState,
        isError: true,
        response: {
          ...updateTodoInitialState.response,
          status: action.response.status,
          data: action.response.data,
          errorMessage: action.message
        }
      }
    default:
      return state
  }
}

const deleteTodoInitialState = {
  isFetching: false,
  isError: false,
  response: {
    status: '',
    data: '',
    errorMessage: ''
  }
}

const deleteTodo = (state = deleteTodoInitialState, action) => {
  switch (action.type) {
    case TODO_DELETE_REQUESTED:
      return {
        ...deleteTodoInitialState,
        isFetching: true
      }
    case TODO_DELETE_SUCCEEDED:
      return {
        ...deleteTodoInitialState,
        response: {
          ...deleteTodoInitialState.response,
          status: action.response.status,
          data: action.response.data
        }
      }
    case TODO_DELETE_FAILED:
      return {
        ...deleteTodoInitialState,
        isError: true,
        response: {
          ...deleteTodoInitialState.response,
          status: action.response.status,
          data: action.response.data,
          errorMessage: action.message
        }
      }
    default:
      return state
  }
}

const authPersistConfig = {
  key: 'todos.createTodo',
  storage: storage
}

export default combineReducers({
  createTodo,
  getTodos: persistReducer(authPersistConfig, getTodos),
  updateTodo,
  deleteTodo
})
