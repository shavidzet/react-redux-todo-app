import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

const Api = {
  fetchCharacters: () => axios.get('https://rickandmortyapi.com/api/character/')
}

// worker Saga: will be fired on CHARACTERS_FETCH_REQUESTED actions
function * fetchCharacters (action) {
  try {
    const characters = yield call(Api.fetchCharacters)
    yield put({ type: 'CHARACTERS_FETCH_SUCCEEDED', characters })
  } catch (e) {
    yield put({ type: 'CHARACTERS_FETCH_FAILED', message: e.message })
  }
}

/*
  Starts fetchUser on each dispatched `CHARACTERS_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function * mySaga () {
  yield takeLatest('CHARACTERS_FETCH_REQUESTED', fetchCharacters)
}

export default mySaga
