
import './Globals.css';
import styles from './App.module.scss'
import Player from '../Players/Players'
import Select from '../Select/Select'
import {useEffect, useState} from "react"
import { Route } from "react-router-dom";
import AllStreaks from "../AllStreaks/AllStreaks"


function App() {
  const [teamId, setTeamId] = useState(null)
  const [allTeams, setAllTeams] =useState([])
  const [team, setTeam] = useState(null)
  const [lastGame, setLastGame] = useState(null)
  const [playersWithPoints, setPlayersWithPoints] = useState([])

  useEffect(() => {
    fetch(`https://statsapi.web.nhl.com/api/v1/teams/`)
    .then(response => {
      if (!response.ok) {

      } else {
        return response.json()
      }
    })
    .then(data => {
      let teamsData = data.teams.map(teamData => {
        return {id:teamData.id, name:teamData.name}
      })
      setAllTeams(teamsData)
    })
  },[])

  useEffect(() => {
    fetch(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}/?expand=team.schedule.previous`)
    .then(response => {
      if (!response.ok) {

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
      } else {
        return response.json()
      }
    })
    .then(data => {
      setLastGame(data)
    })
    }
  },[team])

  useEffect(() => {
    if (lastGame) {
      let playersData = lastGame.liveData.boxscore.teams.away.team.id === teamId ? lastGame.liveData.boxscore.teams.away.players : lastGame.liveData.boxscore.teams.home.players
      let playerIds = Object.keys(playersData)
      let playersWithPointsInLatest = playerIds.filter(playerId => playersData[playerId].position.code !== "G" && Object.keys(playersData[playerId].stats).length !== 0 && (playersData[playerId].stats.skaterStats.goals > 0 || playersData[playerId].stats.skaterStats.assists > 0)).map(playerId => {
        return playersData[playerId]
      })
      setPlayersWithPoints(playersWithPointsInLatest)
    }
  },[lastGame,teamId])

  


  return (
    <main className={styles.main}>
      <h1>NHL POINTS STREAK TRACKER</h1>
      <Route exact path="/">
        <Select setTeamId={setTeamId} allTeams={allTeams} />
        {playersWithPoints.length > 0 ?  <Player players={playersWithPoints} /> : <p>No streaks</p>}
      </Route>
      <Route exact path="/allStreaks">
        <AllStreaks />
      </Route>
    </main>
  )
}

export default App;
