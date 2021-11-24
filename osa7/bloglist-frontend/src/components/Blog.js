import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = (props) => {
  if (!props.blog) {
    return null
  }

  const likeBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    props.likeBlog(likedBlog)
    props.setNotification({
      message: `Blog ${blog.title} was liked!`,
      type: 'success'
    }, 5)
  }

  const removeBlog = async (blog) => {
    const confirmed = window.confirm(`Are you sure you want to delete blog ${blog.title} by ${blog.author}?`)
    if (confirmed) {
      props.deleteBlog(blog)
      props.setNotification({
        message: `Blog ${blog.title} was deleted!`,
        type: 'success'
      }, 5)
    }
  }

  return (
    <div>
      <h2>{props.blog.title}</h2>
      <div>Author: {props.blog.author}</div>
      <div>Url: <a href={props.blog.url}>{props.blog.url}</a></div>
      {props.blog.likes} likes <button onClick={() => likeBlog(props.blog)}>like</button>
      <div>Added by user: {props.blog.user.name}</div>
      {props.blog.user.name === props.user.name ? (<button onClick={() => removeBlog(props.blog)}>delete</button>) : (null)}

    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    user: state.user
  }
}
const mapDispatchToProps = { setNotification, createBlog, deleteBlog, likeBlog }

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default ConnectedBlog