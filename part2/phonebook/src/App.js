import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personsService from './services/persons'





const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name == newName).includes(true)) {
      persons.forEach(person => {
        if (person.name === newName) {
          if (window.confirm(newName + " is already added to the phonebook, replace the old number with a new one?")) {
              console.log("replace")
              console.log(person.id)
              personsService.update(person.id, personObject)  
                .then(response => {
                  console.log(response)
                  setPersons(persons.concat(response.data))
                })
                .then(() => {
                  console.log("Replacement successful")
                  return personsService.getAll()
                })
                .then(response => {
                  console.log(response.data)
                  setPersons(response.data)
                  setErrorMessage(
                    `${newName}'s number was changed `
                  )
                  setTimeout(() => {
                    setErrorMessage(null)
                  }, 5000)
                  setNewName('')
                  setNewNumber('') 
                })
                .catch(error => {
                  console.error(error)
                  setErrorMessage(
                    `${newName}'s number was changed `
                  )
                  setTimeout(() => {
                    setErrorMessage(null)
                  }, 5000)
                })  
              setNewName('')
              setNewNumber('')
          }
        }
      })
    }

    else {
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(response.data))
        setErrorMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')  
      })
    }
  }
  
  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleNewFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }


  const handleDelete = (event) => {
    const id = event.target.id
    const name = event.target.name
    if (window.confirm("Delete " + name + "?")) {
      console.log("yes")
      console.log(id)
      axios
        .delete('http://localhost:3001/persons/' + event.target.id)
        .then(() => {
          console.log("Deletion successful")
          return personsService.getAll()
        })
        .then(response => {
          console.log(response.data)
          setPersons(response.data)
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${event.target.name} has already been removed from the server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newFilter = {newFilter} handleNewFilter = {handleNewFilter}/>

      <h3>Add a new</h3>

      <PersonForm addPerson = {addPerson} newName = {newName} handleNewName = {handleNewName} newNumber = {newNumber} handleNewNumber = {handleNewNumber}/>

      <h3>Numbers</h3>
      <Persons newFilter = {newFilter}persons = {persons} handleDelete = {handleDelete} />
      
    </div>
  )
}


export default App