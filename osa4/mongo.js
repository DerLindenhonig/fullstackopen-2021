const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@clusterosa3.ejhey.mongodb.net/blogs-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: "new blog",
    author: "new author",
    url: "new url",
    likes: "0"
})

// tallentaminen tietokantaan tarkistuksen varten:
/*blog.save().then(response => {
  console.log('blog saved!')
  mongoose.connection.close()
})*/

Blog.find({}).then(result => {
    result.forEach(blog => {
        console.log(blog)
    })
    mongoose.connection.close()
})