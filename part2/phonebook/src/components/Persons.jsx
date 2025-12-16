const Persons = ({ persons, deletePerson }) => {

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(person.id)
    }
  }

  return (
    <div>
      {persons.map((person) => (
        <li key={person.id}>
          <p>
            <strong>{person.name} {person.number}</strong>  <button onClick={() => handleDelete(person)}>Delete</button>
          </p>
        </li>
      ))}
    </div>
  )
}

export default Persons