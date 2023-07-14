const Filter = (props) => {
  return(
    <form id = "Filter">
      <div>
        filter by: <input id = "filter" value = {props.newFilter} onChange={props.handleNewFilter}/>
      </div>
    </form>
  )
}

export default Filter