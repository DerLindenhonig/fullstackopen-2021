import React, { useState, useEffect } from 'react'
import PersonService from './services/personService'
import Persons from './components/persons'
import Form from './components/form'
import Filter from './components/filter'
import Notification from './components/notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        PersonService.getAll().then(initialPersons => {
            setPersons(initialPersons)
        })
    }, [])

    const handleAddPerson = event => {
        event.preventDefault()
        const person = persons.find(person => person.name === newName)
        if (person) {
            const response = window.confirm(
                `${person.name} is already added to phonebook, replace the old number with a new one?`
            )
            if (response)
                return handleEdit({ name: newName, number: newNumber, id: person.id })
        }

        const newPerson = { name: newName, number: newNumber }
        PersonService.create(newPerson)
            .then(response => {
                setPersons(persons.concat(response))
                setNewName('')
                setNewNumber('')
                setMessage({
                    content: `${newPerson.name} was added`,
                    type: 'success'
                })
                setTimeout(() => setMessage(null), 5000)
            })
            .catch(error => {
                setMessage({ content: error.response.data.error, type: 'error' })
                setTimeout(() => setMessage(null), 5000)
            })
    }

    const handleEdit = person => {
        const newObject = PersonService.update(person)
        newObject
            .then(updatedPerson => {
                setPersons(persons.map(p => (p.id !== updatedPerson.id ? p : updatedPerson)))
                setNewName('')
                setNewNumber('')
                setMessage({
                    content: `Number of ${person.name} was replaced`,
                    type: 'success'
                })
                setTimeout(() => setMessage(null), 5000)
            })
            .catch(() => {
                setMessage({
                    content: `Number of ${person.name} was not replaced`,
                    type: 'error'
                })
                setTimeout(() => setMessage(null), 5000)
            })
    }

    const handleDelete = person => {
        const response = window.confirm(`Delete ${person.name}'?`)
        if (response)
            PersonService.remove(person)
                .then(() => {
                    setMessage({
                        content: `The person '${person.name}' was deleted`,
                        type: 'success'
                    })
                    setTimeout(() => setMessage(null), 5000);
                })
                .catch(() => {
                    setMessage({
                        content: `The person '${person.name}' was already deleted from server`,
                        type: 'error'
                    })
                    setTimeout(() => setMessage(null), 5000)
                })
                .finally(() => {
                    const newPersons = persons.filter(p => p.id !== person.id)
                    setPersons(newPersons)
                })
    }

    const handleNameChange = event => {
        setNewName(event.target.value)
    }

    const handleNumberChange = event => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = event => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
            <Filter filter={filter} onFilterChange={handleFilterChange}/>
            <h2>Add a new</h2>
            <Form
                onSubmit={handleAddPerson}
                newName={newName}
                onNameChange={handleNameChange}
                number={newNumber}
                onNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter} onDelete={handleDelete} />
        </div>
    )
}

export default App