import React, { useState } from 'react';
import blogsService from '../services/blogs';

import PropTypes from 'prop-types';

export default function BlogForm({ onBlogFormSubmit, handleNotification }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  const handleCreate = async (event) => {
    event.preventDefault();
    // console.log(username, password);
    const newBlog = { title, author, url };
    try {
      const responseNewBlog = await blogsService.create(newBlog);
      handleNotification(
        `a new blog ${responseNewBlog.title} by ${responseNewBlog.author} added.`,
        'success'
      );
      onBlogFormSubmit(responseNewBlog);
      setTitle('');
      setAuthor('');
      setURL('');
    } catch (error) {
      handleNotification(error.message);
    }
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleCreate}>
        <div>
          title :
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>{' '}
        <div>
          Author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
}

BlogForm.propTypes = {
  onBlogFormSubmit: PropTypes.func.isRequired,
  handleNotification: PropTypes.func,
};
