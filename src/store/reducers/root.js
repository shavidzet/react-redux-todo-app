import faker from 'faker'
const initialState = []

const root = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TEST':
      return [
        ...state,
        faker.name.findName()
      ]
    default:
      return state
  }
}

export default root
