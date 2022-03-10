import { useState, useEffect } from "react";
import "./App.css";

import phonebookService from "./services/phonebook";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import Notification from "./components/Notification";

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
  const [notification, setNotification] = useState(undefined);

  const handleOnChangeName = (event) => setNewName(event.target.value);
  const handleOnChangeNumber = (event) => setNewNumber(event.target.value);
  const handleOnChangeFilter = (event) => setFilter(event.target.value);

  const handleNotification = (notification, type=undefined) => {
    setNotification({message:notification, type: type});
    setTimeout(() => {setNotification(undefined)}, 5000);
  }

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
        handleNotification(`Updated ${returnedPerson.name}`, 'success');
    }).catch((error) => {
      console.error(error.response.data);
      handleNotification(error.response.data.error);
    })
  }
  const savePerson = (newPerson) => {
    phonebookService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        handleNotification(`Added ${returnedPerson.name}`, 'success');
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.error(error.response.data);
        handleNotification(error.response.data.error);
      });
  };

  const onDelete = (id) => {
    let tobeDeletedPerson = persons.find((per) => per.id === id);
    if (!window.confirm(`Delete ${tobeDeletedPerson.name}?`)) {
      return;
    }
    phonebookService
      .remove(id)
      .then((response) => {
        setPersons(persons.filter((per) => per.id !== id));
        handleNotification(`${tobeDeletedPerson.name} has been deleted`);
      })
      .catch((error) => {
        setPersons(persons.filter((per) => per.id !== id));
        console.log(tobeDeletedPerson);
        handleNotification(`${tobeDeletedPerson[0].name} has been already deleted`);
      });
  };

  const filteredPersons = persons.filter((per) =>
    per.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
