import styles from "./Select.module.scss"
import {Link, useHistory} from "react-router-dom"

const Select = ({setTeamId, allTeams,teamId}) => {
  let allTeamsOptions = allTeams.map(teamData => {
    return <option value={teamData.id.toString()}>{teamData.name}</option>
  })
  const history = useHistory();
  const handleChange = (event) => {
     history.push("/")
    setTeamId(parseInt(event.target.value))
  }
  return (
        <select className={styles.select} value={ teamId ? teamId : "disabled"} onChange={handleChange}>
        <option value="disabled" disabled> -- select an option -- </option>
        {allTeamsOptions}
      </select>
  )
}

export default Select