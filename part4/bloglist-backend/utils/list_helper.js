const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  switch (blogs.length) {
    case 0:
      return 0;
    case 1:
      return blogs[0].likes;
    default:
      return blogs.reduce((total, curr) => (total = total + curr.likes), 0);
  }
};

const favoriteBlog = (blogs) => {
  const favBlog = blogs.reduce((mostLiked, curr) =>
    mostLiked.likes < curr.likes ? (mostLiked = curr) : mostLiked
  );
  return { title: favBlog.title, author: favBlog.author, likes: favBlog.likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
