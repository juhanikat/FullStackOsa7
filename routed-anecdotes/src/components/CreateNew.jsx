import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useField from "../hooks"

const removeReset = (field) => {
    const { reset, ...result } = { ...field }
    return result
}

const CreateNew = ({ addNew, setNotification }) => {
    const navigate = useNavigate()
    const content = useField("text", "content")
    const author = useField("text", "author")
    const info = useField("text", "info")


    const handleSubmit = (event) => {
        event.preventDefault()
        addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        navigate("/")
        setNotification(`a new anecdote ${content.value} created!`)
        setTimeout(() => {
            setNotification("")
        }, 5000)
    }

    const newContent = removeReset(content)
    const newAuthor = removeReset(author)
    const newInfo = removeReset(info)
    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...newContent} />
                </div>
                <div>
                    author
                    <input {...newAuthor} />
                </div>
                <div>
                    url for more info
                    <input {...newInfo} />
                </div>
                <button type="submit">create</button>
                <button type="button" onClick={() => {
                    content.reset()
                    author.reset()
                    info.reset()
                }}>reset</button>
            </form>
        </div>
    )

}

export default CreateNew