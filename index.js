const express = require('express')
var morgan = require('morgan')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build')) // middleware for 
//customise morgan (logger) token to include the POST request body
morgan.token('body', (req, res) => {return JSON.stringify(req.body)});
//Put together the rest of the stuff you want to log
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

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

  app.get('/info', (request, response) => {
    const phonebookSize = persons.length;
    const dt = new Date();
    const phonebookInformation = `Phonebook has info for ${phonebookSize} people`
    response.send(`<p>${phonebookInformation}</p><p>${dt}</p>`)
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).json({message: `Person with id ${id} not found`, status: 404}).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).json({message: `Person with id ${id} deleted`, status: 204}).end()
  })

  app.post('/api/persons', (request, response) => {
    //const maxId = persons.length > 0
      //? Math.max(...persons.map(n => n.id)) 
      //: 0
    
  
    const person = request.body
    //console.log(person.name)
    if (person.name === undefined || person.name=== '' || person.number === undefined || person.number=== ''){
      //console.log("name cannot be empty")
      response.status(400).json({error: `Name or number field cannot be empty`, status: 400}).end()
    }
    else if (persons.find(p =>p.name===person.name)){
      //console.log(person.name)
      response.status(400).json({error: `Name must be unique. ${person.name} already exists in phonebook.`, status: 400}).end()
    }
    else {
    person.id = getRandomInt(99999999)
  
    persons = persons.concat(person)
  
    response.json(person)
  }
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })