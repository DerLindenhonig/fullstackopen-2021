import React from 'react'

const Form = ({ newName, number, onAddPerson, onNameChange, onNumberChange }) => {
    return (
        <form onSubmit={onAddPerson}>
            <div>
              name:
              <input value={newName} onChange={onNameChange}/>
            </div>
            <div>
              number:
              <input value={number} onChange={onNumberChange}/>
            </div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default Form