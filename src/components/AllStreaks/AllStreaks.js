import {useEffect, useState} from "react"
import Players from "../Players/Players"

const AllStreaks = ({allTeams}) => {
  const [lastGameLinks, setLastGameLinks] = useState([])
  const [AllPlayersWithPoints, setAllPlayersWithPoints] = useState([])

  useEffect(() => {
    Promise.all(allTeams.map(team => {
    return fetch(`https://statsapi.web.nhl.com/api/v1/teams/${team.id}/?expand=team.schedule.previous`)
    .then(response => {
      if (!response.ok) {
      } else {
        return response.json()
      }
      })
    }))
    .then(data => {
      let teamData = data.map(teamData => teamData.teams[0].previousGameSchedule.dates[0].games[0].link)
      //filter duplicate game data
      let uniqueData = [...new Set(teamData)]
      setLastGameLinks(uniqueData)
    })
   },[allTeams])

   useEffect(() => {
    if (lastGameLinks.length > 0) {
      Promise.all(lastGameLinks.map(link => {
        console.log("link", link)
    return fetch(`https://statsapi.web.nhl.com${link}`)
      .then(response => {
      if (!response.ok) {
      } else {
        return response.json()
      }
      })
    }))
    .then(data => {
      console.log("DATA",data)
      let playersPointsData = data.map(data => {
        let playersData = {...data.liveData.boxscore.teams.away.players,...data.liveData.boxscore.teams.home.players}
        let playerIds = Object.keys(playersData)
        let playersWithPointsInLatest = playerIds.filter(playerId => playersData[playerId].position.code !== "G" && Object.keys(playersData[playerId].stats).length !== 0 && (playersData[playerId].stats.skaterStats.goals > 0 || playersData[playerId].stats.skaterStats.assists > 0)).map(playerId => {
          return playersData[playerId]
      })
      return playersWithPointsInLatest
    })
    let allPlayers = playersPointsData.flat()
    // filter for duplicates by id property
    let filteredAllPlayers = allPlayers.filter((data, index, self) => {
      return index === self.findIndex(player => player.person.id === data.person.id)
    })
    setAllPlayersWithPoints(filteredAllPlayers)
    })}
   },[lastGameLinks])
   return (
      <div> 
        <Players players={AllPlayersWithPoints}/>
      </div>
  )
   }


export default AllStreaks