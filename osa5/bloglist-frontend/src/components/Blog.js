import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setUpdateBlogs, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const hideDeleteBtn = { display: deleteVisible ? 'none' : '' }

  const changeVisible = () => {
    setVisible(!visible)
    if (blog.user.name !== user.name) {
      setDeleteVisible(true)
    }
  }

  const addLike = async event => {
    event.preventDefault()

    const newBlog = {
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user
    }
    await blogService.update(blog.id, newBlog)
    setUpdateBlogs(Math.random() * 100)
  }

  const deleteBlog = async event => {
    event.preventDefault()

    if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      blogService.setToken(user.token)
      await blogService.remove(blog.id, user.token)
      setUpdateBlogs(Math.random() * 100)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible} className='blogBriefly'>
        {blog.title} {blog.author}
        <button id='view' onClick={changeVisible}>view</button>
      </div>

      <div style={showWhenVisible} className='blogInDetail'>
        <button onClick={changeVisible}>hide</button>
        <div>title: {blog.title}</div>
        <div>author: {blog.author}</div>
        <div>url: {blog.url}</div>
        <div>likes: {blog.likes}<button id='like' onClick={addLike}>like</button></div>
        <button id='delete' style={hideDeleteBtn} onClick={deleteBlog}>delete blog</button>
      </div>
    </div>
  )
}

export default Blog
