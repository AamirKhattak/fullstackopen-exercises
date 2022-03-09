import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";

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

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => onDelete(person.id)}> delete </button>
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    phonebookService.getAll().then((initialData) => {
      setPersons(initialData);
      console.log(initialData);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleOnChangeName = (event) => setNewName(event.target.value);
  const handleOnChangeNumber = (event) => setNewNumber(event.target.value);
  const handleOnChangeFilter = (event) => setFilter(event.target.value);

  const onDelete = (id) => {
    let tobeDeletedPerson = persons.find((per) => per.id === id)[0];
    // console.log(tobeDeletedPerson);

    if (!window.confirm(`Delete ${tobeDeletedPerson.name}?`)) {
      return;
    }

    phonebookService
      .remove(id)
      .then((response) => {
        setPersons(persons.filter((per) => per.id !== id));
        // setNotification({message:`${deletedPerson[0].name} has been deleted`,});
        // setTimeout(() => {setNotification(undefined)}, 5000);
      })
      .catch((error) => {
        setPersons(persons.filter((per) => per.id !== id));
        console.log(tobeDeletedPerson);
        // setNotification({message:`${deletedPerson[0].name} has been already deleted`,});
        // setTimeout(() => {setNotification(undefined)}, 5000);
      });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const alreadyExists = persons.find((per) => per.name === newName);
    if (alreadyExists) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one.`)){
        const updatedPerson = {...alreadyExists, number: newNumber}
        updatePerson(updatedPerson)
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    savePerson(newPerson);
  };

  const updatePerson = (updatedPerson) => {
    console.log('isAlreadyExists',updatedPerson);
    phonebookService.update(updatedPerson.id, {...updatedPerson})
    .then( returnedPerson => {
        setPersons(
            persons.map( per => per.id === updatedPerson.id ? returnedPerson : per)
        )
        
        // setNotification({message:'Updated ' + returnedPerson.name, type:'success'})
        // setTimeout(() => {setNotification(undefined)}, 5000);
    }).catch(error => console.log(error))
  }
  const savePerson = (newPerson) => {
    phonebookService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        // setNotification({message:'Added ' + returnedPerson.name, type:'success'})
        // setTimeout(() => {setNotification(undefined)}, 5000);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.error(error.response.data);
        // setNotification({message: error.response.data.error});
        // setTimeout(() => {setNotification(undefined)}, 5000);
      });
  };

  const filteredPersons = persons.filter((per) =>
    per.name.toLowerCase().includes(filter.toLowerCase())
  );

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
      <Persons persons={filteredPersons} onDelete={onDelete} />
    </div>
  );
};

export default App;
