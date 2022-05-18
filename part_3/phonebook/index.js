const express = require('express')
const req = require('express/lib/request')
const morgan = require('morgan')
const app = express()

morgan.token('person', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(express.json())

const morganPost = morgan(':method :url :status :res[content-length] - :response-time ms :person')
const morganNormal = morgan('tiny')

app.use(function(req, res, next) {
    if (req.method === 'POST')
    {
        morganPost(req, res, next)
    }
    else
    {
        morganNormal(req, res, next)
    }
})


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Info page 
app.get('/info', (request, response) => {
    const numPersons = persons.length
    const currDate = new Date()

    response.send(
        `<div>
            <p>Phonebook has info for ${numPersons} people</p>
            <p>${currDate}</p>
        </div>`
    )
})

// Generate random ID for POST request
const newId = () => {
    const newId = Math.floor(Math.random() * 9999999)
    return newId
}

// Persons JSON data
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// Fetch single Person resource
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
    
})

//Delete request
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// Post request
app.post('/api/persons', (request, response) => {
    const body = request.body
    // Create array of existing names for error handling
    const names = persons.map(person => person.name)

    // Error handling (missing name or number, person already exists)
    if (!body.name) {
        return response.status(404).json({
            error: 'person name content missing'
        })
    }
    if (!body.number) {
        return response.status(404).json({
            error: 'person number content missing'
        })
    }
    if (names.includes(body.name)) {
        return response.status(404).json({
            error: `person name ${body.name} already exists`
        })
    }

    const person = { 
        "id": newId(),
        "name": body.name, 
        "number": body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})