const mongoose = require('mongoose')

const url = process.env.TEST_URL

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'Mongoose makes things easy',
//   date: new Date(),
//   important: true,
// })

// const note2 = new Note({
//   content:"Wow it does really do something",
//   date: new Date(),
//   important: false
// })


// note.save().then(result => {
//   console.log('note saved!')
// })

// note2.save().then(result => {
//   console.log('note2 saved!')
//   // mongoose.connection.close()
// })

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})