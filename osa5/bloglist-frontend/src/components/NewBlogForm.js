import React, { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }

  const handleAddBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleAddBlog}>
        title: <input id='title' value={newTitle} onChange={handleTitleChange}/> <br></br>
        author: <input id='author' value={newAuthor} onChange={handleAuthorChange}/> <br></br>
        url: <input id='url' value={newUrl} onChange={handleUrlChange}/> <br></br>
        <button type="submit">save</button>
      </form>
    </div>
  )

}

export default NewBlogForm