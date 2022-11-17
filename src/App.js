
import './App.css';
import {useEffect, useState} from "react"

function App() {
  const [stat, setStat] = useState({})
  useEffect(() => {
    fetch("https://statsapi.web.nhl.com/api/v1/people/8480069/stats?stats=statsSingleSeason")
    .then(response => {
      if (!response.ok) {
        console.log("error")
      } else {
        return response.json()
      }
    })
    .then(data => {
      setStat(data.stats[0].splits[0].stat)
    })
  },[])

  return (
    <main>
      <p>Pts:{stat.points}</p>
      {console.log(stat)}
    </main>
  )
}

export default App;
