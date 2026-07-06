const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (value) => {
        return /^\d{2,3}-\d+$/.test(value)
      },
      message: 'Phone number must have format: 2-3 digits, dash, then digits (e.g., 09-1234556)'
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returndObject) => {
    returndObject.id = returndObject._id.toString()
    delete returndObject._id
    delete returndObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
