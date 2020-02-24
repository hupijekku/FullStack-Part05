import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let mockHandler
  beforeEach(() => {
    mockHandler = jest.fn()
    const blog = {
      title: 'test blog',
      author: 'test author',
      url: 'www.url.test',
      user: {
        username: 'Test',
        name:'TestUser',
        id: '5e4bf4b563073925ecda2a98'
      }
    }
    component = render(
      <Blog blog={blog} user={
        {
          token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJpZCI6IjVlNGJmNGI1NjMwNzM5MjVlY2RhMmE5OCIsImlhdCI6MTU4MjU2NjA2Mn0.3IJyijfWR9Iqj6174OWYOLmSFOyJUJU43iSpJMfveK8',
          username: 'Test',
          name:'TestUser'
        }
      } addLike={mockHandler}/>
    )
  })
  test('Blog initially shows title and author, but not url or likes', () => {
    expect(component.container).toHaveTextContent('test blog')
    expect(component.container).toHaveTextContent('test author')

    //Used styles to hide/show the fullview, I it should've been done differently?
    const div = component.container.querySelector('.fullView')

    expect(div).toHaveStyle('display: none')
  })

  test('Blog shows url and likes once the view-button has been pressed', () => {
    const div = component.container.querySelector('.fullView')
    const button = component.getByText('view blog')
    fireEvent.click(button)

    expect(div).not.toHaveStyle('display: none')
  })

  test('Clicking view-button twice calls the handler twice', () => {
    const button = component.getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })

})

