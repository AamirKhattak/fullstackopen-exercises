import { useState } from 'react';
import PropTypes from 'prop-types';

import blogService from '../services/blogs';

const Blog = ({ blog, onBlogRemove, onBlogUpdate }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [viewDetails, setViewDetails] = useState(false);

  const toggleVisiblity = () => {
    setViewDetails(!viewDetails);
  };

  const handleOnLike = async () => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    });
    onBlogUpdate(updatedBlog);
  };

  const handleOnRemove = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by "${blog.author}"`)) {
      //as usernames are unique, we can compare blog creator by username instead of userId
      try {
        await blogService.remove(blog.id);
        onBlogRemove(blog);
      } catch (error) {
        alert(`${error.message} \n ${error.config.method} ${error.config.url}`);
      }
    }
  };

  if (viewDetails) {
    const loggedInUser = JSON.parse(window.localStorage.loggedInUser);
    return (
      <div style={blogStyle}>
        <p>
          {blog.title} <button onClick={toggleVisiblity}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={handleOnLike}>like</button>
        </p>
        <p>{blog.author}</p>
        {blog.user.username === loggedInUser.username && (
          <p>
            <button onClick={handleOnRemove}>remove</button>
          </p>
        )}
      </div>
    );
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisiblity}>view</button>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onBlogRemove: PropTypes.func.isRequired,
  onBlogUpdate: PropTypes.func.isRequired,
};

export default Blog;
