const express = require('express')
const app = express()

app.use(express.json())

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
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
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
    console.log(person.name)
    if (person.name === undefined || person.name=== '' || person.number === undefined || person.number=== ''){
      console.log("name cannot be empty")
      response.status(400).json({error: `Name or number field cannot be empty`, status: 400}).end()
    }
    else if (persons.find(p =>p.name===person.name)){
      console.log(person.name)
      response.status(400).json({error: `Name must be unique. ${person.name} already exists in phonebook.`, status: 400}).end()
    }
    else {
    person.id = getRandomInt(99999999)
  
    persons = persons.concat(person)
  
    response.json(person)
  }
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })