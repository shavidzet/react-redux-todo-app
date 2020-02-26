const initialState = {
  isFetching: false,
  data: [],
  info: {},
  hasError: false
}

const root = (state = initialState, action) => {
  switch (action.type) {
    case 'CHARACTERS_FETCH_REQUESTED':
      return {
        ...state,
        isFetching: true
      }
    case 'CHARACTERS_FETCH_SUCCEEDED':
      return {
        ...state,
        isFetching: false,
        data: action.characters.data.results,
        info: action.characters.data.info
      }
    case 'CHARACTERS_FETCH_FAILED':
      return {
        ...initialState,
        hasError: true
      }
    default:
      return state
  }
}

export default root
