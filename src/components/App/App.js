
import './App.css';
import Player from '../Players/Players'
import {useEffect, useState} from "react"


function App() {
  const [team, setTeam] = useState(null)
  const [lastGame, setLastGame] = useState(null)
  const [playersWithPoints, setPlayersWithPoints] = useState(null)

  useEffect(() => {
    fetch("https://statsapi.web.nhl.com/api/v1/teams/21/?expand=team.schedule.previous")
    .then(response => {
      if (!response.ok) {
        console.log("error")
      } else {
        return response.json()
      }
    })
    .then(data => {
      setTeam(data.teams[0])
      console.log(data.teams[0])
      console.log(`https://statsapi.web.nhl.com${data.teams[0].previousGameSchedule.dates[0].games[0].link}`)
    })
  },[])

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
      console.log("last game", lastGame.liveData.boxscore.teams.away.players)
      let playersData = lastGame.liveData.boxscore.teams.away.players
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
  },[lastGame])

  


  return (
    <main>
      <h1>NHL POINTS STREAK TRACKER</h1>
      {playersWithPoints && <Player players={playersWithPoints} />}
    </main>
  )
}

export default App;
