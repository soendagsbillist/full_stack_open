import { useState, useEffect } from 'react'
import axios from 'axios'
import entryService from './services/entries'

const App = () => {
  const [persons, setPersons] = useState([])
//    { name: 'Arto Hellas',
//      number: '12345'}
//  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')

	useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  }, [])

  const handleEntryChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchString(event.target.value.toLowerCase())
  }

  const handleDeletion = (entry) => {
    const handler = () => {
      if (window.confirm(`Delete ${entry.name}?`)) {
        entryService
          .deleteEntry(entry.id)
          .then(response => {
            entryService
              .getAll()
              .then(returnedPersons => {
                setPersons(returnedPersons)
              })
          })
          .catch(error => {
            console.log(error.message)
            setPersons(persons.filter(p => p.id !== entry.id))
          })
      }
    }
    return handler
  }

  const addEntry = (event) => {
    event.preventDefault()
    const newEntry = {
      name: newName,
      number: newNumber,
    }
    const names = persons.map(entry => entry.name.toLowerCase())
    let isDuplicate = names.some((name) => names.indexOf(newName.toLowerCase()) !== -1)
    const entry = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    const changedEntry = {...entry, number: newNumber}
    

    if (isDuplicate === true) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        entryService
          .update(entry.id, changedEntry)
          .then((returnedEntry => {
            setPersons(persons.map(person => person.id !== entry.id ? person : returnedEntry)) 
            setNewName('')
            setNewNumber('')
            isDuplicate = false  
          }))
      }
    }
    else {
      entryService
        .create(newEntry)
        .then(() => {
          setPersons(persons.concat(newEntry))
          setNewName('')
          setNewNumber('')
          entryService
            .getAll()
            .then(returnedPersons => {
              setPersons(returnedPersons)
          })
        })
        .catch(error => {
          console.log(error.response.data.error)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search onChange={handleSearch} />
      <ContactForm 
        onSubmit={addEntry}
        onChangeName={handleEntryChange}
        onChangeNumber={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Phonebook 
        entries={persons} 
        onChange={handleSearch} 
        searchString={searchString} 
        onClick={handleDeletion}
      />
    </div>
  )
}

const Phonebook = ({ entries, onChangeSearch, searchString, onClick }) => {
  const names = entries.map(entry => entry.name.toLowerCase())
  let searchItems = entries.filter((entry) => {
    return entry.name.toLowerCase().includes(searchString)
  })
  if (searchString.length === 0) {
    return (
      <>
        <div>
          {entries.map(entry =>
            <div key={entry.number}>
            {entry.name} {entry.number} <Button onClick={onClick} person={entry} name="delete" />
            </div>
          )}
        </div>
      </>
    )
  }
  else {
    return (
      <div>
        <div>
          {searchItems.map(item =>
            <div key={item.number}>
              {item.name} {item.number}
            </div>
          )}
        </div>
      </div>
    )
  }
}

const ContactForm = ({ onSubmit, onChangeName, onChangeNumber, newName, newNumber}) => {
  return (
    <>
      <h2>Add new contact</h2>
      <form onSubmit={onSubmit}>
        <div>name: <input value={newName} onChange={onChangeName}/></div>
        <div>phone: <input value={newNumber} onChange={onChangeNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
    </>
  )
}

const Search = ({ onChange }) => {
  return (
    <div>
      <div>filter with: <input onChange={onChange} /></div>
    </div>
  )
}

const Button = ({ name, onClick, person }) => {
  const styles = {
    display: 'inline-block',
  }
  return (
    <div>
    <button onClick={onClick(person)} style={styles}>{name}</button>
    </div>
  )
}

export default App
