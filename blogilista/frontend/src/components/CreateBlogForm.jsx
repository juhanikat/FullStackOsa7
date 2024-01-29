import { Form, Button } from "react-bootstrap"
import React from "react"

const CreateBlogForm = ({ createBlog }) => {
  const onSubmit = (event) => {
    event.preventDefault()
    createBlog(
      event.target.title.value,
      event.target.author.value,
      event.target.url.value
    )
    event.target.title.value = ""
    event.target.author.value = ""
    event.target.url.value = ""
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control type="text" name="title" />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control type="text" name="author" />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control type="text" name="url" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  )
}

export default CreateBlogForm
