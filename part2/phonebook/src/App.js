import { useState } from "react";

const Filter = ({ filterText, handleOnChangeFilter }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={filterText} onChange={handleOnChangeFilter} />
    </div>
  );
};

const PersonForm = ({
  name,
  onChangeName,
  number,
  onChangeNumber,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={onChangeName} />
        <br />
        number: <input value={number} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleOnChangeName = (event) => setNewName(event.target.value);
  const handleOnChangeNumber = (event) => setNewNumber(event.target.value);
  const handleOnChangeFilter = (event) => setFilter(event.target.value);

  const filteredPersons = persons.filter((per) =>
    per.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const alreadyExists = persons.find((per) => per.name === newName);
    if (alreadyExists) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    setPersons(
      persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      })
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filter} handleOnChangeFilter={handleOnChangeFilter} />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onChangeName={handleOnChangeName}
        onChangeNumber={handleOnChangeNumber}
        onSubmit={handleOnSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
