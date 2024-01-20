import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import CreateBlogForm from '../components/CreateBlog'


describe('Blog tests', () => {
  let blogUser
  let blog

  beforeEach(() => {
    blogUser = {
      username: 'test user',
      id: '12345'
    }
    blog = {
      title: 'test title',
      author: 'test author',
      url: 'www.testurl.fi',
      likes: 5,
      user: blogUser
    }
  })

  test('by default, blog renders title and author but not url or likes', async () => {
    const { container } = render(<Blog blog={blog} likeBlog={jest.fn()} removeBlog={jest.fn()} currentUser={null} />)
    const div = container.querySelector('.defaultBlog')
    expect(div).toHaveTextContent('test title')
    expect(div).toHaveTextContent('test author')
    let element = screen.queryByText('www.testurl.fi', { exact: 'false' })
    expect(element).toBeNull()
    element = screen.queryByText('Likes: 5', { exact: 'false' })
    expect(element).toBeNull()
  })

  test('clicking view button shows url, likes and user', async () => {
    const { container } = render(<Blog blog={blog} likeBlog={jest.fn()} removeBlog={jest.fn()} currentUser={null} />)
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const div = container.querySelector('.expandedBlog')
    expect(div).toHaveTextContent('www.testurl.fi')
    expect(div).toHaveTextContent('Likes: 5')
    expect(div).toHaveTextContent('User: test user')
  })

  test('when like button is pressed twice, mock function is called twice', async () => {
    const likeBlog = jest.fn()
    render(<Blog blog={blog} likeBlog={likeBlog} removeBlog={jest.fn()} currentUser={null} />)
    const user = userEvent.setup()
    let button = screen.getByText('View')
    await user.click(button)
    button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })

  test('when creating new blog, form calls mock function with proper data', async () => {
    const createBlog = jest.fn()
    render(<CreateBlogForm createBlog={createBlog} />)
    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('title here')
    const authorInput = screen.getByPlaceholderText('author here')
    const urlInput = screen.getByPlaceholderText('url here')
    const sendButton = screen.getByText('add')

    await user.type(titleInput, 'test title')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'test url')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0]).toContainEqual('test title')
    expect(createBlog.mock.calls[0]).toContainEqual('test author')
    expect(createBlog.mock.calls[0]).toContainEqual('test url')
  })
})

