const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newStateG = { ...state }
      newStateG.good++
      return newStateG
    case 'OK':
      const newStateO = { ...state }
      newStateO.ok++
      return newStateO
    case 'BAD':
      const newStateB = { ...state }
      newStateB.bad++
      return newStateB
    case 'ZERO':
      const newStateZ = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return newStateZ
    default: return state
  }
  
}

export default counterReducer