import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setRefreshedBlogs }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const [invisible] = useState(false)
  const hideDeleteBtn = { display: invisible ? 'none' : '' }

  const changeVisible = () => {
    setVisible(!visible)
  }

  const DeleteBlogBtn = () => {
    if (blog.user.username === user.username) {
      return <button id='delete' style={hideDeleteBtn} onClick={deleteBlog}>delete blog</button>
    } else {
      return null
    }
  }

  const deleteBlog = async event => {
    event.preventDefault()

    const confirm = window.confirm(`Are you sure you want to delete "${blog.title}"?`)
    if (confirm) {
      blogService.setToken(user.token)
      await blogService.remove(blog.id, user.token)
      const allBlogs = await blogService.getAll()
      setRefreshedBlogs(allBlogs)
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
    const allBlogs = await blogService.getAll()
    setRefreshedBlogs(allBlogs)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hide} className='blogBriefly'>
        {blog.title} {blog.author}
        <button id='view' onClick={changeVisible}>view</button>
      </div>

      <div style={show} className='blogInDetail'>
        <button onClick={changeVisible}>hide</button>
        <div>title: {blog.title}</div>
        <div>author: {blog.author}</div>
        <div>url: {blog.url}</div>
        <div>likes: {blog.likes}<button id='like' onClick={addLike}>like</button></div>
        <DeleteBlogBtn/>
      </div>
    </div>
  )
}

export default Blog