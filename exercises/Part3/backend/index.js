const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const Phonebook = require('./models/phonebook')

app.use(express.static('build'))

morgan.token('req-body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms :req-body'))
app.use(express.json())

app.get('/api/persons', (req, res) => {
  Phonebook.find({}).then(result => res.json(result))
})

app.get('/info', (req, res) => {
  const currentDate = new Date().toLocaleString()
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  Phonebook.find({}).then(persons => {
    res.send(
      `
            <div>
                <p>Phonebook has info for ${persons.length} people</p>
            </div>
            <div>
                <p>${currentDate} (${timeZone})</p>
            </div>`
    )
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Phonebook.findById(req.params.id)
    .then(phone => {
      if (phone) res.json(phone)
      else res.status(404).end()
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Phonebook.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).json('Person succesfully deleted.', result))
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const phone = new Phonebook({
    name: req.body.name,
    number: req.body.number,
  })

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  phone.save()
    .then(result => res.json(result))
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req,res,next) => {
  const phone = {
    name: req.body.name,
    number: req.body.number
  }
  Phonebook.findByIdAndUpdate(req.params.id, phone, { new : true })
    .then(updatedPhone => {
      res.json(updatedPhone.toJSON())
    })
    .catch(err => next(err))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})