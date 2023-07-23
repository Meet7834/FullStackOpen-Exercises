const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URL

mongoose.connect(url)
    .then(()=> console.log("Connected to mongodb"))
    .catch((err)=> console.log("can't connect to mongodb", err));

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v   
    }
})

module.exports = mongoose.model('Phonebook', phonebookSchema);
