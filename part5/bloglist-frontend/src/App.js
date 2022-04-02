import { useState, useEffect } from "react";

import "./App.css";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(undefined);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const onLogin = (userDetails) => {
    setUser(userDetails);
    console.log(window.localStorage);
  };

  const onBlogFormSubmit = (newBlog) => {
    if (newBlog) {
      setBlogs(blogs.concat(newBlog));
    }
  };

  const handleNotification = (notification, type = undefined) => {
    setNotification({ message: notification, type: type });
    setTimeout(() => {
      setNotification(undefined);
    }, 5000);
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedInUser");
  };

  // TODO: Make the login 'permanent' by using the local storage.
  if (user === null) {
    return (
      <div>
        <h1>Login into application</h1>
        <Notification notification={notification} />
        <Login onLogin={onLogin} handleNotification={handleNotification} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <BlogForm
        onBlogFormSubmit={onBlogFormSubmit}
        handleNotification={handleNotification}
      />
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
