const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const req = require('express/lib/request')
require('dotenv').config()
const Person = require('./models/person')

morgan.token('person', (req, res) => {
    return JSON.stringify(req.body)
})

const morganPost = morgan(':method :url :status :res[content-length] - :response-time ms :person')
const morganNormal = morgan('tiny')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

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

// Info page 
app.get('/info', (request, response) => {
    Person.count({}).then(count => {
        const phonebookInfo = `<div>
                <p>Phonebook has info for ${count} people</p>
                <p>${new Date()}</p>
            </div>`
        response.send(phonebookInfo)
    })
})

// Post request
app.post('/api/persons', (request, response) => {
    const body = request.body

    // Error handling (missing name or number, person already exists)
    if (!body.name) {
        return response.status(400).json({
            error: 'person name content missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'person number content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })
    
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })    
})

// Get ALL Persons data
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })  
})

//Delete request
app.delete('/api/persons/:id', (request, response, next) => {    
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// Fetch single Person resource
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            }
            else {
                response.status(404).end()
            }
        })
        .catch(error => {
            next(error)
        })   
})

// PUT request (update)
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}
  
// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})