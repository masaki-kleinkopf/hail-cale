import { useEffect, useState } from "react"
import Player from "../Player/Player"

const Players = ({ players }) => {
    let playerComponents = players.map(player => {
        return <Player player={player}/>
    })
    return (
        <div>
            {console.log(players)}
            {playerComponents}
        </div>
    )

}

export default Players