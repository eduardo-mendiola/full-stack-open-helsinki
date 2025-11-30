import { useState } from 'react'

const PersonForm = ({ persons, addPerson }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1),
      }
      addPerson(personObject)
      setNewName('')
      console.log('Clearing name input')
      setNewNumber('')
      console.log('Clearing number input')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} onFocus={() => setNewName("")} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} onFocus={() => setNewNumber("")} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
