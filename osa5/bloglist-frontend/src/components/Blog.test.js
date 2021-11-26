import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Blog from "./Blog";
import SimpleBlog from "./SimpleBlog";

describe('<Blog />', () => {
  // Blogin näyttävä komponentti renderöi blogin titlen, authorin,
  // mutta ei renderöi oletusarvoisesti urlia eikä likejen määrää.
  test('renders content of blog', () => {
    const blog = {
      title: "Title",
      author: "Author",
      url: "Url",
      likes: 23,
      user: '6192a8e310c2f47b78690f5b'
    }

    const user = {
      username: 'uusi käyttäjä'
    }

    const component = render(
      <Blog blog={blog} user={user}/>
    )
    const blogBrieflyDiv = component.container.querySelector('.blogBriefly')

    expect(blogBrieflyDiv).toHaveTextContent('Title')
    expect(blogBrieflyDiv).toHaveTextContent('Author')
    expect(blogBrieflyDiv).not.toHaveTextContent('Url')
    expect(blogBrieflyDiv).not.toHaveTextContent('23')
  })

  // Url ja likejen määrä näytetään kun blogin kaikki tiedot näyttävää nappia on painettu.
  test('view button opens details of blog', () => {
    const blog = {
      title: "Title",
      author: "Author",
      url: "Url",
      likes: 23,
      user: '6192a8e310c2f47b78690f5b'
    }

    const user = {
      username: 'uusi käyttäjä'
    }

    const component = render(
      <Blog blog={blog} user={user}/>
    )

    const blogInDetailDiv = component.container.querySelector('.blogInDetail')
    const button = component.getByText('view')

    expect(blogInDetailDiv).toHaveStyle('display: none')
    fireEvent.click(button)
    expect(blogInDetailDiv).not.toHaveStyle('display: none')
  })

  // Jos komponentin like-nappia painetaan kahdesti, komponentin propsina
// saamaa tapahtumankäsittelijäfunktiota kutsutaan kaksi kertaa.
  test('clicks like button two times', async () => {
    const blog = {
      title: "Blogi",
      author: "Kirjoittaja",
      url: "example.com",
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
})

