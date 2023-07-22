const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.static('build'));

morgan.token('req-body', (req,res)=> JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms :req-body'));
app.use(express.json())

let phonebook = [
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

app.get('/api/persons', (req, res) => {
    res.json(phonebook);
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info of ${phonebook.length} people.</p> <br/> <p>${new Date().toISOString()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = phonebook.find(p => p.id === id);
    if (person) return res.json(person);
    else return res.status(404).send("Person not found!");
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    phonebook = phonebook.filter(p => p.id !== id);
    res.status(200).send("Deletion succesfull");
})

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) return res.status(400).json({ error: "Name or phone number not given." });

    const isUnique = phonebook.find(p => p.name === body.name) ? false : true;
    if (!isUnique) return res.status(409).json({ error: "name must be unique" })

    const person = {
        id: (Math.floor(Math.random() * 100) + 5), //starting from 5 so that our current id aren't duplicated
        name: body.name,
        number: body.number
    }
    phonebook = phonebook.concat(person);
    return res.status(200).json("Person succesfully added.");
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})