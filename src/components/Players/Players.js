import { useEffect, useState } from "react"
import Player from "../Player/Player"

const Players = ({ players }) => {
    console.log("PLAYERS", players)
    const [playersWithStreak, setPlayersWithStreak] = useState([])
    useEffect(() => {
        Promise.all(players.map(player => {
          return fetch(`https://statsapi.web.nhl.com/api/v1/people/${player.id}/stats?stats=gameLog&season=20222023`)
        .then(response => {
            if (!response.ok) {
                throw new Error("error")
            } else {
                return response.json()
            }
        })
        }))
        .then(data => {
          let playerWithStreak = data.map(skaterData => {
            let gameSplits = skaterData.stats[0].splits;
            let counter = 0;
             while (gameSplits[counter].stat.goals > 0 || gameSplits[counter].stat.assists > 0){
                counter++;
             }
             return {streak:counter}
          })
          let combinedData = playerWithStreak.map((streak,index) => {
            return {streak:streak.streak, playerData:players[index]}
          }).sort((a,b) => b.streak-a.streak)
          console.log("SORTED??", combinedData)
          setPlayersWithStreak(combinedData)
        })
    },[players])
    
      let playerComponents = playersWithStreak.map(player => {
          return <Player player={player.playerData} streak={player.streak}/>
    })
      
    return (
        <div>
            {playersWithStreak.length > 0 ? playerComponents : <p>LOADING...</p>}
        </div>
    )

}

export default Players