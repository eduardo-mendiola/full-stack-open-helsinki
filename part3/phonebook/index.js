const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')

app.use(express.json())
//app.use(morgan('tiny'))

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms - :body')
)

app.use(express.static(path.join(__dirname, 'dist')))

let data = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const generateId = () => {
  const maxId = data.length > 0
    ? Math.max(...data.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.get('/', (request, response) => {
  response.send('<h1>Phonebook</h1>')
})

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${data.length} people</p>
     <p>${new Date}</p>
    `
  )
})

app.get('/api/persons', (request, response) => {
  response.json(data)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = data.find(p => p.id === id)

  if (person) { 
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  person = data.filter(p => p.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  } else if (data.find(p => p.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique' 
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  data = data.concat(person)

  response.json(data)
})

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndPoint)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server runnig on port ${PORT}`)
})