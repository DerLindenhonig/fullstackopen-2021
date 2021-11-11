require('dotenv').config()
const express = require('express');
const morgan = require("morgan");
const app = express();
const cors = require('cors')
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
    console.log("Method:", request.method);
    console.log("Path:  ", request.path);
    console.log("Body:  ", request.body);
    console.log("---");
    next();
};

app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger);
app.use(morgan('tiny'));
app.use(cors());

morgan.token("body", request => JSON.stringify(request.body));

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 3
    }
]

// info sivu
app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        persons.map(person => person.toJSON());
        response.send(`<p>Phonebook has info for ${persons.length} people.</p>
    <p>${new Date()}</p>`)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons.map(person => person.toJSON()));
    })
})

// yksittäisen resurssin haku
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person.toJSON())
            } else {
                response.status(404).end()
            }
        })
})

// poistaan note:
app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end();
        })
})

// lisääminen
app.post('/api/persons', (request, response) => {
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
        id: Math.floor(Math.random() * 1000),
    })

    person
        .save()
        .then(savedPerson => {
            response.send(savedPerson.toJSON())
        })

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
