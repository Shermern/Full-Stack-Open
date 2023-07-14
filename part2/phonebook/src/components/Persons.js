
const Persons = (props) => {
  const personsToShow = props.persons.filter(person => (person.name).toLowerCase().startsWith(props.newFilter.toLowerCase())) 

  return (
    personsToShow.map(person => (<div key = {person.id}>{person.name} {person.number} 
                                  <button name = {person.name} id = {person.id} onClick = {props.handleDelete}>delete</button></div>))
  )
}

export default Persons