import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(err => {
        console.error(err)
        alert(`Error getting persons from phonebook`)
      })
  }, [])

  const addPerson = event => {
    event.preventDefault()

    const personFound = persons.find(element => element.name === newName)
    if (personFound) {
      if (
        window.confirm(
          `${personFound.name} is already added to phonebook. Replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...personFound, number: newNumber }
        personService
          .update(personFound.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== personFound.id ? person : returnedPerson
              )
            )
          })
          .catch(err => {
            console.error(err)
            alert(`Error updating ${personFound.name} in phonebook`)
          })
      }
    } else {
      const person = {
        name: newName,
        number: newNumber,
        id: persons[persons.length - 1].id + 1
      }

      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(err => {
          console.error(err)
          alert(`Error adding ${newName} to the phonebook`)
        })
    }
  }

  const personsToShow = !nameFilter
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(nameFilter.toLowerCase())
      )

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person.id)
        .then(res => {
          const newPersons = persons.filter(p => p.id !== person.id)
          setPersons(newPersons)
        })
        .catch(err => {
          console.error(err)
          alert(`Error deleting ${person.name} from phonebook`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      {personsToShow.map(person => (
        <Persons
          key={person.id}
          person={person}
          deletePerson={() => deletePerson(person)}
        />
      ))}
    </div>
  )
}

export default App
