const express = require('express')
const app = express()

app.use(express.json())

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
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
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
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({
            error: "name missing"
        });
    }

    if (body.number === undefined) {
        return response.status(400).json({
            error: "number missing"
        });
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 100000),
    }

    person
        .save()
        .then(savedPerson => savedPerson.toJSON())
        .catch(error => {
            return response.status(400).json({
                error: "name must be unique"
            });
        });
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)

})