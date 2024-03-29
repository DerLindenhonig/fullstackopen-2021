const express = require('express')
const morgan = require("morgan")
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
    console.log("Method:", request.method)
    console.log("Path:  ", request.path)
    console.log("Body:  ", request.body)
    console.log("---")
    next()
}

app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(morgan('tiny'))
app.use(cors())

morgan.token("body", request => JSON.stringify(request.body))

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.send(`<p>Phonebook has info for ${persons.length} people. ${new Date()}</p>`)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons.map(person => person.toJSON()))
    })
})

// yksittäisen resurssin haku
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then(person => {
          if (person) {
              response.json(person)
          } else {
              response.status(404).end()
          }
      })
      .catch(error => next(error))
})

// poistaan note:
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
      .then(result => {
          response.status(204).end();
      })
      .catch(error => next(error));
})

// lisääminen
app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({
            error: "name missing"
        });
    }

    if (body.number  === undefined) {
        return response.status(400).json({
            error: "number missing"
        });
    }

    const person = new Person({
        name: body.name,
        number: body.number,
        id: Math.floor(Math.floor(Math.random() * (10000000 - 10000)))
    })

    person
      .save()
      .then(savedPerson => {
          response.send(savedPerson.toJSON())
      })
      .then(savedAndFormattedNote => {
          response.json(savedAndFormattedNote)
      })
      .catch(error => next(error));
})

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number
    };

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
          response.json(updatedPerson);
      })
      .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    next(error)
}
// virheellisten pyyntöjen käsittely
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
