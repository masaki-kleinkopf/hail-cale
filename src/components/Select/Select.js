const Select = ({setTeamId}) => {
  return (
       <select onChange={(event) => setTeamId(event.target.value)}>
        <option value ="1">New Jersey Devils</option>
        <option value ="1">New Jersey Devils</option>
        <option value ="1">New Jersey Devils</option>
        <option value ="1">New Jersey Devils</option>
        <option value ="1">New Jersey Devils</option>
        <option value ="1">New Jersey Devils</option>
        <option value ="1">New Jersey Devils</option>
        <option value ="1">New Jersey Devils</option>
        <option value ="1">New Jersey Devils</option>
        <option value ="1">New Jersey Devils</option>
        <option value ="1">New Jersey Devils</option>
        <option value ="1">New Jersey Devils</option>
        <option value ="1">New Jersey Devils</option>
        <option value ="1">New Jersey Devils</option>
        <option value ="1">New Jersey Devils</option>
        <option value="21">Colorado Avalanche</option>
        <option value="22">Edmonton Oilers</option>
      </select>
  )
}

export default Select