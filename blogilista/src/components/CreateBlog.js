import { useState } from 'react'


const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    createBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        Title: <input
          id='title'
          type="text"
          name="Title"
          value={title}
          placeholder='title here'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author: <input
          id='author'
          type="text"
          name="Author"
          value={author}
          placeholder='author here'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url: <input
          id='url'
          type="text"
          name="Url"
          value={url}
          placeholder='url here'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default CreateBlogForm