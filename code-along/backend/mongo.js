const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Meet:${password}@cluster1.tucn7yw.mongodb.net/noteApp?retryWrites=true&w=majority`

const notes = require('./seedbox');
mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// Promise.all(
//     notes.map(n => {
//         const note = new Note({
//             content: n.content,
//             important: n.important
//         })
//         return note.save();
//     })
// ).then(result => {
//     console.log("Note inserted succesfully");
//     console.log(result);
//     mongoose.connection.close();
// })

Note.find({ important: true }).then(result => {
    result.forEach(note => {
        console.log(note);
    })
    mongoose.connection.close();
})