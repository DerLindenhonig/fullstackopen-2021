import React from 'react'
import { Table } from 'semantic-ui-react'

const User = (props) => {

  if (!props.user) {
    return null
  }

  return (
    <div>
      <h2>blogs of {props.user.name}</h2>
      <Table striped>
        <tbody>
          {props.user.blogs.map(blog =>
            <tr key={blog.title}>
              <td>{blog.title}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default User