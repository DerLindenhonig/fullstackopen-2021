import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Blog from "./Blog";

describe('<Blog />', () => {
  // Blogin näyttävä komponentti renderöi blogin titlen, authorin,
  // mutta ei renderöi oletusarvoisesti urlia eikä likejen määrää.
  test('renders content of blog', () => {
    const blog = {
      title: "Title",
      author: "Author",
      url: "Url",
      likes: 23,
    }

    const component = render(
      <Blog blog={blog}/>
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
    }

    const component = render(
      <Blog blog={blog}/>
    )

    const blogInDetailDiv = component.container.querySelector('.blogInDetail')
    const button = component.getByText('view')

    expect(blogInDetailDiv).toHaveStyle('display: none')
    fireEvent.click(button)
    expect(blogInDetailDiv).not.toHaveStyle('display: none')
  })
})

