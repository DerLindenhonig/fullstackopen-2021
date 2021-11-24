import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { Container } from 'react-bootstrap'
import Login from './components/LoginForm'
import Blog from './components/Blog'
import Users from './components/UserList'
import User from './components/User'
import { connect } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  Route,
  Switch
} from 'react-router-dom'
import NavBar from './components/Menu'

const App = (props) => {
  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user).then(blogService.setToken(user.token)
      )
    }

  }, [])

  if (props.user === null) {
    return (
      <Container>
        <Notification/>
        <Login/>
      </Container>
    )
  }

  const userId = (id) => props.users.find(u => u.id === id)
  const blogId = (id) => props.blogs.find(u => u.id === id)

  return (
    <div className='container'>
      <NavBar/>
      <Notification/>
      <br/>
      <Switch>
        <Route path='/users/:id' render={({ match }) => <User user={userId(match.params.id)}/>}/>
        <Route path='/users' component={Users}/>
        <Route path='/blogs/:id' render={({ match }) => <Blog blog={blogId(match.params.id)}/>}/>
        <Route path='/' component={BlogList}/>
      </Switch>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}
const mapDispatchToProps = { initializeBlogs, initializeUsers, setUser }

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp