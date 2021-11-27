import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const votedAnecdote = action.data
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote
      )
    default: return state
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const vote = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.update({ ...id, votes: id.votes + 1 })
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer