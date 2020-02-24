import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }
    createBlog(blogObject)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  const handleTitleChange = (event) => {
    setNewBlog({
      title: event.target.value,
      author: newBlog.author,
      url: newBlog.url
    })
  }
  const handleAuthorChange = (event) => {
    setNewBlog({
      title: newBlog.title,
      author: event.target.value,
      url: newBlog.url
    })
  }
  const handleUrlChange = (event) => {
    setNewBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: event.target.value
    })
  }

  return (
    <div>
      <form id='form' onSubmit={addBlog}>
        Title:
        <input id='title' value={newBlog.title} onChange={handleTitleChange} />
        Author:
        <input id='author' value={newBlog.author} onChange={handleAuthorChange} />
        Url:
        <input id='url' value={newBlog.url} onChange={handleUrlChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm