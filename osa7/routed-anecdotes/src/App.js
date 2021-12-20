import React, { useState } from 'react'
import {
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch
} from "react-router-dom"
import  { useField } from './hooks/index'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>{anecdote.author}</div>
      <div>has {anecdote.votes} votes <button onClick={() => vote(anecdote.id)}>vote</button></div>
      <div>{anecdote.info}</div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h1>Anecdotes</h1>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >
          <Link to={`/${anecdote.id}`}>{anecdote.content}</Link></li>
      )}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter
      but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a
      person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a
    href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for
    the source code.
  </div>
)

const CreateNew = (props) => {
  const history = useHistory();

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const resetInputs = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input value={content.value} type={content.type} onChange={content.onChange}/>
        </div>
        <div>
          author
          <input value={author.value} type={author.type} onChange={author.onChange}/>
        </div>
        <div>
          url for more info
          <input value={info.value} type={info.type} onChange={info.onChange}/>
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={resetInputs}>reset</button>
      </form>
    </div>
  )
}

const App = () => {
const [anecdotes, setAnecdotes] = useState([
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: '1'
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: '2'
  }
])

const [notification, setNotification] = useState('')

const addNew = (anecdote) => {
  anecdote.id = (Math.random() * 10000).toFixed(0)
  setAnecdotes(anecdotes.concat(anecdote))

  setNotification(`new anecdote ${anecdote.content} was created`)
  setTimeout(() => {
    setNotification("")
  }, 10000);
}

const anecdoteById = (id) =>
  anecdotes.find(a => a.id === id)

const vote = (id) => {
  const anecdote = anecdoteById(id)

  const voted = {
    ...anecdote,
    votes: anecdote.votes + 1
  }

  setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
}

const match = useRouteMatch('/:id')
const anecdote = match
  ? anecdotes.find(anecdote => anecdote.id === match.params.id)
  : null

const Nav = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to="/">all anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

return (
  <div>
    <h1>Anecdotes</h1>
    <Nav/>
    {notification}
    <Switch>
      <Route path='/about'>
        <About/>
      </Route>
      <Route path='/create'>
        <CreateNew addNew={addNew}/>
      </Route>
      <Route path='/:id'>
        <Anecdote
          anecdote={anecdote}
          vote={vote}
        />
      </Route>
      <Route path='/'>
        <AnecdoteList anecdotes={anecdotes}/>
      </Route>
    </Switch>
    <br/>
    <Footer/>
  </div>
)
}

export default App;
