import styles from "./Select.module.scss"

const Select = ({setTeamId, allTeams}) => {
  let allTeamsOptions = allTeams.map(teamData => {
    return <option value={teamData.id.toString()}>{teamData.name}</option>
  })
  return (
       <select className={styles.select} onChange={(event) => setTeamId(parseInt(event.target.value))}>
        <option disabled selected value> -- select an option -- </option>
        {allTeamsOptions}
      </select>
  )
}

export default Select