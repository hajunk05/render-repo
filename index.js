const express = require('express')
const app = express()

let persons = [
    { 
      id: "1",
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: "2",
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: "3",
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: "4",
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

app.use(express.json())

app.get('/api/persons', (request, response) => {
    response.send("hi this is from modified version")
})

app.get('/info', (request, response) =>{
    const lengthOfPersons = persons.length
    response.send(`
        <p> Phonebook has info for ${lengthOfPersons} people </p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const info = persons.filter( n=> Number(n.id) === id)
    console.log(info)
    response.send(info)
})

const generateId = () => {
    return randomId = Math.floor(Math.random() * 1000000)
}

app.post('/api/persons', (request, response)=> {
    const body = request.body
    if (!body.name){
        return response.status(400).json({
            error: 'name missing'
        }) 
    } else if (!body.name) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if (persons.find(n => n.name === body.name)) {
        return response.status(400).json({
            error: 'name already exists'
        })
    }
    
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})