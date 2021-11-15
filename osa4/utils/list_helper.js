const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = blogs => {
    return blogs.reduce((a, b) => (a.likes > b.likes ? a : b))
}

const mostLikes = blogs => {
    const result = _.chain(blogs)
        .groupBy('author')
        .map((value, key) => ({ author: key, likes: totalLikes(value) }))
        .reduce((max, entry) => {
            return max.likes > entry.likes ? max : entry
        })
        .value()
    return result
}

const mostBlogs = blogs => {
    const result = _.chain(blogs)
        .groupBy('author')
        .map((value, key) => ({ author: key, blogs: value.length }))
        .reduce((max, entry) => {
            return max.blogs > entry.blogs ? max : entry
        })
        .value()
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikes,
    mostBlogs
}