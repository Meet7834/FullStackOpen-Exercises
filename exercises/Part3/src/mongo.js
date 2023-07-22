const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const phoneName = process.argv[3]
const phoneNumber = process.argv[4]

const url = `mongodb+srv://Meet:${password}@cluster1.tucn7yw.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false);
mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: Number
})
const Phonebook = mongoose.model('Phonebook', phonebookSchema);

const phone = new Phonebook({
    name: phoneName,
    number: phoneNumber
})

phone.save().then(result =>{
    console.log("Phone number saved");
    console.log(result);
    mongoose.connection.close();
})
