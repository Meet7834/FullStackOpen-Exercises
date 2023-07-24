const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const Note = require('./models/note');

app.use(cors());
app.use(express.static('build'));

app.use(express.json())

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError'){
    return response.status(400).send({error: error.message});
  }
  next(error)
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})


app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      if (note) return res.json(note);
      else return res.status(404).end();
    })
    .catch(err => next(err))
})

app.post('/api/notes', (req, res, next) => {
  const body = req.body

  if (!body.content) {
    return req.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => res.json(savedNote))
    .catch(err => next(err));
})

app.put('/api/notes/:id', (req, res, next) => {
  const {content, important} = req.body;

  Note.findByIdAndUpdate(req.params.id, {content, important}, { new: true , runValidators : true, context: 'query'})
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(err => next(err));
})

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).send("Note deleted"))
    .catch(err => next(err));
})

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})