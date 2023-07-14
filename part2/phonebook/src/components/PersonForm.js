const PersonForm = (props) => {
  const addPerson = props.addPerson
  const newName = props.newName
  const handleNewName = props.handleNewName
  const newNumber = props.newNumber
  const handleNewNumber = props.handleNewNumber
  return (
    <form id = "Person Form" onSubmit={addPerson}>
      <div>
        name: <input id = "name" value={newName} onChange={handleNewName}/>
      </div>
      <div>
        number: <input id = "number" value={newNumber} onChange={handleNewNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm