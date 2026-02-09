const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackopen:${password}@fullstackopen.v9rrfx1.mongodb.net/phonebook?appName=fullstackopen`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log("phonebook:")
  Person.find({}).then(result => {
    if (result.length === 0) {
      console.log("phonebook is empty")
    } else {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })}
    mongoose.connection.close()
  })
} else {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phoneboook`)
    mongoose.connection.close()
  })
}

