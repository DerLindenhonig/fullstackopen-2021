const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = (sum, blog) => sum + blog.likes
  return blogs.length === 0 ? 0 : blogs.reduce(total, 0)
}

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((a, blog) => {
    return (a.likes > blog.likes) ? a : blog
  })
  return result
}

const mostLikes = (blogs) => {
  const result = blogs.reduce((max, item) => item.likes > max.likes ? item : max)

  const resultObject = {
    author: result.author,
    likes: result.likes
  }
  return resultObject
}

const mostBlogs = (blogs) => {
  const authorResult = blogs.reduce((max, item) => item.author > max.author ? item : max)
  const authors = blogs.map(b => b.author)
  const blogsResult = authors.filter(a => a === authorResult.author).length

  const resultObject = {
    author: authorResult.author,
    blogs: blogsResult
  }
  return resultObject
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs
}