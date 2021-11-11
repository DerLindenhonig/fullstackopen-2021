const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const nameInput = process.argv[3]
const numberInput = process.argv[4]

const url =
    `mongodb+srv://fullstack:${password}@clusterosa3.ejhey.mongodb.net/persons-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if ((process.argv.length < 5)) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name + " " + person.number)
        })
        mongoose.connection.close()
        console.log('Connection closed')
    })
} else {
    const person = new Person({
        name: nameInput,
        number: numberInput,
    })

    person.save().then(result => {
        console.log(`added ${nameInput} number ${numberInput} to phonebook`)
        mongoose.connection.close()
        console.log('Connection closed')
    })
}