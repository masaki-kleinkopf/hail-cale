import { useState, useEffect } from 'react'

const Player = ({ player }) => {
    const [playerStreak, setPlayerStreak] = useState(null)

    useEffect(() => {
        fetch(`https://statsapi.web.nhl.com/api/v1/people/${player.person.id}/stats?stats=gameLog&season=20222023`)
        .then(response => {
            if (!response.ok) {
                throw new Error("error")
            } else {
                return response.json()
            }
        })
        .then(data => {
            let gameSplits = data.stats[0].splits;
            console.log("splits",gameSplits)
            let counter = 0;
             while (gameSplits[counter].stat.goals > 0 || gameSplits[counter].stat.assists > 0){
                counter++;
             }
             setPlayerStreak(counter)
        })
    },[player])
    return (
        <div>
            <p>{player.person.fullName}</p>
            <p>{playerStreak}</p>
            {console.log("player",player)}
        </div>

    )
}

export default Player