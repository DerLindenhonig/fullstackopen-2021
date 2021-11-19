import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SimpleBlog from './SimpleBlog'

// Jos komponentin like-nappia painetaan kahdesti, komponentin propsina
// saamaa tapahtumankäsittelijäfunktiota kutsutaan kaksi kertaa.
test('twice clicking like button calls eventHandler twice', async () => {
  const blog = {
    title: "Title",
    author: "Author",
    url: "Url",
    likes: 23,
    user: '61918507e324699ea054df9c'
  }
  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const likeButton = component.getByText('like')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})