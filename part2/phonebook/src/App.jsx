import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState(null)


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
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotification({ message: `Added ${returnedPerson.name}`, type: 'messageSuccess' })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  // const updatePerson = (id, personObject) => {
  //   personService
  //     .update(id, personObject)
  //     .then(returnedPerson => {
  //       setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
  //       setNotification({ message: `Updated ${returnedPerson.name}`, type: 'messageSuccess' })
  //       setTimeout(() => {
  //         setNotification(null)
  //       }, 5000)
  //     })
  // }


  const updatePerson = (id, personObject) => {
    personService
      .update(id, personObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNotification({ message: `Updated ${returnedPerson.name}`, type: 'messageSuccess' })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setNotification({ message: `Information of ${personObject.name} has already been removed from server`, type: 'error' })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
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
      <Notification message={notification?.message} styleMessage={notification?.type} />

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
