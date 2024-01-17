import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useField from "../hooks"

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

    const { reset, spreadContent } = { ...content }
    console.log(spreadContent)
    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...spreadContent} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    url for more info
                    <input {...info} />
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