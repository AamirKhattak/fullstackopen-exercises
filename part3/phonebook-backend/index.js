const express = require("express");
const app = express();

var morgan = require("morgan")

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];


// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('res Body:  ', response.da)
//   console.log('---')
//   next()
// }

app.use(express.json());
// app.use(morgan('tiny'))
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// app.use(requestLogger)



const generateId = () => Math.floor(Math.random() * 100000);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info for ${phonebook.length} people <br/><br/> ${new Date()}`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(phonebook);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const personFound = phonebook.find((per) => per.id === id);
  if (!personFound) return res.status(404).end();

  res.json(personFound);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  phonebook = phonebook.filter((per) => per.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!(body.name && body.number)) {
    return res.status(400).json({ error: "name or number is missing" });
  } else if (phonebook.find((per) => per.name === body.name)) {
    return res.status(400).json({ error: "name already exists in the phonebook" });
  }

  const newPerson = { name: body.name, number: body.number, id: generateId() };
  phonebook = phonebook.concat(newPerson);
  res.json(newPerson);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
