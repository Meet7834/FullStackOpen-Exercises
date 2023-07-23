const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URL;

console.log('connectring to mongodb');

mongoose.connect(url)
    .then(result => {
        console.log("Connected to mongodb");
    })
    .catch(err => {
        console.log("error happened while connecting to mongodb", err);
    })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema);