
import './App.css';
import {useEffect, useState} from "react"
import Stat from '../Stat/Stat'

function App() {
  const [stat, setStat] = useState({})
  useEffect(() => {
    fetch("https://statsapi.web.nhl.com/api/v1/teams/21?expand=team.roster")
    .then(response => {
      if (!response.ok) {
        console.log("error")
      } else {
        return response.json()
      }
    })
    .then(data => {
      setStat(data.teams[0])
    })
  },[])

  return (
    <main>
      {stat && <Stat stat={stat} />}
    </main>
  )
}

export default App;
