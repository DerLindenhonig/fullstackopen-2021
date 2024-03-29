import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from "./components/Notification"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  },[dispatch])

  return (
    <div>
      <Filter/>
      <Notification/>
      <AnecdoteForm/>
      <AnecdoteList/>
    </div>
  )
}

export default App