
import './App.css';
import Player from '../Players/Players'
import {useEffect, useState} from "react"


function App() {
  const [teamId, setTeamId] = useState(22)
  const [team, setTeam] = useState(null)
  const [lastGame, setLastGame] = useState(null)
  const [playersWithPoints, setPlayersWithPoints] = useState(null)

  useEffect(() => {
    fetch(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}/?expand=team.schedule.previous`)
    .then(response => {
      if (!response.ok) {
        console.log("error")
      } else {
        return response.json()
      }
    })
    .then(data => {
      setTeam(data.teams[0])
    })
  },[teamId])

  useEffect(() => {
    if (team) {
      fetch(`https://statsapi.web.nhl.com${team.previousGameSchedule.dates[0].games[0].link}`)
    .then(response => {
      if (!response.ok) {
        console.log("error")
      } else {
        return response.json()
      }
    })
    .then(data => {
      console.log(data)
      setLastGame(data)
    })
    }
  },[team])

  useEffect(() => {
    if (lastGame) {
      let playersData = lastGame.liveData.boxscore.teams.away.team.id === team ? lastGame.liveData.boxscore.teams.away.players : lastGame.liveData.boxscore.teams.home.players
      console.log("players Data",playersData)
      let playerIds = Object.keys(playersData)
      console.log("players Ids",playerIds)
      let playersWithPointsInLatest = playerIds.filter(playerId => playersData[playerId].position.code !== "G" && Object.keys(playersData[playerId].stats).length !== 0).filter(playerId => {
        console.log("playername", playersData[playerId].person.fullName)
        return (playersData[playerId].stats.skaterStats.goals > 0 || playersData[playerId].stats.skaterStats.assists > 0)
      }).map(playerId => {
        return playersData[playerId]
      })
      console.log("latest",playersWithPointsInLatest)
      setPlayersWithPoints(playersWithPointsInLatest)
    }
  },[lastGame,team])

  


  return (
    <main>
      <select onChange={(event) => setTeamId(event.target.value)}>
        <option value="21">Colorado Avalanche</option>
        <option value="22">Edmonton Oilers</option>
      </select>
      <h1>NHL POINTS STREAK TRACKER</h1>
      {playersWithPoints && <Player players={playersWithPoints} />}
    </main>
  )
}

export default App;
