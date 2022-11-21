import { useEffect, useState } from "react"

const Player = ({player}) => {
    const [playerStat, setPlayerStat] = useState(null)

    useEffect(() => {
    fetch(`https://statsapi.web.nhl.com/api/v1/people/${player.person.id}/stats?stats=statsSingleSeason`)
    .then(response => {
      if (!response.ok) {
        console.log("error")
      } else {
        return response.json()
      }
    })
    .then(data => {
        console.log(data)
       setPlayerStat(data.stats[0].splits[0].stat)
       console.log("playerStat",playerStat)
    })
  },[])
    return (
        <div>
            {console.log(player)}
            <p>{player.person.fullName}</p>
            <p>#{player.jerseyNumber}</p>
            {playerStat && <div>Points:{playerStat.points}</div>}
        </div>
    )
}

export default Player