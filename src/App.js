import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    success: false
  })

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, time, success) => {
    setNotification({
      message: message,
      success: success
    })
    console.log(notification)
    setTimeout(() => {
      setNotification({
        message: null,
        success: false
      })
    }, time * 1000)
  }

  const addBlog = (blogObject) => {
    console.log(blogObject)
    blogFormRef.current.toggleVisibility()
    blogService
      .saveBlog(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        showNotification(`Added ${returnedBlog.title}`, 5, true)
        console.log(returnedBlog)
      })
      .catch (error => {
        showNotification(`Adding a blog failed: ${error.response.data.error}`, 5, false)
      })
  }

  const addLike = (blogObject) => {
    const blogToSend = {
      user: blogObject.user.id,
      likes: blogObject.likes,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url
    }
    console.log(blogToSend)
    blogService
      .update(blogObject.id, blogToSend)
      .then(returnedBlog => {
        let copy = [...blogs]
        var i = blogs.findIndex(b => b.id === blogObject.id)
        copy[i] = returnedBlog
        setBlogs(copy)
      })
  }

  const removeBlog = (blogObject) => {
    if(window.confirm(`Do you really want to delete ${blogObject.title}?`)) {
      const i = blogs.findIndex(b => b.id === blogObject.id)
      const b = blogs[i]
      blogService
        .remove(blogObject.id)
        .then(() => {
          let copy = [...blogs]
          copy.splice(i,1)
          setBlogs(copy)
          showNotification(`${b.title} was successfully removed`, 5, true)
        }).catch(() => {
          showNotification(`Failed to remove ${b.title}`, 5, false)
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification('successfully logged in', 5, true)
    } catch (exception) {
      showNotification('wrong credentials', 5, false)
    }
  }

  const blogForm = () => {
    return (
      <div>
        <Togglable id='newnote' buttonLabel='Add new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
    )
  }

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const showBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.sort((a, b) => a.likes < b.likes ? 1 : -1).map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user} />
        )}
      </div>
    )
  }
  console.log(blogs.length)
  return (
    <div>

      <Notification notification={notification}/>

      {user === null ? loginForm() :
        <div id='blogsapp'>
          <p>{user.name} logged in <button onClick={logOut}>log out</button> </p>
          <h3> Create a new blog </h3>
          {blogForm()}
          {blogs.length === 0 ? <></> : showBlogs()}
        </div>
      }

    </div>
  )
}

export default App