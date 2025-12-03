import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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
