import React from 'react'
import { useField } from '../hooks'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'

const NewBlogForm = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()

    props.createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })

    titleReset()
    authorReset()
    urlReset()
  }

  const Button = styled.button`
  background: White;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Black;
  border-radius: 3px;
`

  return (
    <div>
      <h2>create new blog</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <label>title</label>
          <input {...title} />
        </Form.Group>
        <Form.Group>
          <label>author</label>
          <input {...author} />
        </Form.Group>
        <Form.Group>
          <label>url</label>
          <input {...url} />
        </Form.Group>
        <Button variant='' type="submit">create blog</Button>
      </Form>
    </div>
  )
}

export default NewBlogForm