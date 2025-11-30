const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}><strong>{person.name} {person.number}</strong></p>
      ))}
    </div>
  )
}

export default Persons