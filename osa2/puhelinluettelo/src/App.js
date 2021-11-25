import React, { useState, useEffect } from 'react'
import PersonService from './services/personService'
import People from './components/people'
import Form from './components/form'
import Filter from './components/filter'
import Notification from './components/notification'
import './index.css'

const App = () => {
  const [people, setPeople] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    PersonService
      .getAll()
      .then(initialPeople => {
      setPeople(initialPeople)
    })
  }, [])

  const addPerson = () => {
    const person = people
      .find(person => person.name === newName
    )

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (!person) {
      PersonService
        .create(newPerson)
        .then(response => {
          setPeople(people
            .concat(response))
          setNewName('')
          setNewNumber('')
          setNotification({
            content: `${newPerson.name} was added`,
            type: 'successMessage'
          })
          setTimeout(() =>
            setNotification(null), 5000)
        })

    } else {
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        return editPerson({
          name: newName,
          number: newNumber,
          id: person.id })
      }
    }
  }

  const editPerson = (person) => {
    PersonService.update(person)
      .then(editedPerson => {
        setPeople(people
          .map(person => (person.id !== editedPerson.id ? person : editedPerson)))
        setNewName('')
        setNewNumber('')
        setNotification({
          content: `Number of ${person.name} was replaced`,
          type: 'successMessage'
        })
        setTimeout(() =>
          setNotification(null), 5000)
      })
      .catch(() => {
        setNotification({
          content: `Number of ${person.name} was not replaced`,
          type: 'errorMessage'
        })
        setTimeout(() =>
          setNotification(null), 5000)
      })
  }

  const handleDelete = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}'?`))
    {
      PersonService
        .remove(person)
        .then(() => {
          setNotification({
            content: `The person ${person.name} was deleted`,
            type: 'successMessage'
          })
          setTimeout(() =>
            setNotification(null), 5000);
        })
        .catch(() => {
          setNotification({
            content: `The person ${person.name} was already deleted from server`,
            type: 'errorMessage'
          })
          setTimeout(() =>
            setNotification(null), 5000)
        })
        .finally(() => {
          const changePeople = people.filter(p => p.id !== person.id)
          setPeople(changePeople)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleInputChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification}/>
      <Filter filter={filter}
              onInputChange={handleInputChange}/>
      <h3>Add a new</h3>
      <Form onAddPerson={addPerson}
            newName={newName}
            onNameChange={handleNameChange}
            number={newNumber}
            onNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <People filter={filter}
              people={people}
              onDelete={handleDelete} />
    </div>
  )
}

export default App
