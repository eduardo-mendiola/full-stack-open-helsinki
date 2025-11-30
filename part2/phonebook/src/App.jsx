import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [searchTerm, setSearchTerm] = useState('')

  const addPerson = (personObject) => {
    setPersons(persons.concat(personObject))
  }

  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const personsToShow = searchTerm
    ? persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={searchTerm} onChange={handleFilterChange} />
      
      <h3>Add a new</h3>

      <PersonForm persons={persons} addPerson={addPerson} />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
      
    </div>
  )
}

export default App
