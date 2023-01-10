import { useEffect, useState } from "react"
import Player from "../Player/Player"

const Players = ({ players }) => {
    console.log("PLAYERS", players)
    const [playersWithStreak, setPlayersWithStreak] = useState()
    useEffect(() => {
        Promise.all(players.map(player => {
          return fetch(`https://statsapi.web.nhl.com/api/v1/people/${player.person.id}/stats?stats=gameLog&season=20222023`)
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
            return {streak:streak, playerData:players[index]}
          }).sort((a,b) => b.streak.streak-a.streak.streak)
          console.log("SORTED??", combinedData)
          setPlayersWithStreak(combinedData)
        })
    },[players])

    let playerComponents = () =>  {
      if (playersWithStreak) {
        console.log("STREAKING",playersWithStreak)
        return  playersWithStreak.map(player => {
          return <Player player={player.playerData} streak={player.streak.streak}/>
    })}
      }
    return (
        <div>
            {playersWithStreak ? playerComponents() : <p>LOADING...</p>}
        </div>
    )

}

export default Players