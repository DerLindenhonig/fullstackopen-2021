import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [refreshBlogs, setRefreshedBlogs] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [refreshBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleAddBlog = (blogObject) => {
    try {
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setMessage({
            content: `new blog ${blogObject.title} by ${blogObject.author} was added`,
            type: 'successMessage'
          })
          setTimeout(() => setMessage(null), 5000)
        })
    } catch (error) {
      setMessage({
        content: 'blog was not added',
        type: 'errorMessage'
      })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
    } catch (error) {
      setMessage('logout is not succeed')
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={message}/>

      <h2>Login</h2>

      {user === null ?
        <LoginForm
          username={username}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          setUsername={setUsername}
          setMessage={setMessage}
        /> :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>

          <Togglable buttonLabel='create new blog'><NewBlogForm createBlog={handleAddBlog}/></Togglable>

          <h2>Blogs</h2>

          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              setRefreshedBlogs={setRefreshedBlogs}
              user={user}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App