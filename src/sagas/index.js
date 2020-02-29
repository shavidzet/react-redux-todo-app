import { call, put, takeLatest, takeEvery, take, fork, all } from 'redux-saga/effects'
import axios from 'axios'
import {
  TODO_CREATE_REQUESTED,
  TODO_CREATE_SUCCEEDED,
  TODO_CREATE_FAILED,
  TODOS_GET_REQUESTED,
  TODOS_GET_SUCCEEDED,
  TODOS_GET_FAILED
} from '../store/constants'

const Api = {
  fetchTodos: () => axios.get('http://localhost:5000/todo-api-e3e2c/us-central1/api/todos'),
  addTodo: (name) => axios.post('http://localhost:5000/todo-api-e3e2c/us-central1/api/todo', { name })
}

const errorStructure = (type, response, message) => ({
  type,
  response,
  message
})

function * throwErrors (...args) {
  yield put(errorStructure(...args))
}

function * createTodo (action, x) {
  try {
    const response = yield call(Api.addTodo, action.name)
    yield all([
      put({ type: TODO_CREATE_SUCCEEDED, response }),
      put({ type: TODOS_GET_REQUESTED })
    ])
  } catch (e) {
    const { response, message } = e
    yield throwErrors(TODO_CREATE_FAILED, response, message)
  }
}

function * readTodos () {
  try {
    const response = yield call(Api.fetchTodos)
    yield put({ type: TODOS_GET_SUCCEEDED, response })
  } catch (e) {
    const { response, message } = e
    yield throwErrors(TODOS_GET_FAILED, response, message)
  }
}

function * mySaga () {
  yield takeLatest(TODO_CREATE_REQUESTED, createTodo)
  yield takeLatest(TODOS_GET_REQUESTED, readTodos)
}

export default mySaga
