const express = require('express');
const morgan = require("morgan");
const app = express();
const cors = require('cors')

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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// yksittäisen resurssin haku
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// info sivu
app.get('/info', (request, response) => {
    response.send(`<p>Puhelinluettelossa ${persons.length} henkilön tiedot </p>
    <p>${new Date()}</p>`)
})

// poistaan note:
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// lisääminen
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: "name missing"
        });
    }

    if (!body.number) {
        return response.status(400).json({
            error: "number missing"
        });
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 100),
    }

    persons = persons.concat(person)

    response.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
