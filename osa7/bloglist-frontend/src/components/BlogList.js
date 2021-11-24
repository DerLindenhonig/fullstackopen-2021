import React from 'react'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const BlogList = (props) => {
  const newBlogRef = React.createRef()

  const handleCreateBlog = async (blog) => {
    newBlogRef.current.toggleVisibility()
    props.createBlog(blog)
    props.setNotification({
      message: `New blog ${blog.title} was added!`,
      type: 'success' }, 2)
  }

  return (
    <div>
      <h2>All blogs</h2>
      <Togglable buttonLabel='create new' ref={newBlogRef}>
        <NewBlogForm createBlog={handleCreateBlog} />
      </Togglable>
      <Table striped>
        <tbody>
          {props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>
                <em>{blog.likes} likes</em>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
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

const ConnectedBlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList)
export default ConnectedBlogList