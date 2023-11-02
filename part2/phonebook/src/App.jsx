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
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchString(event.target.value.toLowerCase())
  }

  const addEntry = (event) => {
    event.preventDefault()
    const newEntry = {
      name: newName,
      number: newNumber,
    }
    const names = persons.map(entry => entry.name.toLowerCase())
    let isDuplicate = names.some((name) => names.indexOf(newName.toLowerCase()) !== -1)

    if (isDuplicate === true) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      entryService
        .create(newEntry)
        .then(() => {
					setPersons(persons.concat(newEntry))
					setNewName('')
					setNewNumber('')
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
      <Phonebook entries={persons} onChange={handleSearch} searchString={searchString}/>
    </div>
  )
}

const Phonebook = ({ entries, onChangeSearch, searchString }) => {
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
            {entry.name} {entry.number}
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

export default App
