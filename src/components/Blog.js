import React, { useState } from 'react'
const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [fullView, setFullView] = useState(false)

  const showWhenVisible = {
    display: fullView ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeStyle = {
    display: 'inline'
  }

  const toggleView = () => {
    setFullView(!fullView)
  }

  const onLike = () => {
    blog.likes = blog.likes + 1
    addLike(blog)
  }

  const onRemoveBlog = () => {
    removeBlog(blog)
  }

  const removeButton = () => {
    return (
      <button onClick={onRemoveBlog}>remove</button>
    )
  }

  return (
    <div style={blogStyle} id='blogdiv'>
      {blog.title} - {blog.author} <button onClick={toggleView}>view blog</button>
      <div style={showWhenVisible} className='fullView'>
        {blog.url} <br />
        Likes: <p style={likeStyle} className='likecount'>{blog.likes}</p> <button onClick={onLike}>like</button> < br />
        By: {blog.user.name}
        {user.username === blog.user.username ? removeButton() : ''}
      </div>
    </div>
  )
}

export default Blog
