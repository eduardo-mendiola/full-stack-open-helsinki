import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

 
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (personObject) => {
    personService
      .create(personObject)
      .then(returndPerson => {
        setPersons(persons.concat(returndPerson))
      })
  }

  const updatePerson = (id, personObject) => {
    personService
      .update(id, personObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
  }

  const deletePerson = id => {
      personService
        .deleteId(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
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

      <PersonForm persons={persons} addPerson={addPerson} updatePerson={updatePerson} />

      <h3>Numbers</h3>
      <Persons
        persons={personsToShow}
        deletePerson={deletePerson}
      />

    </div>
  )
}

export default App
